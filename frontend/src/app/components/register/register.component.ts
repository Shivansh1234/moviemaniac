import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
    private snackBar: MatSnackBar) { }

  profileForm = this.fb.group({
    fname: ['', [Validators.required, Validators.minLength(3)]],
    lname: ['', [Validators.required, Validators.minLength(3)]],
    username: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit(): void {
  }

  onRegister(): void {
    const newUser = {
      fname: this.profileForm.value.fname,
      lname: this.profileForm.value.lname,
      username: this.profileForm.value.username,
      email: this.profileForm.value.email,
      password: this.profileForm.value.password,
    };
    this.authService.registerUser(newUser).subscribe(data => {
      if (data.success) {
        console.log('User Registered');
        this.router.navigate(['/login']);
        this.snackBar.open('User Registerd, Please Login', 'Ok', {
          duration: 2000
        });
      } else {
        this.snackBar.open('Form Data Incorrect', 'Ok', {
          duration: 2000
        });
        console.log('Oops, something went wrong');
      }
    });
  }

  get getForm(): any {
    return this.profileForm.controls;
  }

}