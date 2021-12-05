import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService, Post } from 'src/app/common/services/posts.service';
import { UsersService, User } from 'src/app/common/services/users.service';


@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  posts:Array<Post> | any = [];
  user:User | any = {};

  
  constructor(private route: ActivatedRoute, private usersService: UsersService, private postsService: PostsService) { }
  
  
  ngOnInit(): void {
    const idUser_URL = this.route.snapshot.paramMap.get('id');
    if(idUser_URL){
      this.usersService.getUserById(idUser_URL).subscribe(user => {
        this.user = user;
        this.postsService.getPostsByUserId(idUser_URL).subscribe(posts => {
          this.posts = posts
        })
      });
    }
  }
}
