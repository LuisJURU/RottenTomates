import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:3000/api/movies'; // URL base del backend

  constructor(private http: HttpClient) { }

  getPopularMovies(page: number = 1): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/popular`, { params: { page: page.toString() } });
  }

  getNewMovies(page: number = 1): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/new`, { params: { page: page.toString() } });
  }

  getFeaturedMovies(page: number = 1): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/featured`, { params: { page: page.toString() } });
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/search`, { params: { query: query } });
  }

  getMovieDetails(movieId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/details/${movieId}`);
  }

  getBestMoviesOfMonth(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/best`);
  }

  getCategories(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`);
  }

  getMoviesByCategory(categoryId: string, page: number = 1): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/category/${categoryId}`, { params: { page: page.toString() } });
  }
}