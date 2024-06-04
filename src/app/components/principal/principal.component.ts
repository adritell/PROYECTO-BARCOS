import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";


@Component({
    selector: 'barco-component-admin',
    templateUrl: './principal.component.html'
  })
  export class PrincipalComponent implements OnInit{
   
    constructor (private router: Router, private authService:AuthService){}
    ngOnInit(): void {
        
    }
   
    

    login():void{
        this.router.navigate(['/login']);
    }

    // Método para cerrar sesión y eliminar el token del localStorage
  logout(): void {
    this.authService.logout();
  }
  isLogged():boolean {
    return this.authService.isLoggedIn();
  }

    isUserAndIsLogged():boolean{
        return this.authService.isLoggedIn() && this.authService.obtenerRolUsuario()==="user";
    }

    
  }