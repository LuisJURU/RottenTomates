import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<void> {
    return this.http.post<{ token: string, userId: string }>('/api/auth/login', { email, password }).pipe(
      map(response => {
        console.log('Token recibido:', response.token);
        console.log('UserId recibido:', response.userId);
  
        // Almacenar el token y el userId en localStorage
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userId', response.userId);
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    const token = localStorage.getItem('authToken');
    console.log('Verificando token:', token);
  
    if (!token) {
      console.log('No hay token en localStorage.');
      return of(false);
    }
  
    return this.http.get<{ authenticated: boolean }>('/api/auth/check', {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      map(response => {
        console.log('Respuesta de verificación:', response);
        return response.authenticated;
      }),
      catchError((error) => {
        console.error('Error al verificar autenticación:', error);
        return of(false);
      })
    );
  }
  

  logout(): void {
    console.log('Logging out');
    localStorage.removeItem('authToken');
  }
}