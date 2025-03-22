import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Toast } from '@awesome-cordova-plugins/toast/ngx';
import axios from 'axios';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [FormsModule, IonicModule],
  providers: [Toast] // Agrega el servicio Toast aquí
})
export class RegisterPage implements OnInit {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isSubmitting: boolean = false;

  private apiUrl = 'https://rotten-tomates-git-main-luis-jarabas-projects.vercel.app/api/users';

  constructor(
    private navCtrl: NavController,
    private toast: Toast // Inyecta el servicio Toast
  ) {}

  ngOnInit() {}

  async register() {
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    if (!this.validateEmail(this.email)) {
      this.showNativeToast('❌ Email inválido. Por favor, verifica tu correo.', 'danger');
      this.isSubmitting = false;
      return;
    }

    if (this.password.length < 8) {
      this.showNativeToast('❌ La contraseña debe tener al menos 8 caracteres.', 'danger');
      this.isSubmitting = false;
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showNativeToast('❌ Las contraseñas no coinciden.', 'danger');
      this.isSubmitting = false;
      return;
    }

    try {
      const response = await axios.post(`${this.apiUrl}/register`, {
        email: this.email,
        password: this.password
      });

      console.log('Registro exitoso');
      this.showNativeToast('✅ Registro exitoso. Por favor, inicia sesión.', 'success');
      this.navCtrl.navigateForward('/login');
    } catch (error) {
      console.error('Error en el registro:', error);
      this.showNativeToast('❌ Error en el registro. Inténtalo de nuevo.', 'danger');
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

  navigateToLogin() {
    this.navCtrl.navigateForward('/login');
  }
}