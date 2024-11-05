import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private _auth:AuthService
  
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

  }







  onSubmit() {
    const data = this.loginForm.value;
    console.log('Form Submitted', data);
    if (this.loginForm.valid) {
      console.log("Data is present");
      this._auth.loginUser(data).subscribe({
        next: (val: boolean) => {
          if (val) { 
            console.log("User permitted to enter");
            this.router.navigate(['/home']);
          } else {
            console.log("Login failed"); 
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.log("User not Authorized");
    }
  }
  
  
  onCancel() {
    this.loginForm.reset();
  }
}
