import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate(): boolean {
    /*   // Obtener el token del localStorage 
      const token = localStorage.getItem('token_diverxia'); if (token) {
        // Decodificar el token para obtener la información del usuario
        const decodedToken = jwt_decode(token);
        //  console.log(decodedToken)
        // Comprobar si el usuario tiene el rol adecuado para acceder a la ruta protegida 
        if (decodedToken && decodedToken === 'admin') { return true; }
      }
      // Si el usuario no tiene el rol adecuado, redirigir a la página de inicio de sesión 
      this.router.navigate(['/login']);
      return false; */

    let role: string | null = localStorage.getItem('rol_usuario');
    if (role === 'admin') {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }





} 
