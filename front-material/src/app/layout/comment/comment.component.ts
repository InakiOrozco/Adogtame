import { Component, Input, OnInit } from '@angular/core';
import { GroupsService, Group } from 'src/app/common/services/groups.service';

import { PostsService, Post } from 'src/app/common/services/posts.service';
import { UsersService, User } from 'src/app/common/services/users.service';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  
  @Input() post:Post | any;
  user:User | any;
  group:Group | any;
  comment:Comment | any;

  constructor(private usersService: UsersService, private groupsService: GroupsService, private postsService: PostsService) { 
  }

  ngOnInit(): void {
    this.usersService.getUserById(this.post.id_user).subscribe(user=>{
      this.user = user;
    })
    this.groupsService.getGroupById(this.post.id_group).subscribe(group => {
      this.group = group;
    })
    this.postsService.getPostByPostId(this.post._id).subscribe(post => {
      this.post = post;
    })
  }

}
