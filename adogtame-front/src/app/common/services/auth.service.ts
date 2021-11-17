import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient, private router:Router) {}

  login(email:string, password:string){
    console.log(this.isLoggedIn());
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*'
      })
    };
    const body =  {
      email:email, password: password
    };
    console.log(body);
    this.http.post<any>("http://localhost:3001/api/users/login", body, httpOptions).subscribe({
      next: data=>{ 
        console.log(data);
        if(data.token){
          this.saveToken(data.token);
          this.router.navigate(['/home']);
        }
      },
      error: error=>{
        console.log(error);
      }
    });
  }

  register(email:string,password:string,name:string,last_name:string){
    console.log(this.isLoggedIn());
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*'
      })
    };
    const body =  {
      email, password, name, last_name
    };
    console.log(body);
    this.http.post<any>("http://localhost:3001/api/users", body, httpOptions).subscribe({
      next: data=>{ 
        console.log(data);
        if(data.token){
          this.saveToken(data.token);
          this.router.navigate(['/home']);
        }
      },
      error: error=>{
        console.log(error);
      }
    });
  }

  saveToken(token:string) {
    localStorage.setItem('token', token);
  }
  removeToken(){
    localStorage.removeItem('token');
    console.log('here')
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
