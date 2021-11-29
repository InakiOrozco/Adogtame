import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

import { apiURL } from '../globals';

export interface User {
  _id: string,
	email: string,
	password: string,
	createdAt: string,
	updatedAt: string,
	__v: number,
	name: string,
	last_name: string,
  profile_picture: string
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  httpOptions:any = {}

  constructor(private authService: AuthService, private http:HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'x-access-token': this.authService.getToken()
      })
    };
  }

  getUser(userID:string | any) {
    return this.http.get<User>(apiURL + "/users/" + userID, this.httpOptions);
  }
  
  getGroupsOfUser(userId:string | any){

  }
}

