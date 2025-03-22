import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [FormsModule, IonicModule]
})
export class RegisterPage implements OnInit {
  email: string;
  password: string;
  confirmPassword: string;
  currentToast: HTMLIonToastElement | null = null;
  isSubmitting: boolean = false;

  private apiUrl = 'https://rotten-tomates-git-main-luis-jarabas-projects.vercel.app/api/users'; // URL base del backend en Vercel

  constructor(private navCtrl: NavController, private toastController: ToastController) {
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  ngOnInit() { }

  async register() {
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    if (!this.validateEmail(this.email)) {
      this.showToast('Email Invalido', 'danger');
      this.isSubmitting = false;
      return;
    }

    if (this.password.length < 8) {
      this.showToast('La contraseña debe de tener mas de 8 caracteres', 'danger');
      this.isSubmitting = false;
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showToast('las contraseñas no coinciden', 'danger');
      this.isSubmitting = false;
      return;
    }

    try {
      const response = await axios.post(`${this.apiUrl}/register`, {
        email: this.email,
        password: this.password
      });
      console.log('Registration successful');
      this.showToast('Registration successful', 'success');
      this.navCtrl.navigateForward('/login');
    } catch (error) {
      console.error('Registration error', error);
      this.showToast('Registration error', 'danger');
    } finally {
      this.isSubmitting = false;
    }
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  async showToast(message: string, color: string) {
    if (this.currentToast) {
      await this.currentToast.dismiss();
    }
    this.currentToast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: color
    });
    this.currentToast.present();
    this.currentToast.onDidDismiss().then(() => {
      this.currentToast = null;
    });
  }

  navigateToLogin() {
    this.navCtrl.navigateForward('/login');
  }
}