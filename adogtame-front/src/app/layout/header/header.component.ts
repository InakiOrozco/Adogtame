import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  logged = false;
  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.logged = this.authService.isLoggedIn();
  }

  onClick():void {
    this.authService.removeToken();
    this.logged = this.authService.isLoggedIn();
    this.router.navigate(['/home']);
  }
}
