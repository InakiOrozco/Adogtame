import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService, User } from 'src/app/common/services/users.service';


interface Post {
  id_post:string
  id_group:String
  id_user:string
  title:string
  information:string
  photo:string
  location:string
  contact_info:string
  pet_type:string
  resolved:boolean
}

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  posts:any = [];
  user:User | any = {};

  
  constructor(private route: ActivatedRoute, private usersService: UsersService) { }
  
  
  ngOnInit(): void {
    const idUser_URL = this.route.snapshot.paramMap.get('id');
    if(idUser_URL){
      this.usersService.getUser(idUser_URL).subscribe(user => {
        this.user = user;
        this.posts = [
          {id_post: '1254', id_group:'78324',id_user: this.user._id, title:'Titulo 1', information:'Informacion de prueba', photo:'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', location: 'Mi casa', contact_info:'test@google.com', pet_type:'Dog', resolved:false},
          {id_post: '254254', id_group:'7831',id_user: this.user._id, title:'Titulo 1', information:'Informacion de prueba', photo:'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', location: 'Mi casa', contact_info:'test@google.com', pet_type:'Dog', resolved:false},
          {id_post: '245', id_group:'4387',id_user: this.user._id, title:'Titulo 1', information:'Informacion de prueba', photo:'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', location: 'Mi casa', contact_info:'test@google.com', pet_type:'Dog', resolved:false},
          {id_post: '254', id_group:'387737457',id_user: this.user._id, title:'Titulo 1', information:'Informacion de prueba', photo:'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', location: 'Mi casa', contact_info:'test@google.com', pet_type:'Dog', resolved:false},
          {id_post: '254', id_group:'4354',id_user: this.user._id, title:'Titulo 1', information:'Informacion de prueba', photo:'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', location: 'Mi casa', contact_info:'test@google.com', pet_type:'Dog', resolved:false},
          {id_post: '254254', id_group:'37837',id_user: this.user._id, title:'Titulo 1', information:'Informacion de prueba', photo:'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', location: 'Mi casa', contact_info:'test@google.com', pet_type:'Dog', resolved:false},
          {id_post: '24257', id_group:'387378387',id_user: this.user._id, title:'Titulo 1', information:'Informacion de prueba', photo:'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', location: 'Mi casa', contact_info:'test@google.com', pet_type:'Dog', resolved:false},
          {id_post: '7387', id_group:'3878',id_user: this.user._id, title:'Titulo 1', information:'Informacion de prueba', photo:'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', location: 'Mi casa', contact_info:'test@google.com', pet_type:'Dog', resolved:false}
        ]
      });
    }
  }

}
