import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-calendario-citas-general',
  templateUrl: './calendario-citas-general.component.html',
  styleUrls: ['./calendario-citas-general.component.css']
})
export class CalendarioCitasGeneralComponent {

  constructor(public usersService: UsersService) { }

}
