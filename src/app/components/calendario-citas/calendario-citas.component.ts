import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CitasService } from 'src/app/services/citas.service';
import { TerapeutasService } from 'src/app/services/terapeutas.service';

@Component({
  selector: 'app-calendario-citas',
  templateUrl: './calendario-citas.component.html',
  styleUrls: ['./calendario-citas.component.css']
})
export class CalendarioCitasComponent {

  formulario: FormGroup;
  hasError: boolean
  terapeutasYTerapia: any
  dates: any;
  esPsicologo!: boolean

  constructor(
    private terapuetasService: TerapeutasService,
    private citasService: CitasService

  ) {
    this.formulario = new FormGroup({
      id_terapeuta: new FormControl('', Validators.required),
    })
    this.hasError = false
  }

  async ngOnInit() {
    const request = await this.terapuetasService.getTerapeutasYTerapia()
    this.terapeutasYTerapia = request
  }

  async onTerapeutaChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue) {
      try {
        const params = { id_terapeuta: selectedValue };
        const dates = await this.citasService.getDatesByTerapeuta(params.id_terapeuta);
        this.dates = dates;
        console.log('dates', this.dates)

        // Encuentra el terapeuta seleccionado en el array this.terapeutasYTerapia
        const selectedTerapeuta = this.terapeutasYTerapia.find((terapeuta: any) => terapeuta.id === selectedValue);

        // Verifica si el terapeuta tiene el nombre_terapia "Psicología" y asigna el valor correspondiente a esPsicologo
        this.esPsicologo = selectedTerapeuta && selectedTerapeuta.nombre_terapia === "Psicología";
        console.log(this.esPsicologo)

      } catch (error) {
        console.error('Error al obtener fechas por terapeuta:', error);
      }
    }
  }

}
