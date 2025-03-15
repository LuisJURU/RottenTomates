import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private backendUrl = 'http://localhost:5000/api/movies'; // URL base del backend

  constructor(private http: HttpClient) { }

  getPopularMovies(): Observable<any> {
    return this.http.get(`${this.backendUrl}/popular`);
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get(`${this.backendUrl}/search`, {
      params: { query }
    });
  }

  getMovieDetails(movieId: string): Observable<any> {
    return this.http.get(`${this.backendUrl}/${movieId}`);
  }
}