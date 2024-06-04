import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private router: Router) { }


  login(username: string, password: string): Observable<string> {
    // Realiza la llamada al servidor para obtener los datos de usuario
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        // Filtra el array de usuarios para encontrar el usuario con el nombre de usuario proporcionado
        const user = users.find(u => u.username === username);
        // Si se encuentra el usuario, devuelve su token
        if (user && user.token) {
          return user.token;
        } else {
          throw new Error('Usuario no encontrado o token no proporcionado');
        }
      }),
      tap(token => {
      }),
      catchError(error => {
        console.error('Error en la llamada al servidor:', error);
        throw error; // Reenvía el error para que sea manejado por el suscriptor
      })
    );
  }
  
  

  // Método para verificar si existe un token en el localStorage
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

    // Método para cerrar sesión y eliminar el token del localStorage
    logout(): void {
        localStorage.removeItem('token');
        this.router.navigate(['']);
      }


    // Método para obtener el rol del usuario desde el token
     obtenerRolUsuario(): string | null {
      // Recuperar el token decodificado del localStorage
      const tokenDecodedString = localStorage.getItem('token');
    
      // Verificar si el token decodificado existe
      if (tokenDecodedString) {
        // Convertir el token decodificado de nuevo a objeto JSON
        const tokenDecoded = JSON.parse(tokenDecodedString);
    
        // Verificar si el token decodificado contiene la propiedad 'role_usuario'
        if (tokenDecoded && tokenDecoded.rol_usuario) {
          // Devolver el rol del usuario como string
          return tokenDecoded.rol_usuario;
        } else {
          console.error('El token decodificado no contiene la propiedad "role_usuario"');
          return null;
        }
      } else {
        console.error('No se encontró ningún token decodificado en el localStorage');
        return null;
      }
    }
 
  
}