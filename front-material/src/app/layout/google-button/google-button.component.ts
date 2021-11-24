import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'google-button',
  templateUrl: './google-button.component.html',
  styleUrls: ['./google-button.component.scss']
})
export class GoogleButtonComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  onClick(){
    this.authService.googleAuth();
  }

}
