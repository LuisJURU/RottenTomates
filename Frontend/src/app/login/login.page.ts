import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Toast } from '@awesome-cordova-plugins/toast/ngx';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [FormsModule, IonicModule],
  providers: [Toast] // Agrega el servicio Toast aquí
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  isSubmitting: boolean = false;

  private apiUrl = 'https://rotten-tomates-git-main-luis-jarabas-projects.vercel.app/api/auth';

  constructor(
    private navCtrl: NavController,
    private toast: Toast // Inyecta el servicio Toast
  ) {}

  ngOnInit() {}

  async login() {
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    // Validar email
    if (!this.validateEmail(this.email)) {
      this.showNativeToast('❌ Email inválido. Por favor, verifica tu correo.', 'danger');
      this.isSubmitting = false;
      return;
    }

    // Validar contraseña
    if (this.password.length < 8) {
      this.showNativeToast('La contraseña debe tener al menos 8 caracteres.', 'warning');
      this.isSubmitting = false;
      return;
    }

    try {
      // Intentar iniciar sesión
      const response = await axios.post(`${this.apiUrl}/login`, {
        email: this.email,
        password: this.password
      });

      // Almacenar el userId en localStorage
      const { userId } = response.data;
      localStorage.setItem('userId', userId);

      console.log('Inicio de sesión exitoso');
      this.showNativeToast(`✅ ¡Hola ${this.email}! Inicio de sesión exitoso.`, 'success');
      this.navCtrl.navigateForward('/home');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      this.showNativeToast('❌ Error al iniciar sesión. Inténtalo de nuevo.', 'danger');
    } finally {
      this.isSubmitting = false;
    }
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  showNativeToast(message: string, color: string) {
    const emoji = color === 'success' ? '✅' : color === 'danger' ? '❌' : '⚠️';
    const fullMessage = `${emoji} ${message}`;

    this.toast.show(fullMessage, '3000', 'center').subscribe(
      () => console.log('Toast displayed'),
      (error) => console.error('Error mostrando el toast:', error)
    );
  }

  navigateToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}