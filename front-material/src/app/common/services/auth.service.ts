import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { apiURL } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$:any;

  constructor(private http: HttpClient, private router: Router) {
    this.user$ = new Subject<Object>()
  }

  googleAuth(){
    window.open( apiURL + '/auth/google',"mywindow","location=1,status=1,scrollbars=1, width=800,height=800");
    let listener = window.addEventListener('message', (message) => {
      const user= message.data.user;
      if(user){
        this.saveId(user._id);
        this.saveToken(user.token);
        user.isLoggedIn = true;
        this.user$.next(user);
       this.router.navigate(['/home']);
      }
    });
  }

  loadUser(){
    if(this.isLoggedIn()){
      
      const httpOptions = {
        headers: new HttpHeaders({ 
          'Access-Control-Allow-Origin':'*',
          'x-access-token': this.getToken()
        })
      };
      const userid = this.getId();
      if(userid !== ''){
        this.http.get<any>(apiURL + /users/ + userid, httpOptions).subscribe(data=>{
          if(data){
            if(data._id === userid){
              data.isLoggedIn = true;
              data.token = this.getToken();
              this.user$.next(data);
              this.router.navigate(['/home']);
            }
          }
        })
      }
    }
  }

  login(email:string, password:string){
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*'
      })
    };

    this.http.post<any>( apiURL + '/users/login', {email:email, password:password}, httpOptions).subscribe( data =>{
      if(data){
        if(data.token){
          this.saveId(data._id);
          this.saveToken(data.token);
          data.isLoggedIn = true;
          this.user$.next(data);
          this.router.navigate(['/home']);
        }
      }
    });
  }

  getUser$(): Observable<Object> {
    return this.user$.asObservable();
  }

  logOut(){
    this.removeToken();
    this.removeId();
    this.user$.next(new Object());
    this.router.navigate(['/']);
  }

  register(){

  }
  
  saveId(id:string){
    localStorage.setItem('user_id', id);
  }

  removeId(){
    localStorage.removeItem('user_id');
  }

  saveToken(token:string) {
    localStorage.setItem('token', token);
  }
  removeToken(){
    localStorage.removeItem('token');
  }
  getToken(): string {
    return localStorage.getItem('token') || '';
  }
  getId():string {
    return localStorage.getItem('user_id') || '';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}