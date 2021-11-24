import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logOut(){
    this.router.navigate(['/']);
  }

}
