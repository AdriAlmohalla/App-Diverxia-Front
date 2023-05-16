import { Component } from '@angular/core';
import { TerapeutasService } from 'src/app/services/terapeutas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-terapeutas',
  templateUrl: './listado-terapeutas.component.html',
  styleUrls: ['./listado-terapeutas.component.css']
})
export class ListadoTerapeutasComponent {

  listadoTerapeutas: any

  constructor(private terapeutasService: TerapeutasService) { }

  async ngOnInit() {
    this.listadoTerapeutas = await this.terapeutasService.getTerapeutasYTerapia()
    console.log(this.listadoTerapeutas)
  }

  // Crea la función eliminarTerapeuta
  async eliminarTerapeuta(id: number) {
    // Encuentra el terapeuta en el array listadoTerapeutas usando el id proporcionado
    const terapeuta = this.listadoTerapeutas.find((t: any) => t.id === id);

    const result = await Swal.fire({
      title: '¿Estás seguro? Cancelar citas pendientes antes de eliminar',
      // Agrega el nombre y apellidos del terapeuta al texto
      text: `Estás a punto de eliminar a ${terapeuta.nombre} ${terapeuta.apellidos}, deberias cancelar todas sus citas antes de proceder al borrado, ya que una vez realizado dejarán de estar disponibles para verlas en el calendario.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    });

    if (result.isConfirmed) {
      console.log(id)
      await this.terapeutasService.deleteTerapeuta(id);
      Swal.fire('Eliminado', 'El terapeuta ha sido eliminado', 'success');
      this.listadoTerapeutas = await this.terapeutasService.getTerapeutasYTerapia(); // Actualiza la lista de terapeutas
    }
  }

}
