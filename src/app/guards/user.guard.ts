import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private router: Router){}
  canActivate(): boolean {

    let rol: string | null = localStorage.getItem('rol_usuario');
    if(rol === 'usuario'){
      return true;
    }
    this.router.navigate(['/pedirCita']);
    return false;
  }
  
}
