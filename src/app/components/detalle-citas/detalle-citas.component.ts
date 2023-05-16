import { Component, OnInit, TemplateRef, ViewChild, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import * as moment from 'moment';
import { CitasService } from 'src/app/services/citas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-citas',
  templateUrl: './detalle-citas.component.html',
  styleUrls: ['./detalle-citas.component.css']
})
export class DetalleCitasComponent implements OnInit {

  cita: any
  hasError: boolean;
  @ViewChild('cancelarCitaModal') cancelarCitaModal!: TemplateRef<any>;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private citasService: CitasService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.hasError = false;
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.cita = JSON.parse(params['cita']);
    });
    console.log(this.cita)
  }

  async openCancelarCitaModal() {
    this.modalService.open(this.cancelarCitaModal);
  }

  async confirmarCancelarCita(modal: any) {
    this.isLoading = true; // Inicia el estado de "cargando"
    const response = await this.citasService.deleteCita(this.cita.id);
    console.log(response);

    if (response && response.error) {
      this.hasError = true;
    } else if (response === null || (response && !response.error)) {
      this.hasError = false;
      // Usamos la librería sweetalert2 para ofrecer una animación al usuario de que el borrado de la cita ha sido correcto
      Swal.fire({
        title: 'Cancelar cita',
        text: `Se ha borrado con éxito`,
        icon: 'success',
        confirmButtonText: 'OK!'
      });
      // Dirigimos al usuario a la página de calendario
      this.router.navigate(['/calendarioCitas']);

      // Cierra el modal aquí
      modal.close('Si');

      // Luego llama a sendEmailsDeleteCita
      await this.citasService.sendEmailsDeleteCita(this.cita.id);
    } else {
      this.hasError = true;
    }

    this.isLoading = false; // Finaliza el estado de "cargando"
  }

}
