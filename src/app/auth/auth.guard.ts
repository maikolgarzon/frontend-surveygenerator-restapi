import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Aquí se debe verificar si el usuario tiene un token válido
    const token = sessionStorage.getItem('ssnData');
    if (token) {
      return true;
    } else {
      // Si el usuario no tiene un token válido, redirigirlo a la página de inicio de sesión
      this.router.navigate(['/login']);
      return false;
    }
  }
}
