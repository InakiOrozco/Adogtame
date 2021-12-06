import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { apiURL } from '../globals';
import { AuthService } from './auth.service';

export interface Group {
  _id: string,
  name:string,
  description:string,
  potho: string
}

export interface GroupUser {
  _id:string,
  id_group: string,
  id_user: string,
  permissions: string
}

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  httpOptions:any = {};

  constructor(private authService: AuthService, private http:HttpClient, private router: Router) {
    this.httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'x-access-token': this.authService.getToken()
      })
    };
  }

  getGroupsByUserId(userID: string){
    return this.http.get<Group>(apiURL+"/users/"+userID + "/groups", this.httpOptions);
  }

  getNotSubGroupsByUserId(userID: string){
    return this.http.get<Group>(apiURL+"/users/"+userID + "/groups/not_sub", this.httpOptions);
  }

  getGroupById(groupID: string | any){
    return this.http.get<Group>(apiURL + "/groups/" + groupID, this.httpOptions);
  }

  subscribeToGroup(groupId:string | any){
    return this.http.post<GroupUser>(apiURL + "/groups/" + groupId + "/subscribe", {}, this.httpOptions);
  }

  unSubscribeToGroup(groupId:string | any){
    return this.http.delete(apiURL + "/groups/" + groupId + "/subscribe", this.httpOptions);
  }

  isSubscribed(groupId:string | any) {
    return this.http.get<GroupUser>(apiURL + '/groups/' + groupId + '/permissions', this.httpOptions);
  
  createGroup(name:any, description:any, photo:any):any{
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
      this.http.post<Group>( apiURL + '/groups', {name:name, description:description, photo: real_photo_url}, httpOptions).subscribe(group => {
        console.log('Help', group);
        if(group._id){
          const newRoute = '/group/' + group._id;
          console.log(newRoute);
          this.router.navigate([newRoute])
        }
      })
    })
  }
}
