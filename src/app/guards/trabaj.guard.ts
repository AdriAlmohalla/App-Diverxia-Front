import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrabajGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(): boolean{

    let rol: string | null = localStorage.getItem('rol_usuario');
    if(rol === "trabaj"){

      return true;
    }
    this.router.navigate(['/pedirCita']);
    return false;
  }
  
}
