import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  getComments(id: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://rotten-tomates-git-main-luis-jarabas-projects.vercel.app/api/movies'; // URL base del backend

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

  rateMovie(movieId: string, rating: number, comment: string, userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/rate`, { movieId, rating, comment, userId });
  }
}