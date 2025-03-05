import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { MovieService } from '../../../services/movie.service'; // Importa el servicio

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule] // Asegúrate de importar RouterModule
})
export class HomePage implements OnInit {
  popularMovies: any[] = []; // Variable para almacenar las películas populares

  constructor(private navCtrl: NavController, private movieService: MovieService) { }

  ngOnInit() {
    this.loadPopularMovies(); // Cargar las películas populares al inicializar el componente
  }

  loadPopularMovies() {
    this.movieService.getPopularMovies().subscribe(
      (movies) => this.popularMovies = movies,
      (error) => console.error('Error loading popular movies', error)
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
      this.loadPopularMovies(); // Si la barra de búsqueda está vacía, cargar las películas populares
    }
  }

  logout() {
    // Aquí puedes agregar la lógica para cerrar sesión, como limpiar el almacenamiento local, etc.
    console.log('Cerrando sesión...');
    this.navCtrl.navigateRoot('/login');
  }
}