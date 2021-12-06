import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { apiURL } from '../globals';
import { AuthService } from './auth.service';

export interface Post {
  _id: string,
  id_group:string,
  id_user: string,
  title: string,
  information: string,
  photo: string,
  location: string,
  contact_info: string,
  pet_type: string,
  resolverd: boolean
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  httpOptions:any = {};

  constructor(private authService: AuthService, private http:HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'x-access-token': this.authService.getToken()
      })
    };
  }

  getPostsByUserId(userID: string | any){
    return this.http.get<Array<Post>>(apiURL + "/users/" + userID + "/posts", this.httpOptions);
  }
}
