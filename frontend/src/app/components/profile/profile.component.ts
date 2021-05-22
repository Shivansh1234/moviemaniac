import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // tslint:disable-next-line:new-parens
  user: User = new User;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder,
    private snackBar: MatSnackBar) { }

  editForm = this.fb.group({
    fname: ['', [Validators.required, Validators.minLength(3)]],
    lname: ['', [Validators.required, Validators.minLength(3)]],
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  get getEditForm(): any {
    return this.editForm.controls;
  }

  getUserDetails(): void {
    this.authService.getProfile().subscribe(data => {
      this.user = data;
      this.user.fname = data.fname;
      this.editForm.patchValue({
        fname: this.user.fname,
        lname: this.user.lname,
        username: this.user.username,
        email: this.user.email,
        password: this.user.password
      });
      console.log(this.user);
    });
  }

  onDeleteAccount(): void {
    this.authService.deleteUserProfile(this.user?._id).subscribe(data => {
      if (data.n === 1) {
        localStorage.clear();
        this.router.navigate(['/login']);
        this.snackBar.open('Your account has been deleted', 'Ok');
      }
    });
  }

  ngOnInit(): void {
    this.getUserDetails();
  }

  onEdit(): void {
    console.log(this.editForm.value);
    console.log(this.user._id);
    const updateUser = {
      fname: this.editForm.value.fname,
      lname: this.editForm.value.lname
    };
    this.authService.updateUser(updateUser).subscribe(data => {
      if (data.success) {
        console.log('User Updated');
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/profile']);
          window.scroll(0, 0);
        });
        this.snackBar.open('User Updated', 'Ok', {
          duration: 2000
        });
      } else {
        this.snackBar.open('Form Data Incorrect', 'Ok');
        console.log('Oops, something went wrong');
      }
    });
  }

}