import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { Seleccion } from '../../../core/entidades/Seleccion';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { SeleccionService } from '../../servicios/seleccion.service';
import { MatDialog } from '@angular/material/dialog';
import { SeleccionEditarComponent } from '../seleccion-editar/seleccion-editar.component';

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
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  public textoBusqueda: string = "";

  public seleccionEscogida: Seleccion | undefined;

  constructor(private seleccionServicio: SeleccionService,
    private servicioDialog: MatDialog
  ) {
    this.listar();
  }

  public escoger(event: any) {
    if (event.type == "click") {
      this.seleccionEscogida = event.row;
    }
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

  buscar() {
    if (this.textoBusqueda) {
      this.ejecutarBusqueda(this.textoBusqueda);
    }
    else {
      this.listar();
    }
  }

  ejecutarBusqueda(texto: string) {
    this.seleccionServicio.buscar(texto).subscribe({
      next: response => {
        this.selecciones = response;
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }

  agregar() {
    const edicionSeleccion = this.servicioDialog.open(SeleccionEditarComponent, {
      width: "500px",
      height: "300px",
      data: {
        encabezado: "Agregando una Selección de Fútbol",
        seleccion: {
          id: 0,
          nombre: "",
          entidad: ""
        }
      },
      disableClose: true,
    });

    edicionSeleccion.afterClosed().subscribe({
      next: datos => {
        if (datos) {
          this.seleccionServicio.agregar(datos.seleccion).subscribe({
            next: response => {
              this.ejecutarBusqueda(datos.seleccion.nombre);
            },
            error: error => {
              window.alert(error.message);
            }
          });
        }
      }
    });
  }

  modificar() {
    if (this.seleccionEscogida) {
      const edicionSeleccion = this.servicioDialog.open(SeleccionEditarComponent, {
        width: "500px",
        height: "300px",
        data: {
          encabezado: `Editando Selección de Fútbol [${this.seleccionEscogida.nombre}]`,
          seleccion: this.seleccionEscogida
        },
        disableClose: true,
      });

      edicionSeleccion.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.seleccionServicio.modificar(datos.seleccion).subscribe({
              next: response => {
                this.ejecutarBusqueda(datos.seleccion.nombre);
              },
              error: error => {
                window.alert(error.message);
              }
            });
          }
        }
      });
    }
    else {
      window.alert("Debe escoger una Selección");
    }
  }
  verificarEliminar() {

  }
  eliminar() {

  }

}
