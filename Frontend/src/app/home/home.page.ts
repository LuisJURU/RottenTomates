import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StarRatingComponent } from '../moviedetailpage/startrating';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, FormsModule, StarRatingComponent], // Agrega FormsModule a los imports
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
  popularMovies: any[] = [];
  bestMovies: any[] = [];
  categories: any[] = [];
  selectedCategory: string = '';
  currentPage: number = 1;
  isSidebarOpen: boolean = false; // Estado de la barra lateral
  isLoading: boolean = false; // Bandera para evitar múltiples cargas
  private apiUrl = 'https://rotten-tomates-git-main-luis-jarabas-projects.vercel.app/api/movies'; // URL base del backend en Vercel
  currentSlide: number = 0;
  autoSlideInterval: any;
  startX: number = 0;
  endX: number = 0;

  constructor(private navCtrl: NavController, private http: HttpClient) {}

  ngOnInit() {
    this.loadPopularMovies();
    this.loadBestMovies();
    this.loadCategories();
    this.startAutoSlide(); // Inicia el cambio automático
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
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

  filterCategory(categoryId: string) {
    this.selectedCategory = categoryId;
    this.currentPage = 1;
    this.popularMovies = [];
    if (categoryId) {
      this.loadMoviesByCategory(categoryId, this.currentPage);
    } else {
      this.loadPopularMovies(this.currentPage);
    }
  }

  filterMovies(filterType: string) {
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

  onScroll(event: any) {
    const scrollElement = event.target;

    // Verifica si el usuario ha llegado al final del contenedor
    if (scrollElement.scrollHeight - scrollElement.scrollTop <= scrollElement.clientHeight + 100) {
      this.loadMoreMovies();
    }
  }

  loadMoviesByCategory(categoryId: string, page: number = 1) {
    this.http.get<any[]>(`${this.apiUrl}/category/${categoryId}`, { params: { page: page.toString() } }).subscribe(
      (movies) => {
        this.popularMovies = [...this.popularMovies, ...movies];
        this.isLoading = false; // Restablece la bandera después de la carga
      },
      (error) => {
        console.error('Error loading movies by category', error);
        this.isLoading = false; // Restablece la bandera incluso si hay un error
      }
    );
  }

  loadMoreMovies() {
    if (this.isLoading) {
      return; // Si ya se está cargando, no hacer nada
    }

    this.isLoading = true; // Indica que la carga está en progreso

    if (this.selectedCategory) {
      this.loadMoviesByCategory(this.selectedCategory, ++this.currentPage);
    } else {
      this.loadPopularMovies(++this.currentPage);
    }

    // Simula un retraso para asegurarse de que la bandera se actualice correctamente
    setTimeout(() => {
      this.isLoading = false; // Restablece la bandera después de la carga
    }, 1000); // Ajusta el tiempo según sea necesario
  }

  logout() {
    console.log('Cerrando sesión...');
    this.navCtrl.navigateRoot('/login');
  }

  setDefaultImage(event: Event) {
    const element = event.target as HTMLImageElement;
    element.style.display = 'none'; // Oculta la imagen
    element.parentElement!.style.backgroundColor = '#f0f0f0'; // Fondo de color por defecto
    element.parentElement!.style.display = 'flex'; // Centra el contenido
    element.parentElement!.style.justifyContent = 'center';
    element.parentElement!.style.alignItems = 'center';
    element.parentElement!.innerHTML = '<p style="color: #888;">Sin imagen</p>'; // Texto opcional
  }

  prevSlide() {
    const totalSlides = this.bestMovies.length;
    this.currentSlide--;
    this.updateCarousel();

    // Si llega al principio (incluyendo el duplicado), reinicia al último slide real
    if (this.currentSlide === 0) {
      setTimeout(() => {
        const carousel = document.querySelector('.carousel') as HTMLElement;
        carousel.style.transition = 'none'; // Elimina la transición para el salto
        this.currentSlide = totalSlides; // Reinicia al último slide real
        this.updateCarousel();
      }, 1000); // Tiempo igual a la duración de la transición (1s)
    }
  }

  nextSlide() {
    const totalSlides = this.bestMovies.length;
    this.currentSlide++;
    this.updateCarousel();

    // Si llega al final (incluyendo el duplicado), reinicia al primer slide real
    if (this.currentSlide === totalSlides + 1) {
      setTimeout(() => {
        const carousel = document.querySelector('.carousel') as HTMLElement;
        carousel.style.transition = 'none'; // Elimina la transición para el salto
        this.currentSlide = 1; // Reinicia al primer slide real
        this.updateCarousel();
      }, 1000); // Tiempo igual a la duración de la transición (1s)
    }
  }

  updateCarousel() {
    const carousel = document.querySelector('.carousel') as HTMLElement;
    const slideWidth = 320; // Ancho de cada slide (300px + 20px de margen)
    carousel.style.transition = 'transform 1s ease-in-out'; // Asegura una transición suave
    carousel.style.transform = `translateX(-${this.currentSlide * slideWidth}px)`;
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  stopAutoSlide() {
    clearInterval(this.autoSlideInterval);
  }

  onTouchStart(event: TouchEvent) {
    this.stopAutoSlide(); // Detiene el cambio automático mientras se desliza
    this.startX = event.touches[0].clientX;
  }

  onTouchMove(event: TouchEvent) {
    this.endX = event.touches[0].clientX;
  }

  onTouchEnd() {
    const threshold = 50; // Distancia mínima para considerar un deslizamiento
    if (this.startX - this.endX > threshold) {
      this.nextSlide(); // Desliza hacia la izquierda
    } else if (this.endX - this.startX > threshold) {
      this.prevSlide(); // Desliza hacia la derecha
    }
    this.startAutoSlide(); // Reinicia el cambio automático
  }

  handleCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.filterCategory(selectElement.value);
  }

  handleFilterChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.filterMovies(selectElement.value);
  }
}