import { Component, OnInit } from '@angular/core';
import { Socio } from '../../model/socio.model';
import { SociosService } from '../../services/socios/socios.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'socio-component-admin',
  templateUrl: './socio.component_admin.html'
})
export class SocioComponent implements OnInit{

  listSocios:Socio []=[];
  
  isUpdate:boolean=false;
  dialog:boolean=false;
  formCard:FormGroup= new FormGroup({});
  updateForm:FormGroup=new FormGroup({});
  selectedSocio: Socio | null = null;

  constructor(private socioService:SociosService, private authService:AuthService,private router:Router){}

  ngOnInit():void{
    this.list();
    this.formCard=new FormGroup({
      id:new FormControl(''),
      apellidos:new FormControl(''),
      dni:new FormControl(''),
      nombre:new FormControl(''),
    });

    this.updateForm=new FormGroup({
      id:new FormControl(''),
      apellidos:new FormControl(''),
      dni:new FormControl(''),
      nombre:new FormControl(''),
    })

    //this.isAdmin();
    
  }

  /*Metodo para cargar los socios en el array vacío desde el servicio que, a su vez obtiene los socios desde una 
  llamada al backend mediante solicitud*/
  list(){
    this.socioService.getSocio().subscribe(resp =>{
      if(resp){
        this.listSocios= resp;
      }
    });


  }


  isAdmin(): boolean {
    return this.authService.isLoggedIn() && this.authService.obtenerRolUsuario() === "admin";
  }

  isLogged():boolean {
    return this.authService.isLoggedIn();
  }

  


  // Método para cerrar sesión y eliminar el token del localStorage
  logout(): void {
    this.authService.logout();
  }


  /*Metodo para resetear valores de formulario */
  newCard(){
    this.isUpdate=false;
    this.formCard.reset();
  }


  btnAddSocio(){
    this.dialog=true;
  }


  /* Metodo para redirigir al panel de barcos*/
  barcos():void{
    this.router.navigate(['/barcos/admin']);
  }


  /*Metodo para guardar los socios desde el servicio que, a su vez obtiene los socios desde una 
  llamada al backend mediante solicitud*/
  saveSocio() {
    this.socioService.saveSocio(this.formCard.value).subscribe(resp=>{
      if(resp){
        this.list();
        this.formCard.reset();
        
      }
    });
  }



  editSocio(socio: Socio) {
    this.selectedSocio = socio;
    this.updateForm.patchValue({
      id: socio.id,
      nombre: socio.nombre,
      apellidos: socio.apellidos,
      dni: socio.dni
    });
    this.isUpdate = true;
  }

  updateSocio() {
    if (this.selectedSocio) {
      const socioId = this.selectedSocio.id;
      this.socioService.updateSocio(socioId, this.updateForm.value).subscribe(resp => {
        if (resp) {
          this.list();
          this.newCard();
        }
      });
    }
  }

  deleteSocio(socioId: number) {
    this.socioService.deleteSocio(socioId).subscribe(resp => {
      if (resp) {
        this.list();
      }
    });
  }
  

}
