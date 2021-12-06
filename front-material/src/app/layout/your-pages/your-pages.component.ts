import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/common/services/auth.service';
import { GroupsService, Group } from 'src/app/common/services/groups.service';

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
  
  constructor(public dialog:MatDialogRef<CreateGroupDialog>){}

  createPost(){
    console.log('Creado');
    this.dialog.close();
  }
}
