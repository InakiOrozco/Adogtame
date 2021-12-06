import { Component, OnInit, Input } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/common/services/auth.service';
<<<<<<< Updated upstream
import { GroupsService, Group } from 'src/app/common/services/groups.service';
=======
import { Group, GroupsService } from 'src/app/common/services/groups.service';
>>>>>>> Stashed changes

@Component({
  selector: 'your-pages',
  templateUrl: './your-pages.component.html',
  styleUrls: ['./your-pages.component.scss']
})
export class YourPagesComponent implements OnInit {

  groups:Group | any

  constructor(public dialog: MatDialog,private authService: AuthService, private groupService: GroupsService) {  
  } 

  ngOnInit(): void {
    this.groupService.getGroupsByUserId(this.authService.getId()).subscribe(groups=>{
      this.groups= groups;
    })
  }

  enableDialog(){
    const dialogRef = this.dialog.open(CreateGroupDialog);
  }
}

@Component({
  selector:'create-group',
  templateUrl: './create-group.component.html',
  styleUrls:['./your-pages.component.scss']
})

export class CreateGroupDialog{
  
  groupForm: FormGroup;

  constructor(public dialog:MatDialogRef<CreateGroupDialog>, private groupService: GroupsService){
    this.groupForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      photo: new FormControl(null, [Validators.required]),
    })

  }

  createPost(){
    if(this.groupForm.valid){
      const values = this.groupForm.value;
      console.log(values);
      // @ts-ignore
      this.groupService.createGroup(values.name, values.description, values.photo);
    }
  }

  onFileChange(event:any) {
    const file = event.target.files[0];
    const extencion = file.name.split('.').pop();
    if(extencion === "jpg" || extencion === "jpeg" || extencion === "png"){
      this.groupForm.patchValue({
        photo: file
      });
    }else {
      event.target.value = '';
    }
  }
}
