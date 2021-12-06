import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Group, GroupsService, GroupUser } from 'src/app/common/services/groups.service';
import { Post } from 'src/app/common/services/posts.service';
@Component({
  selector: 'group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  group:Group | any;
  isSubscribed:boolean = false;

  posts:Array<Post> = []

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private groupsService: GroupsService) { }

  ngOnInit(): void {
    const idGroup = this.route.snapshot.paramMap.get('id');
    this.groupsService.getGroupById(idGroup).subscribe(group=>{
      this.group = group;
      this.groupsService.isSubscribed(this.group._id).subscribe(response => {
        const groupUser = response as any;
        console.log(groupUser)
        if(groupUser.permissions === "none"){
          this.isSubscribed = false;
          console.log('false')
        }else {
          this.isSubscribed = true;
          console.log('true')
        }
      })
    })
  }

  subscribeToGroup(){
    this.groupsService.subscribeToGroup(this.group._id).subscribe(nose =>{
      const data = nose as any;
      if(data._id){
        this.isSubscribed = true;
      }else {
        this.isSubscribed = false;
      }
    })
  }
  unSubscribeToGroup(){
    this.groupsService.unSubscribeToGroup(this.group._id).subscribe((message) => {
      if(message){
        this.groupsService.isSubscribed(this.group._id).subscribe(response => {
          const groupUser = response as any;
          if(groupUser.permissions === "none"){
            this.isSubscribed = false;
          }else {
            this.isSubscribed = true;
          }
        })
      }
    })
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
