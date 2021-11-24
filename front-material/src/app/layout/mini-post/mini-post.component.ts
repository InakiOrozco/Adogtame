import { Component, Input, OnInit } from '@angular/core';

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
  selector: 'mini-post',
  templateUrl: './mini-post.component.html',
  styleUrls: ['./mini-post.component.scss']
})
export class MiniPostComponent implements OnInit {
  @Input() post:Post;

  constructor() { 
  }

  ngOnInit(): void {
  }

}
