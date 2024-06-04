import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Token } from '../../token.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { JwtPayload, jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup= new FormGroup({});
  error: string;


  constructor(
    private authService: AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      username:new FormControl(''),
      password:new FormControl(''),
     
    });
  }



  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
  
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

  
    this.authService.login(username, password).subscribe(
      (token: string) => {
        // Decodificar el token JWT para obtener su contenido
      const tokenDecoded: JwtPayload = jwtDecode(token);
       
      // Convertir el objeto decodificado a un string JSON antes de almacenarlo en el localStorage
      const tokenString = JSON.stringify(tokenDecoded);
      localStorage.setItem('token', tokenString);
      this.router.navigate(['/admin']);
      },
      (error) => {
        console.error('Error durante el inicio de sesión:', error);
        this.error = 'Usuario o contraseña incorrectos';
      }
    );
  }
  
}
