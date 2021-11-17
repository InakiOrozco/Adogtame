import { Component, OnInit } from '@angular/core';

interface Page{
  title:string;
}

@Component({
  selector: 'app-yourpages',
  templateUrl: './yourpages.component.html',
  styleUrls: ['./yourpages.component.scss']
})
export class YourpagesComponent implements OnInit {


  pages: Array<Page>=[{title: "Guadalajara Norte"}, {title: "Guadalajara Sur"}, {title: "Guadalajara Este"}, {title: "Guadalajara Oeste"}];

  constructor() { }

  ngOnInit(): void {
  }

}
