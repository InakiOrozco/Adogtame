import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'your-pages',
  templateUrl: './your-pages.component.html',
  styleUrls: ['./your-pages.component.scss']
})
export class YourPagesComponent implements OnInit {

  user$:Observable<any>;
  user:any = {isLoggedIn:false};
  
  groups:any = [
    {id:'321', name:"Guadalajara dsa"},
    {id:'321321', name:"Guadalajara nodsarte"},
    {id:'45354', name:"Guadalajara nordsate"},
    {id:'675', name:"Guadalajara nodsadrte"},
    {id:'7685', name:"Guadalajara ndsaorte"},
    {id:'3524', name:"Guadalajara nodsadrte"}
  ]

  constructor(public dialog: MatDialog,private authService: AuthService) {  
      this.user$ = new Observable<Object>();
  } 

  ngOnInit(): void {
    this.user$ = this.authService.getUser$();
    this.user$.subscribe(user => {  
      if(user.token){
        this.user = user}else{this.user.isLoggedIn = false}
    });
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
