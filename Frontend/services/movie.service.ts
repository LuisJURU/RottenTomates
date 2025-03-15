import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private backendUrl = 'http://localhost:5000/api/movies'; // URL base del backend

  constructor(private http: HttpClient) { }
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get(`${this.backendUrl}/search`, {
      params: { query }
    });
  }

  getMovieDetails(movieId: string): Observable<any> {
    return this.http.get(`${this.backendUrl}/${movieId}`);
  }

  getBestMoviesOfMonth(): Observable<any> {
    return from(axios.get(`${this.apiUrl}/movie/top_rated`, {
      params: {
        api_key: this.apiKey
      }
    }).then(response => response.data.results));
  }

  getCategories(): Observable<any> {
    return from(axios.get(`${this.apiUrl}/genre/movie/list`, {
      params: {
        api_key: this.apiKey
      }
    }).then(response => response.data.genres));
  }

  getMoviesByCategory(categoryId: string, page: number = 1): Observable<any> {
    return from(axios.get(`${this.apiUrl}/discover/movie`, {
      params: {
        api_key: this.apiKey,
        with_genres: categoryId,
        page: page
      }
    }).then(response => response.data.results));
  }
}