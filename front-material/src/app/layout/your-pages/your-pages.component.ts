import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'your-pages',
  templateUrl: './your-pages.component.html',
  styleUrls: ['./your-pages.component.scss']
})
export class YourPagesComponent implements OnInit {

  @Input() idUser:string = '';

  groups:any = [
    {id:'321', name:"Guadalajara dsa"},
    {id:'321321', name:"Guadalajara nodsarte"},
    {id:'45354', name:"Guadalajara nordsate"},
    {id:'675', name:"Guadalajara nodsadrte"},
    {id:'7685', name:"Guadalajara ndsaorte"},
    {id:'3524', name:"Guadalajara nodsadrte"}
  ]

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
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
