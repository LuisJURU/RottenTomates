import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
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
  bestMovies: any[] = []; // Variable para almacenar las mejores películas del mes
  categories: any[] = []; // Variable para almacenar las categorías de películas
  selectedCategory: string = ''; // Variable para almacenar la categoría seleccionada
  currentPage: number = 1; // Página actual para la paginación

  constructor(private navCtrl: NavController, private movieService: MovieService) { }

  ngOnInit() {
    this.loadPopularMovies();
    this.loadBestMovies(); // Cargar las mejores películas del mes al inicializar el componente
    this.loadCategories(); // Cargar las categorías al inicializar el componente
  }

  loadPopularMovies(page: number = 1) {
    this.movieService.getPopularMovies(page).subscribe(
      (movies) => this.popularMovies = [...this.popularMovies, ...movies],
      (error) => console.error('Error loading popular movies', error)
    );
  }

  loadNewMovies(page: number = 1) {
    this.movieService.getNewMovies(page).subscribe(
      (movies) => this.popularMovies = [...this.popularMovies, ...movies],
      (error) => console.error('Error loading new movies', error)
    );
  }

  loadFeaturedMovies(page: number = 1) {
    this.movieService.getFeaturedMovies(page).subscribe(
      (movies) => this.popularMovies = [...this.popularMovies, ...movies],
      (error) => console.error('Error loading featured movies', error)
    );
  }

  loadBestMovies() {
    this.movieService.getBestMoviesOfMonth().subscribe(
      (movies) => this.bestMovies = movies,
      (error) => console.error('Error loading best movies of the month', error)
    );
  }

  loadCategories() {
    this.movieService.getCategories().subscribe(
      (categories) => {
        this.categories = [{ id: '', name: 'All Genres' }, ...categories];
      },
      (error) => console.error('Error loading categories', error)
    );
  }

  searchMovies(event: any) {
    const query = event.target.value.toLowerCase();
    if (query && query.trim() !== '') {
      this.movieService.searchMovies(query).subscribe(
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
    this.movieService.getMoviesByCategory(categoryId, page).subscribe(
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