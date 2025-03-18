import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, IonCard, IonIcon, IonButton, IonButtons, IonList } from '@ionic/angular/standalone';
import { MovieService } from '../../../services/movie.service';
import { StarRatingComponent } from './startrating';

@Component({
  selector: 'app-moviedetailpage',
  templateUrl: './moviedetailpage.page.html',
  styleUrls: ['./moviedetailpage.page.scss'],
  standalone: true,
  imports: [IonList, IonButtons, IonButton, IonIcon, IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, IonCardHeader, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, StarRatingComponent]
})
export class MoviedetailpagePage implements OnInit {
  movie: any;
  selectedRating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit() {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movieService.getMovieDetails(movieId).subscribe((data: any) => {
        this.movie = data;
        // Cargar la puntuación del usuario si está disponible
        this.selectedRating = this.getUserRating(movieId) || 0;
      });
    }
  }

  onRatingChange(rating: number) {
    this.selectedRating = rating;
    this.saveUserRating(this.movie.id, rating);
    console.log('Selected rating:', this.selectedRating);
  }

  getUserRating(movieId: string): number | null {
    // Obtener la puntuación del usuario desde el almacenamiento local
    const ratings = JSON.parse(localStorage.getItem('userRatings') || '{}');
    return ratings[movieId] || null;
  }

  saveUserRating(movieId: string, rating: number) {
    // Guardar la puntuación del usuario en el almacenamiento local
    const ratings = JSON.parse(localStorage.getItem('userRatings') || '{}');
    ratings[movieId] = rating;
    localStorage.setItem('userRatings', JSON.stringify(ratings));
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}