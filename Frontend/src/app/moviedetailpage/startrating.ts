import { Component, Input, Output, EventEmitter, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { star, starOutline, starHalf } from 'ionicons/icons';
import { addIcons } from 'ionicons';

// Registrar los iconos
addIcons({
  'star': star,
  'star-outline': starOutline,
  'star-half': starHalf
});

@Component({
  selector: 'app-star-rating',
  template: `
    <div class="star-rating" 
         (mousedown)="startDrag($event)" 
         (mousemove)="onDrag($event)" 
         (mouseup)="endDrag()"
         (touchstart)="startDrag($event)" 
         (touchmove)="onDrag($event)" 
         (touchend)="endDrag()">
      <ion-icon *ngFor="let star of [1, 2, 3, 4, 5]; let i = index" 
                [name]="getStarName(i)"
                (click)="onStarClick(i + 1)" [class.readonly]="readonly">
      </ion-icon>
    </div>
  `,
  styleUrls: ['./startrating.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class StarRatingComponent implements AfterViewInit {
  @Input() rating: number = 0;
  @Input() readonly: boolean = false;
  @Output() ratingChange = new EventEmitter<number>();

  private dragging: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderer.listen('window', 'mouseup', () => {
      this.dragging = false;
    });
    this.renderer.listen('window', 'touchend', () => {
      this.dragging = false;
    });
  }

  getStarName(index: number): string {
    const starValue = index + 1;
    if (this.rating >= starValue) {
      return 'star';
    } else if (this.rating >= starValue - 0.5) {
      return 'star-half';
    } else {
      return 'star-outline';
    }
  }

  onStarClick(starValue: number) {
    if (!this.readonly) {
      this.rating = starValue;
      this.ratingChange.emit(this.rating);
    }
  }

  startDrag(event: MouseEvent | TouchEvent) {
    if (!this.readonly) {
      this.dragging = true;
      this.updateRating(event);
    }
  }

  onDrag(event: MouseEvent | TouchEvent) {
    if (this.dragging && !this.readonly) {
      this.updateRating(event);
    }
  }

  endDrag() {
    this.dragging = false;
  }

  updateRating(event: MouseEvent | TouchEvent) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const x = clientX - rect.left;
    const newRating = Math.min(Math.max(Math.round((x / rect.width) * 10) / 2, 0), 5);
    this.rating = newRating;
    this.ratingChange.emit(this.rating);
  }
}