import { Component, OnInit } from '@angular/core';
import { Barco } from '../../model/barco.model';
import { BarcosService } from '../../services/barcos/barcos.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'barco-component-admin',
  templateUrl: './barco.component.admin.html'
})
export class BarcoComponentAdmin implements OnInit{

  selectedBarco: Barco | null = null;
  updateForm: FormGroup;
  isUpdate: boolean = false;





  editBarco(barco: Barco) {
    this.selectedBarco = barco;
    this.displayDialog=true;
    this.updateForm.patchValue({
      
      id: barco.id,
      cuota: barco.cuota,
      numeroAmarre: barco.numeroAmarre,
      numeroMatricula: barco.numeroMatricula,
      socio_id: barco.idSocio !== undefined ? barco.idSocio : null, 
     
    });
    this.isUpdate = true;
    this.displayDialog=false;
  }

 // Método para cerrar sesión y eliminar el token del localStorage
 logout(): void {
  this.authService.logout();
}


/* Metodo para redirigir al panel de socios*/
socios():void{
  this.router.navigate(['/admin']);
}

isAdmin(): boolean {
  return this.authService.isLoggedIn() && this.authService.obtenerRolUsuario() === "admin";
}

isLogged():boolean {
  return this.authService.isLoggedIn();
}

 listBarcos: Barco[] = [];
 displayDialog: boolean = false;
 formBarco: FormGroup;

 constructor(private barcosService: BarcosService, private fb: FormBuilder,private authService:AuthService, private router:Router) { }

 ngOnInit(): void {
   this.loadBarcos();
   this.initFormBarco();
   this.initUpdateForm();
 }

 initFormBarco(): void {
   this.formBarco = this.fb.group({
     id: [null],
     cuota: [null, Validators.required],
     numeroAmarre: [null, Validators.required],
     numeroMatricula: [null, Validators.required],
     idSocio: [null] // Si es una relación, puedes manejarla aquí
   });

   
   
 }




 initUpdateForm(): void {
  this.updateForm = this.fb.group({
    id: [null],
    cuota: [null, Validators.required],
    numeroAmarre: [null, Validators.required],
    numeroMatricula: [null, Validators.required],
    idSocio: [null] // Si es una relación, puedes manejarla aquí
  });
}




 loadBarcos(): void {
   this.barcosService.getBarcos().subscribe(data => {
     this.listBarcos = data;
     
   });
 }

 showDialogToAdd(): void {
   this.displayDialog = true;
   this.formBarco.reset();
 }

 saveBarco(): void {
   const barco: Barco = this.formBarco.value;
   this.barcosService.saveBarco(barco).subscribe(() => {
     // Aquí puedes realizar acciones adicionales después de guardar el barco
     this.loadBarcos();
     this.displayDialog = false;
   }, () => {
     // Aquí manejas errores en caso de que ocurra algún problema al guardar el barco
   });
 }

 deleteBarco(id: number): void {
   this.barcosService.deleteBarco(id).subscribe(() => {
     // Aquí puedes realizar acciones adicionales después de eliminar el barco
     this.loadBarcos();
   }, () => {
     // Aquí manejas errores en caso de que ocurra algún problema al eliminar el barco
   });
 }



 


 updateBarco() {
  if (this.selectedBarco && this.updateForm) { // Verifica que tanto this.selectedBarco como this.updateForm no sean nulos
    // Verifica si el campo socio_id está vacío o null
    if (!this.updateForm.get('socio_id')?.value) {
      // Si está vacío, establece el valor en null
      this.updateForm.get('socio_id')?.setValue(null);
    }



    const barcoId = this.selectedBarco.id;
    this.barcosService.updateBarco(barcoId, this.updateForm.value).subscribe(resp => {
      if (resp) {
        this.loadBarcos();
        this.displayDialog = false;
      }
    });
  }
}

}













