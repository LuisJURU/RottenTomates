import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, IonCard, IonIcon, IonButton, IonButtons, IonList, IonItem, IonLabel, IonNote } from '@ionic/angular/standalone';
import { MovieService } from '../../../services/movie.service';
import { StarRatingComponent } from './startrating';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-moviedetailpage',
  templateUrl: './moviedetailpage.page.html',
  styleUrls: ['./moviedetailpage.page.scss'],
  standalone: true,
  imports: [CommonModule,FormsModule,IonContent,IonHeader,IonTitle,IonToolbar,IonCardHeader,IonCardContent,IonCardSubtitle,IonCardTitle,IonCard,IonIcon,IonButton,IonButtons,IonList,IonItem,IonLabel,IonNote,StarRatingComponent,HttpClientModule]
})

export class MoviedetailpagePage implements OnInit {
  movie: any = null; // Detalles de la película
  selectedRating: number = 0; // Calificación seleccionada
  userComment: string = ''; // Comentario del usuario
  stars: number[] = [1, 2, 3, 4, 5]; // Representación de las estrellas
  comments: any[] = []; // Lista de comentarios
  isFavorite: boolean = false; // Estado de favorito

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=df909bb4f66f7a249d14982f1d866d25`;
      this.http.get(apiUrl).subscribe(
        (data) => {
          console.log('Detalles de la película:', data);
          this.movie = data;
  
          // Verifica si la película ya está en favoritos
          this.checkIfFavorite();
  
          // Cargar los comentarios después de cargar la película
          this.loadComments();
        },
        (error) => {
          console.error('Error al cargar la película:', error);
        }
      );
    }
  }

  checkIfFavorite() {
    const storedFavorites = localStorage.getItem('favoriteMovies');
    const favoriteMovies = storedFavorites ? JSON.parse(storedFavorites) : [];
    this.isFavorite = favoriteMovies.some((m: any) => m.id === this.movie.id);
  }

  rateMovie(rating: number) {
    this.selectedRating = rating;
    console.log('Calificación seleccionada:', this.selectedRating);
    this.saveUserRating(this.movie.id, rating);
  }

  saveRatingAndComment() {
    if (!this.movie || !this.selectedRating) {
      console.error('Debe seleccionar una calificación antes de guardar.');
      return;
    }
  
    this.movieService.rateMovie(this.movie.id, this.selectedRating, this.userComment).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        alert('¡Gracias por tu opinión!');
        this.userComment = '';
        this.selectedRating = 0;
  
        // Recargar los comentarios después de guardar
        this.loadComments();
      },
      (error) => {
        console.error('Error al guardar la calificación y el comentario:', error);
        alert(`Hubo un error al guardar tu opinión: ${error.message || 'Inténtalo de nuevo.'}`);
      }
    );
  }

  
  loadComments() {
    if (!this.movie || !this.movie.id) {
      console.error('No se puede cargar los comentarios porque no hay una película cargada.');
      return;
    }
  
    const apiUrl = `https://rotten-tomates-git-main-luis-jarabas-projects.vercel.app/api/comments/${this.movie.id}`;
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.comments = response; // Actualiza la lista de comentarios
        console.log('Comentarios cargados:', this.comments);
      },
      (error) => {
        console.error('Error al cargar los comentarios:', error);
      }
    );
  }

  getUserRating(movieId: string): number | null {
    const ratings = JSON.parse(localStorage.getItem('userRatings') || '{}');
    return ratings[movieId] || null;
  }

  saveUserRating(movieId: string, rating: number) {
    const ratings = JSON.parse(localStorage.getItem('userRatings') || '{}');
    ratings[movieId] = rating;
    localStorage.setItem('userRatings', JSON.stringify(ratings));
  }

  goBack() {
    this.router.navigate(['/home']);
  }

    setDefaultImage(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'assets/icon/Untitled Project.png'; 
  }

  addToFavorites(movie: any) {
    const storedFavorites = localStorage.getItem('favoriteMovies');
    const favoriteMovies = storedFavorites ? JSON.parse(storedFavorites) : [];

    const isAlreadyFavorite = favoriteMovies.some((m: any) => m.id === movie.id);
    if (!isAlreadyFavorite) {
      favoriteMovies.push(movie);
      localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
      console.log(`${movie.title} se agregó a favoritos.`);
    } else {
      console.log(`${movie.title} ya está en favoritos.`);
    }
  }

  toggleFavorite(movie: any) {
    const storedFavorites = localStorage.getItem('favoriteMovies');
    const favoriteMovies = storedFavorites ? JSON.parse(storedFavorites) : [];

    if (this.isFavorite) {
      // Eliminar de favoritos
      const updatedFavorites = favoriteMovies.filter((m: any) => m.id !== movie.id);
      localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
      console.log(`${movie.title} se eliminó de favoritos.`);
    } else {
      // Agregar a favoritos
      favoriteMovies.push(movie);
      localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
      console.log(`${movie.title} se agregó a favoritos.`);
    }

    // Alterna el estado de favorito
    this.isFavorite = !this.isFavorite;
  }
}