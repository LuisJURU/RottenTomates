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

  getNewMovies(page: number = 1): Observable<any> {
    return from(axios.get(`${this.apiUrl}/movie/now_playing`, {
      params: {
        api_key: this.apiKey,
        page: page
      }
    }).then(response => response.data.results));
  }

  getFeaturedMovies(page: number = 1): Observable<any> {
    return from(axios.get(`${this.apiUrl}/movie/upcoming`, {
      params: {
        api_key: this.apiKey,
        page: page
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

  rateMovie(movieId: string, rating: number, comment: string): Observable<any> {
    const payload = { movieId, rating, comment };
    const apiUrl = 'https://rotten-tomates-git-main-luis-jarabas-projects.vercel.app/api/rate';
    return from(axios.post(apiUrl, payload).then(response => response.data));
  }
}