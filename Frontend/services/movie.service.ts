import { Injectable } from '@angular/core';
import axios from 'axios';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3'; // URL base de la API externa
  private apiKey = 'df909bb4f66f7a249d14982f1d866d25'; // Reemplaza con tu clave de API

  constructor() { }

  getPopularMovies(): Observable<any> {
    return from(axios.get(`${this.apiUrl}/movie/popular`, {
      params: {
        api_key: this.apiKey
      }
    }).then(response => response.data.results));
  }

  searchMovies(query: string): Observable<any> {
    return from(axios.get(`${this.apiUrl}/search/movie`, {
      params: {
        api_key: this.apiKey,
        query: query
      }
    }).then(response => response.data.results));
  }

  getMovieDetails(movieId: string): Observable<any> {
    return from(axios.get(`${this.apiUrl}/movie/${movieId}`, {
      params: {
        api_key: this.apiKey
      }
    }).then(response => response.data));
  }
}