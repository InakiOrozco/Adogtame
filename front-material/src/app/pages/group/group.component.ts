import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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
  selector: 'group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  group:any = {};
  isSubscribed:boolean = false;

  posts:Array<Post> = [
    {id_post: '1254', id_group:'78324',id_user: '312', title:'Titulo 1', information:'Informacion de prueba', photo:'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', location: 'Mi casa', contact_info:'test@google.com', pet_type:'Dog', resolved:false},
    {id_post: '254254', id_group:'7831',id_user: '231', title:'Titulo 1', information:'Informacion de prueba', photo:'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', location: 'Mi casa', contact_info:'test@google.com', pet_type:'Dog', resolved:false},
    {id_post: '245', id_group:'4387',id_user: '321', title:'Titulo 1', information:'Informacion de prueba', photo:'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', location: 'Mi casa', contact_info:'test@google.com', pet_type:'Dog', resolved:false},
    {id_post: '254', id_group:'387737457',id_user: '321', title:'Titulo 1', information:'Informacion de prueba', photo:'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', location: 'Mi casa', contact_info:'test@google.com', pet_type:'Dog', resolved:false},
    {id_post: '254', id_group:'4354',id_user: '32321', title:'Titulo 1', information:'Informacion de prueba', photo:'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', location: 'Mi casa', contact_info:'test@google.com', pet_type:'Dog', resolved:false},
    {id_post: '254254', id_group:'37837',id_user: '321321', title:'Titulo 1', information:'Informacion de prueba', photo:'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', location: 'Mi casa', contact_info:'test@google.com', pet_type:'Dog', resolved:false},
    {id_post: '24257', id_group:'387378387',id_user: '321321', title:'Titulo 1', information:'Informacion de prueba', photo:'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', location: 'Mi casa', contact_info:'test@google.com', pet_type:'Dog', resolved:false},
    {id_post: '7387', id_group:'3878',id_user: '321321', title:'Titulo 1', information:'Informacion de prueba', photo:'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', location: 'Mi casa', contact_info:'test@google.com', pet_type:'Dog', resolved:false}
  ]

  constructor(private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.group.id = this.route.snapshot.paramMap.get('id');
    this.group.name = "Group with id: " + this.group.id;
    this.group.description = "Description of group " + this.group.name;
  }

  toggleSubscribe(){
    this.isSubscribed = !this.isSubscribed;
  }

  enableDialog(){
    const dialogRef = this.dialog.open(CreatePostDialog);
  }

}

@Component({
  selector:'create-post',
  templateUrl:'./create-post.component.html',
  styleUrls:['./group.component.scss']
})
export class CreatePostDialog{
  
  constructor(public dialog:MatDialogRef<CreatePostDialog>){}

  createPost(){
    console.log('Creado');
    this.dialog.close();
  }
}
