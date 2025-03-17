import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StarRatingComponent } from '../moviedetailpage/startrating';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, StarRatingComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
  popularMovies: any[] = [];
  bestMovies: any[] = [];
  categories: any[] = [];
  selectedCategory: string = '';
  currentPage: number = 1;
  private apiUrl = 'https://backend-4hqancgim-luis-jarabas-projects.vercel.app/api/movies'; // URL base del backend en Vercel
  // private apiUrl = 'http://localhost:5000/api/movies'; // URL base del backend

  constructor(private navCtrl: NavController, private http: HttpClient) { }

  ngOnInit() {
    this.loadPopularMovies();
    this.loadBestMovies();
    this.loadCategories();
  }

  loadPopularMovies(page: number = 1) {
    this.http.get<any[]>(`${this.apiUrl}/popular`, { params: { page: page.toString() } }).subscribe(
      (movies) => this.popularMovies = [...this.popularMovies, ...movies],
      (error) => console.error('Error loading popular movies', error)
    );
  }

  loadNewMovies(page: number = 1) {
    this.http.get<any[]>(`${this.apiUrl}/new`, { params: { page: page.toString() } }).subscribe(
      (movies) => this.popularMovies = [...this.popularMovies, ...movies],
      (error) => console.error('Error loading new movies', error)
    );
  }

  loadFeaturedMovies(page: number = 1) {
    this.http.get<any[]>(`${this.apiUrl}/featured`, { params: { page: page.toString() } }).subscribe(
      (movies) => this.popularMovies = [...this.popularMovies, ...movies],
      (error) => console.error('Error loading featured movies', error)
    );
  }

  loadBestMovies() {
    this.http.get<any[]>(`${this.apiUrl}/best`).subscribe(
      (movies) => this.bestMovies = movies,
      (error) => console.error('Error loading best movies of the month', error)
    );
  }

  loadCategories() {
    this.http.get<any[]>(`${this.apiUrl}/categories`).subscribe(
      (categories) => {
        this.categories = [{ id: '', name: 'All Genres' }, ...categories];
      },
      (error) => console.error('Error loading categories', error)
    );
  }

  searchMovies(event: any) {
    const query = event.target.value.toLowerCase();
    if (query && query.trim() !== '') {
      this.http.get<any[]>(`${this.apiUrl}/search`, { params: { query: query } }).subscribe(
        (movies) => this.popularMovies = movies,
        (error) => console.error('Error searching movies', error)
      );
    } else {
      this.loadPopularMovies();
    }
  }

  filterCategory(event: any) {
    const categoryId = event.detail.value;
    this.selectedCategory = categoryId;
    this.currentPage = 1;
    this.popularMovies = [];
    if (categoryId) {
      this.loadMoviesByCategory(categoryId, this.currentPage);
    } else {
      this.loadPopularMovies(this.currentPage);
    }
  }

  filterMovies(filterType: string | undefined) {
    if (typeof filterType !== 'string') return;
    this.currentPage = 1;
    this.popularMovies = [];
    switch (filterType) {
      case 'popular':
        this.loadPopularMovies(this.currentPage);
        break;
      case 'new':
        this.loadNewMovies(this.currentPage);
        break;
      case 'featured':
        this.loadFeaturedMovies(this.currentPage);
        break;
      default:
        this.loadPopularMovies(this.currentPage);
        break;
    }
  }

  loadMoviesByCategory(categoryId: string, page: number = 1) {
    this.http.get<any[]>(`${this.apiUrl}/category/${categoryId}`, { params: { page: page.toString() } }).subscribe(
      (movies) => this.popularMovies = [...this.popularMovies, ...movies],
      (error) => console.error('Error loading movies by category', error)
    );
  }

  loadMoreMovies(event: any) {
    this.currentPage++;
    if (this.selectedCategory) {
      this.loadMoviesByCategory(this.selectedCategory, this.currentPage);
    } else {
      this.loadPopularMovies(this.currentPage);
    }
    event.target.complete();
  }

  logout() {
    console.log('Cerrando sesión...');
    this.navCtrl.navigateRoot('/login');
  }
}