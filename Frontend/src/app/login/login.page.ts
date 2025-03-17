import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [FormsModule, IonicModule]
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  currentToast: HTMLIonToastElement | null = null;
  isSubmitting: boolean = false;

  constructor(private navCtrl: NavController, private toastController: ToastController) {
    this.email = '';
    this.password = '';
  }

  ngOnInit() { }

  async login() {
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
      this.showToast('La contraseña es incorrecta', 'danger');
      this.isSubmitting = false;
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: this.email,
        password: this.password
      });
      console.log('Login successful', response.data);
      this.showToast('Inicio de Session Completada', 'success');
      this.navCtrl.navigateForward('/home');
    } catch (error) {
      console.error('Login error', error);
      this.showToast('Login error', 'danger');
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

  navigateToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}