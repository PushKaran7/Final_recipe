import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, 
    private router: Router,
    private _auth:AuthService,
    private snackBar: MatSnackBar
    
  
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
     
    });
  }

  onSubmit(): void {
    
    const data=this.registerForm.value;
    console.log("Form Submited value:",data );
    if (this.registerForm.valid) {
      console.log("Data is present");
      this._auth.registerUser(data).subscribe({
        next: (val: any) => {
          console.log('Response:', val);
          this.snackBar.open("User Created successfully!", "Close", {
            duration: 3000,
            horizontalPosition: 'center', 
            verticalPosition: 'top',
          });
        },
        error: (err) => {
          console.log(err);
        }

      })

    }
    else {
      console.log("User not Authorized")
    }

  }

}
