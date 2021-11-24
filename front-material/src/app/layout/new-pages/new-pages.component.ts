import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'new-pages',
  templateUrl: './new-pages.component.html',
  styleUrls: ['./new-pages.component.scss']
})
export class NewPagesComponent implements OnInit {
  @Input() idUser:string;

  groups:any = [
    {id:'321', name:"Guadalajara dsa"},
    {id:'321321', name:"Guadalajara nodsarte"},
    {id:'45354', name:"Guadalajara nordsate"},
    {id:'675', name:"Guadalajara nodsadrte"},
    {id:'7685', name:"Guadalajara ndsaorte"},
    {id:'3524', name:"Guadalajara nodsadrte"}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
