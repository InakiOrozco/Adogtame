import { Component, OnInit } from '@angular/core';

interface Minipost{
  title:string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  miniposts: Array<Minipost>=[{title: "Guadalajara Norte - Gatos"}, {title: "Guadalajara Sur - Perros"}, {title: "Guadalajara Este - Casas Puente"}, {title: "Guadalajara Oeste - Perros y gatos"}];
  //posts: Array<Post>=[];

  constructor() { }

  ngOnInit(): void {
  }
}
