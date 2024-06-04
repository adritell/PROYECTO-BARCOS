import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Verificar si el usuario está autenticado
    if (this.authService.isLoggedIn()) {
      // Obtener el rol del usuario
      const userRole = this.authService.obtenerRolUsuario();
      
      // Permitir el acceso a la ruta protegida según el rol del usuario
      switch (userRole) {
        case 'admin':
          // Permitir el acceso a la ruta '/admin' si el usuario tiene el rol de 'admin'
          return true;
        case 'user':
          // Permitir el acceso a la página principal si el usuario tiene el rol de 'user'
          this.router.navigate(['/']); // Redirigir a la página principal
          return true;
        default:
          // En caso de que el rol del usuario no esté definido o no sea 'admin' ni 'user'
          this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
          return false;
      }
    } else {
      // Redirigir a la página de inicio de sesión si el usuario no está autenticado
      this.router.navigate(['/login']);
      return false; // Denegar el acceso a la ruta protegida
    }
  }
}






/*
 canActivate(): boolean {
    // Verificar si el usuario está autenticado
    if (this.authService.isLoggedIn()) {
      // Obtener el rol del usuario
      const userRole = this.authService.getUserRole();
      
      // Permitir el acceso a la ruta protegida según el rol del usuario
      switch (userRole) {
        case 'admin':
          // Permitir el acceso a la ruta '/admin' si el usuario tiene el rol de 'admin'
          return true;
        case 'user':
          // Permitir el acceso a la página principal si el usuario tiene el rol de 'user'
          this.router.navigate(['/']); // Redirigir a la página principal
          return true;
        default:
          // En caso de que el rol del usuario no esté definido o no sea 'admin' ni 'user'
          this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
          return false;
      }
    } else {
      // Redirigir a la página de inicio de sesión si el usuario no está autenticado
      this.router.navigate(['/login']);
      return false; // Denegar el acceso a la ruta protegida
    }
  }
*/


/*import { CanActivateFn } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  return !!token; // Devuelve true si hay un token, de lo contrario, false
};
*/