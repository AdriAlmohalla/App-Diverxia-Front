import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Router } from '@angular/router';
import { addDays, addMonths, addWeeks, parseISO, addMinutes, format, getWeek, startOfWeek, endOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {

  @Input() citas: any
  viewDate: Date = new Date();
  vistaActual: string = 'month';
  @ViewChild('citasModal') citasModal!: ElementRef;
  citasDelDia: CalendarEvent[] = [];
  fechaSeleccionada: Date = new Date();

  constructor(private router: Router) { }



  // Función para convertir las citas en eventos del calendario
  citasToEvents(citas: any[]): CalendarEvent[] {
    return citas.map((cita) => {
      const fechaInicio = this.horaToDate(new Date(cita.dia), cita.hora_inicio);
      const fechaFinal = this.horaToDate(new Date(cita.dia), cita.hora_final);

      return {
        id: cita.id,
        title: `${cita.nombre} ${cita.apellidos}`,
        start: fechaInicio,
        end: fechaFinal,
      };
    });
  }

  // Función para convertir la hora en un objeto Date
  private horaToDate(fecha: Date, hora: string): Date {
    const [horaInt, minuto] = hora.split(':');
    const fechaUTC = new Date(fecha.toISOString().substring(0, 10));
    fechaUTC.setHours(+horaInt, +minuto);
    return fechaUTC;
  }

  // Función para cambiar la vista del calendario (día, semana, mes)
  cambiarVista(vista: string): void {
    this.vistaActual = vista;
  }

  // Función para cambiar la fecha del calendario hacia adelante o hacia atrás
  cambiarFecha(direccion: number): void {
    switch (this.vistaActual) {
      case 'day':
        this.viewDate = addDays(this.viewDate, direccion);
        break;
      case 'week':
        this.viewDate = addWeeks(this.viewDate, direccion);
        break;
      case 'month':
      default:
        this.viewDate = addMonths(this.viewDate, direccion);
        break;
    }
  }

  // Función para establecer la fecha del calendario en el día de hoy
  irHoy(): void {
    this.viewDate = new Date();
  }

  // Función para obtener el título de la vista del calendario en función de la fecha y la vista actual
  obtenerTitulo(fecha: Date): string {
    switch (this.vistaActual) {
      case 'day':
        return format(fecha, 'EEEE, d MMMM yyyy', { locale: es });
      case 'week':
        const semanaInicio = startOfWeek(fecha, { weekStartsOn: 1 });
        const semanaFin = endOfWeek(fecha, { weekStartsOn: 1 });
        const formato = 'MMM d';
        const fechaInicio = format(semanaInicio, formato, { locale: es });
        const fechaFin = format(semanaFin, formato, { locale: es });
        const anio = fecha.getFullYear();
        return `Semana ${fechaInicio} - ${fechaFin}, ${anio}`;
      case 'month':
      default:
        return format(fecha, 'MMMM yyyy', { locale: es });
    }
  }

  citaClicked(event: CalendarEvent): void {
    const idCita = event.id;
    const citaSeleccionada = this.citas.find((cita: any) => cita.id === idCita);
    this.router.navigate(['calendarioCitas/', idCita], { queryParams: { cita: JSON.stringify(citaSeleccionada) } });
  }


}


