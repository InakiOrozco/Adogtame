import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private http:HttpClient, private router: Router) {
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

  getPostsByGroupId(groupID: string | any){
    return this.http.get<Array<Post>>(apiURL + "/groups/" + groupID + "/posts", this.httpOptions);
  }

  getPostByPostId(postId: string | any){
    return this.http.get<Post>(apiURL + "/posts/" + postId, this.httpOptions);
  }

  getCommentByPostId(postId: string | any){
    return this.http.get<Comment>(apiURL + "/posts/" + postId + "/comments", this.httpOptions);
  }

  getPostFromSubscribedGroups(){
    return this.http.get<Array<Post>>(apiURL + "/users/" + this.authService.getId() + "/groups/posts", this.httpOptions);
  }

  createPost(title:string, information:string,location:string,contact_info:string, pet_type:string, photo: any, dialog:any, group:string){
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'x-access-token': this.authService.getToken()
      })
    };

    const formData = new FormData();
    formData.append('image', photo);

    this.http.post<any>( apiURL + '/images', formData, httpOptions).subscribe( photo_url =>{
      const real_photo_url = apiURL + "/images/" + photo_url;
      console.log('Help', real_photo_url);
      this.http.post<Post>( apiURL + '/posts', {id_group: group, title:title, information:information, location:location, contact_info:contact_info, pet_type:pet_type, photo: real_photo_url}, httpOptions).subscribe(post => {
        console.log('Help', post);
        if(post._id){
          const newRoute = '/post/' + post._id;
          console.log(newRoute);
          dialog.close();
          this.router.navigate([newRoute])
        }
      })
    })
  }
}

