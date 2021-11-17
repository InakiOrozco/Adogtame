import { Component, OnInit } from '@angular/core';

interface Page{
  title:string;
}

@Component({
  selector: 'app-newpages',
  templateUrl: './newpages.component.html',
  styleUrls: ['./newpages.component.scss']
})
export class NewpagesComponent implements OnInit {

  pages: Array<Page>=[{title: "Guadalajara Norte - Gatos"}, {title: "Guadalajara Sur - Perros"}, {title: "Guadalajara Este - Casas Puente"}, {title: "Guadalajara Oeste - Perros y gatos"}];

  constructor() { }

  ngOnInit(): void {
  }

}
