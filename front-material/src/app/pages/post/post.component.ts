import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group, GroupsService } from 'src/app/common/services/groups.service';
import { Post, PostsService } from 'src/app/common/services/posts.service';
import { User, UsersService } from 'src/app/common/services/users.service';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  group:Group | any;
  user:User | any;
  post:Post | any;

  constructor(private route: ActivatedRoute, private postsService:PostsService, private groupService:GroupsService, private usersService:UsersService) { }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    this.postsService.getPostByPostId(postId).subscribe(post => {
      this.post = post;
      this.groupService.getGroupById(this.post.id_group).subscribe(group=>{
        this.group = group;
      });
      this.usersService.getUserById(this.post.id_user).subscribe(user=>{
        this.user = user;
      });
    })
  }

  postComment(event:Event){
    event.preventDefault()
    console.log('test')
  }

}
