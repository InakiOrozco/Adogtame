import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  
  registerForm: FormGroup;
  constructor(private authService:AuthService, private router: Router) { 
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      repeatPassword: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
  }
  onSubmit():void {
    if(this.registerForm.valid){
      const values = this.registerForm.value;
      this.authService.register(values.email, values.password, values.name, values.last_name);
      this.router.navigate(['/home']);
    }
  }

}
