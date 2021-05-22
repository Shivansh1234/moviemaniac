import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { MovieService } from 'src/app/services/movie.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line:new-parens
  user: User = new User;
  movieInfo: any;

  private subsink = new Subject();

  // material table
  dataSource: MatTableDataSource<any> | any;
  displayedColumns: string[] = ['Poster', 'Title', 'Genre', 'Year', 'imdbRating', 'Director'];

  @ViewChild(MatPaginator, { static: false }) set paginator(val: MatPaginator) {
    if (val) {
      this.dataSource.paginator = val;
    }
  }
  @ViewChild(MatSort, { static: false }) set sort(val: MatSort) {
    if (val) {
      this.dataSource.sort = val;
    }
  }

  constructor(private fb: FormBuilder, private movieService: MovieService, private authService: AuthService,
    private snackbar: MatSnackBar) { }

  // Movie Title ID
  movieForm = this.fb.group({
    moviename: ['', Validators.required]
  });

  // getting logged in user details
  getLoggedInProfile(): void {
    this.authService.getProfile().pipe(takeUntil(this.subsink)).subscribe(user => {
      this.user = user;
      this.dataSource = new MatTableDataSource(this.user.movies);
      console.log(this.dataSource);
    });
  }

  // Adding a movie
  onAdd(): void {
    console.log(this.user.username);
    console.log(this.movieForm.value.moviename);
    this.movieService.getMovieInfo(this.movieForm.value.moviename).subscribe(data => {
      this.movieInfo = data;
      if (this.movieInfo.Response === 'True') {
        const newMovie = {
          _id: this.user._id,
          movieInfo: this.movieInfo
        };
        // tslint:disable-next-line:no-shadowed-variable
        this.movieService.addMovie(newMovie).subscribe(data => {
          console.log(data);
          console.log(newMovie._id);
          if (data.success) {
            this.snackbar.open(data.msg + ' Added', 'Ok', {
              duration: 2000
            });
          } else {
            if (data.msg === 'Movie already exists') {
              this.snackbar.open('Title already exists', 'Ok', {
                duration: 2000
              });
            } else {
              this.snackbar.open('Something went wrong', 'Ok', {
                duration: 2000
              });
              console.log('Oops, something went wrong');
            }
          }
        });
      } else {
        this.snackbar.open('IMDb ID not found', 'Ok', {
          duration: 2000
        });
      }
    });

  }

  // material functions
  movieFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getLoggedInProfile();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.subsink.next();
    this.subsink.complete();
  }

}
