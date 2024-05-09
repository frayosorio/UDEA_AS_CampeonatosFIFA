import { Component, Inject } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { Seleccion } from '../../../core/entidades/Seleccion';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

export interface DatosEdicionSeleccion {
  encabezado: string;
  seleccion: Seleccion;
}

@Component({
  selector: 'app-seleccion-editar',
  standalone: true,
  imports: [
    ReferenciasMaterialModule,
    FormsModule
  ],
  templateUrl: './seleccion-editar.component.html',
  styleUrl: './seleccion-editar.component.css'
})
export class SeleccionEditarComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public datos: DatosEdicionSeleccion,
    private dialogRef: MatDialogRef<SeleccionEditarComponent>) {

  }

  cerrar() {
    this.dialogRef.close();
  }

}
