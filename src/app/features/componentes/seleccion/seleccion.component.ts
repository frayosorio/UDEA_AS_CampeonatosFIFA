import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { Seleccion } from '../../../core/entidades/Seleccion';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { SeleccionService } from '../../servicios/seleccion.service';

@Component({
  selector: 'app-seleccion',
  standalone: true,
  imports: [
    ReferenciasMaterialModule,
    NgxDatatableModule,
    FormsModule,
  ],
  templateUrl: './seleccion.component.html',
  styleUrl: './seleccion.component.css'
})
export class SeleccionComponent {

  public selecciones: Seleccion[] = [];
  public columnas = [
    { name: "Nombre", prop: "nombre" },
    { name: "Entidad", prop: "entidad" },
  ];

  constructor(private seleccionServicio: SeleccionService) {
    this.listar();
  }


  public listar() {
    this.seleccionServicio.listar().subscribe({
      next: response => {
        this.selecciones = [];
        response.forEach((item: any) => {
          this.selecciones.push({
            id: item.id,
            nombre: item.nombre,
            entidad: item.entidad
          }
          );
        });
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }

}
