import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, public authService: AuthService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {

  }

  // Logging out session
  onLogoutClick(): void {
    this.authService.logoutUser();
    console.log('User logout successfully');
    this.router.navigate(['/login']);
    this.snackbar.open('Logout Successfully', 'Ok');
  }

}