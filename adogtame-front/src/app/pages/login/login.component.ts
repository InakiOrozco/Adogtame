import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private authService:AuthService, private router: Router) { 
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
  }
  onSubmit():void {
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
      this.router.navigate(['/home']);
    }
  }

}
