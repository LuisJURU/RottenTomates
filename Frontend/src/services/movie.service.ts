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

  getPopularMovies(page: number = 1): Observable<any> {
    return from(axios.get(`${this.apiUrl}/movie/popular`, {
      params: {
        api_key: this.apiKey,
        page: page
      }
    }).then(response => response.data.results));
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