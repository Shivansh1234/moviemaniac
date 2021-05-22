import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
    private snackBar: MatSnackBar) { }

  // Reactive form for login
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit(): void {
  }

  // Login Authorization
  onLogin(): void {
    const user: User = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        console.log('User verified');
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['/profile']);
        this.snackBar.open('Logged In successfull', 'Ok', {
          duration: 2000
        });
      } else {
        this.snackBar.open('No User found with entered credentials', 'Ok', {
          duration: 2000
        });
        console.log('Incorrect username or password');
      }
    });
  }

  get getRegisterForm(): any {
    return this.loginForm.controls;
  }

}
