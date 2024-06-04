import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SociosService } from './services/socios/socios.service';
import { PatronesService } from './services/patrones/patrones.service';
import { SalidasService } from './services/salidas/salidas.service';
import { BarcosService } from './services/barcos/barcos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent  implements OnInit{
  title = 'proyectoSociosBarcos';

  constructor(public fb: FormBuilder, public sociosService:SociosService, public patronesService:PatronesService,
    public salidasService:SalidasService,public barcosService:BarcosService){}

  ngOnInit(): void {
    
  }
}
