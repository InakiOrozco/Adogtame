import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { apiURL } from '../globals';
import { AuthService } from './auth.service';

export interface Post {
  _id: string,
  id_user: string,
  id_group: string,
  id_post: string,
  information: string,
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  httpOptions:any = {};

  constructor(private authService: AuthService, private http:HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'x-access-token': this.authService.getToken()
      })
    };
  }

  getCommentsByPostId(postId: string | any){
    return this.http.get<Array<Post>>(apiURL + "/posts/" + postId + "/comments", this.httpOptions)
  }
}

// /post/id_post/comment