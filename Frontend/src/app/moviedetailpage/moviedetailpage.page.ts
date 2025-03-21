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
          this.selectedRating = this.getUserRating(movieId) || 0;
        },
        (error) => {
          console.error('Error al cargar la película:', error);
        }
      );
    }
  }

  rateMovie(rating: number) {
    this.selectedRating = rating;
    console.log('Calificación seleccionada:', this.selectedRating);
    this.saveUserRating(this.movie.id, rating);
  }

  saveRatingAndComment() {
    const commentData = {
      movieId: this.movie.id,
      rating: this.selectedRating,
      comment: this.userComment,
    };
  
    this.http.post('https://rotten-tomates-git-main-luis-jarabas-projects.vercel.app/api/comments', commentData).subscribe(
      (response) => {
        console.log('Comentario guardado:', response);
        alert('¡Comentario guardado con éxito!');
      },
      (error) => {
        console.error('Error al guardar el comentario:', error);
        alert('Hubo un error al guardar el comentario.');
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
}