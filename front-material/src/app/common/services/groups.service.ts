import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { apiURL } from '../globals';
import { AuthService } from './auth.service';

export interface Group {
  _id: string,
  name:string,
  description:string,
  potho: string
}

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  httpOptions:any = {};

  constructor(private authService: AuthService, private http:HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'x-access-token': this.authService.getToken()
      })
    };
  }

  getGroupById(groupID: string | any){
    return this.http.get<Group>(apiURL + "/groups/" + groupID, this.httpOptions);
  }
}