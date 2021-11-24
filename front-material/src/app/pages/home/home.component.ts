import { Component, OnInit } from '@angular/core';
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
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts:Array<Post> = [
    {id_post: '1254', id_group:'78324',id_user: '1', title:'Titulo 1', information:'Informacion de prueba', photo:'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', location: 'Mi casa', contact_info:'test@google.com', pet_type:'Dog', resolved:false},
    {id_post: '254254', id_group:'7831',id_user: '123', title:'Titulo 1', information:'Informacion de prueba', photo:'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', location: 'Mi casa', contact_info:'test@google.com', pet_type:'Dog', resolved:false},
    {id_post: '245', id_group:'4387',id_user: '321', title:'Titulo 1', information:'Informacion de prueba', photo:'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', location: 'Mi casa', contact_info:'test@google.com', pet_type:'Dog', resolved:false},
    {id_post: '254', id_group:'387737457',id_user: '321', title:'Titulo 1', information:'Informacion de prueba', photo:'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', location: 'Mi casa', contact_info:'test@google.com', pet_type:'Dog', resolved:false},
    {id_post: '254', id_group:'4354',id_user: '543', title:'Titulo 1', information:'Informacion de prueba', photo:'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', location: 'Mi casa', contact_info:'test@google.com', pet_type:'Dog', resolved:false},
    {id_post: '254254', id_group:'37837',id_user: '765', title:'Titulo 1', information:'Informacion de prueba', photo:'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', location: 'Mi casa', contact_info:'test@google.com', pet_type:'Dog', resolved:false},
    {id_post: '24257', id_group:'387378387',id_user: '8765', title:'Titulo 1', information:'Informacion de prueba', photo:'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', location: 'Mi casa', contact_info:'test@google.com', pet_type:'Dog', resolved:false},
    {id_post: '7387', id_group:'3878',id_user: '765', title:'Titulo 1', information:'Informacion de prueba', photo:'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', location: 'Mi casa', contact_info:'test@google.com', pet_type:'Dog', resolved:false}
  ]
  constructor() { }

  ngOnInit(): void {
  }
  
}