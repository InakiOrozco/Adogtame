import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  constructor(private authService: AuthService) {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password:  new FormControl(null, [Validators.required]),
      r_password:  new FormControl(null, [Validators.required]),
      name:  new FormControl(null, [Validators.required]),
      last_name:  new FormControl(null, [Validators.required]),
      profile_picture:  new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.registerForm.valid){
      const newUser = this.registerForm.value;
      if(newUser.password === newUser.r_password){
        this.authService.register(newUser.email, newUser.password, newUser.name, newUser.last_name, newUser.profile_picture);
      }
    }
  }

  onFileChange(event:any) {
    const file = event.target.files[0];
    const extencion = file.name.split('.').pop();
    if(extencion === "jpg" || extencion === "jpeg" || extencion === "png"){
      this.registerForm.patchValue({
        profile_picture: file
      });
    }else {
      event.target.value = '';
    }
  }
}
