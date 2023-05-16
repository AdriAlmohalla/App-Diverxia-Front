import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TerapeutasService } from 'src/app/services/terapeutas.service';

@Component({
  selector: 'app-get-terapeuta',
  templateUrl: './get-terapeuta.component.html',
  styleUrls: ['./get-terapeuta.component.css']
})
export class GetTerapeutaComponent {

  formulario: FormGroup;
  @Output() enviarObjeto = new EventEmitter<any>();
  hasError: boolean
  terapeutasYTerapia: any

  constructor(
    private formBuilder: FormBuilder,
    private terapeutasService: TerapeutasService
  ) {
    this.formulario = new FormGroup({
      id_terapeuta: new FormControl('', Validators.required),
      dia: new FormControl('', Validators.required),
    })
    this.hasError = false
  }

  async ngOnInit() {
    const request = await this.terapeutasService.getTerapeutasYTerapia()
    this.terapeutasYTerapia = request
    console.log(this.terapeutasYTerapia)
  }

  async onSubmit() {
    this.enviarObjeto.emit(this.formulario.value)
  }

}
