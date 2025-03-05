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
    return this.http.post<{ token: string }>('/api/auth/login', { email, password }).pipe(
      map(response => {
        console.log('Token received:', response.token);
        localStorage.setItem('authToken', response.token);
        console.log('Token saved in localStorage:', localStorage.getItem('authToken'));
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