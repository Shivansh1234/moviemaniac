import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  // add movie
  addMovie(movieData: any): Observable<any> {
    console.log(movieData);
    return this.http.post(`${environment.baseURL}/movies/update`, movieData);
  }

  getMovieInfo(moviename: any): Observable<any> {
    return this.http.get('https://www.omdbapi.com/?i=' + moviename + `&apikey=${environment.apiKey}`);
  }
}