import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular'; // Importa NavController
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FavoritesPage {
  favoriteMovies: any[] = [];
  isSidebarOpen: boolean = false; // Estado del menú lateral

  constructor(private navCtrl: NavController) {} // Inyecta NavController

  ngOnInit() {
    this.loadFavoriteMovies();
  }

  loadFavoriteMovies() {
    const storedFavorites = localStorage.getItem('favoriteMovies');
    this.favoriteMovies = storedFavorites ? JSON.parse(storedFavorites) : [];
  }

  setDefaultImage(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'assets/icon/Untitled Project.png';
  }

  removeFromFavorites(movie: any) {
    this.favoriteMovies = this.favoriteMovies.filter((m) => m.id !== movie.id);
    localStorage.setItem('favoriteMovies', JSON.stringify(this.favoriteMovies));
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Alterna el estado del menú
  }

  goToHome() {
    this.navCtrl.navigateRoot('/home'); // Redirige a la página principal
    this.isSidebarOpen = false; // Cierra el menú lateral
  }

  goToFavorites() {
    console.log('Ya estás en la página de favoritos.');
  }

  logout() {
    console.log('Cerrando sesión...');
    localStorage.clear(); // Limpia el almacenamiento local
    sessionStorage.clear(); // Limpia el almacenamiento de sesión (si lo usas)
    this.navCtrl.navigateRoot('/login'); // Redirige a la página de inicio de sesión
    this.isSidebarOpen = false; // Cierra el menú lateral
  }

  addToFavorites(movie: any) {
    // Obtén la lista de favoritos almacenada en localStorage
    const storedFavorites = localStorage.getItem('favoriteMovies');
    const favoriteMovies = storedFavorites ? JSON.parse(storedFavorites) : [];

    // Verifica si la película ya está en favoritos
    const isAlreadyFavorite = favoriteMovies.some((m: any) => m.id === movie.id);
    if (!isAlreadyFavorite) {
      favoriteMovies.push(movie); // Agrega la película a la lista
      localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies)); // Guarda la lista actualizada en localStorage
      console.log(`${movie.title} se agregó a favoritos.`);
    } else {
      console.log(`${movie.title} ya está en favoritos.`);
    }
  }
}