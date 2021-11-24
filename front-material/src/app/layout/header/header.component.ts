import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/common/services/auth.service';
import { CreateGroupDialog } from '../your-pages/your-pages.component';
@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user$:Observable<any>;
  user:any = {isLoggedIn:false};

  constructor(private router: Router, public authService: AuthService, private dialog: MatDialog) {
    this.user$ = new Observable<Object>();
  }

  ngOnInit(): void {
    this.authService.loadUser();
    this.user$ = this.authService.getUser$();
    this.user$.subscribe(user => {  
      if(user.token){
        this.user = user}else{this.user.isLoggedIn = false}
    });

  }

  logOut(){
    this.authService.logOut();
    this.user = {};
  }

  createGroup(){
    const dialogRef = this.dialog.open(CreateGroupDialog);
  }

}
