import { Component, OnInit } from '@angular/core';
import { PostsService, Post } from 'src/app/common/services/posts.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts:Array<Post> | any = [];
  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.getPostFromSubscribedGroups().subscribe(posts => {
      if(posts){
        this.posts = posts;
        this.posts = this.posts[0];
        console.log(this.posts);
      }
    })
  }
  
}