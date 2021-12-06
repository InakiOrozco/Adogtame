import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Group, GroupsService, GroupUser } from 'src/app/common/services/groups.service';
import { PostsService, Post } from 'src/app/common/services/posts.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  public group:Group | any;
  isSubscribed:boolean = false;

  posts:Post | any;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private groupsService: GroupsService, private postsService: PostsService) { }

  ngOnInit(): void {
    const idGroup = this.route.snapshot.paramMap.get('id');
    this.groupsService.getGroupById(idGroup).subscribe(group=>{
      this.group = group;

      this.postsService.getPostsByGroupId(this.group._id).subscribe(post=>{
        this.posts= post;
      })

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
    const dialogRef = this.dialog.open(CreatePostDialog, {data:this.group._id});
  }

}

@Component({
  selector:'create-post',
  templateUrl:'./create-post.component.html',
  styleUrls:['./group.component.scss']
})
export class CreatePostDialog{

  postForm: FormGroup;
  idGroup:any;
  
  constructor(public dialog:MatDialogRef<CreatePostDialog>, private postsService:PostsService,private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any){
    this.idGroup = this.route.snapshot.paramMap.get('id');
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      information: new FormControl(null, [Validators.required]),
      location: new FormControl(null, [Validators.required]),
      contact_info: new FormControl(null, [Validators.required]),
      pet_type: new FormControl(null, [Validators.required]),
      photo: new FormControl(null, [Validators.required])
    })
  }

  createPost(){
    if(this.postForm.valid){
      const values = this.postForm.value;
      console.log(this.data)
      this.postsService.createPost(values.title, values.information, values.location, values.contact_info, values.pet_type, values.photo, this.dialog, this.data);
    }
  }

  onFileChange(event:any) {
    const file = event.target.files[0];
    const extencion = file.name.split('.').pop();
    if(extencion === "jpg" || extencion === "jpeg" || extencion === "png"){
      this.postForm.patchValue({
        photo: file
      });
    }else {
      event.target.value = '';
    }
  }
}
