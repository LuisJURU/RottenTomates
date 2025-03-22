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
  username: string = ''; // Nueva propiedad para el nombre de usuario
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isSubmitting: boolean = false;

  private apiUrl = 'https://rotten-tomates-git-main-luis-jarabas-projects.vercel.app/api/users'; // URL base del backend en Vercel

  constructor(private navCtrl: NavController, private toastController: ToastController) {}

  ngOnInit() {}

  async register() {
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    // Validar nombre de usuario
    if (!this.username || this.username.trim().length < 3) {
      this.showToast('❌ El nombre de usuario debe tener al menos 3 caracteres.', 'danger');
      this.isSubmitting = false;
      return;
    }

    // Validar email
    if (!this.validateEmail(this.email)) {
      this.showToast('❌ Email inválido. Por favor, verifica tu correo.', 'danger');
      this.isSubmitting = false;
      return;
    }

    // Validar longitud de la contraseña
    if (this.password.length < 8) {
      this.showToast('⚠️ La contraseña debe tener al menos 8 caracteres.', 'warning');
      this.isSubmitting = false;
      return;
    }

    // Validar que las contraseñas coincidan
    if (this.password !== this.confirmPassword) {
      this.showToast('❌ Las contraseñas no coinciden. Por favor, verifica.', 'danger');
      this.isSubmitting = false;
      return;
    }

    try {
      // Intentar registrar al usuario
      const response = await axios.post(`${this.apiUrl}/register`, {
        username: this.username, // Enviar el nombre de usuario al backend
        email: this.email,
        password: this.password
      });
      console.log('Registration successful');
      this.showToast(`✅ Registro exitoso. Bienvenido, ${this.username}!`, 'success');
      this.navCtrl.navigateForward('/login');
    } catch (error) {
      console.error('Registration error', error);
      this.showToast('❌ Error al registrar. Inténtalo de nuevo.', 'danger');
    } finally {
      this.isSubmitting = false;
    }
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Duración en milisegundos
      position: 'top', // Posición del toast
      color: color // Colores predefinidos: 'success', 'danger', 'warning', etc.
    });
    await toast.present();
  }

  navigateToLogin() {
    this.navCtrl.navigateForward('/login');
  }
}