import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, map, of } from 'rxjs';
import { UsuariosService } from 'src/app/services/usuarios_service/usuarios.service';



@Injectable({
  providedIn: 'root'
})
export class IsActiveGuard implements CanActivate {

  constructor(
    private cookie_service: CookieService,
    private usuarios_service: UsuariosService,
    private router: Router
  ){

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const existe_token = this.cookie_service.check('centrali_JWT_access');
    
      if (existe_token) {
        const token_access = this.cookie_service.get('centrali_JWT_access');
  
        return this.usuarios_service.validar_token_usuario_is_active(token_access).pipe(
          map((data: any) => {
            const respuesta = data.Respuesta;
            
            if (respuesta){
          
              return true
            }

            else{

 
              this.router.navigate(['/login']);
              return false

            }

          }),
          catchError(error => {

            this.router.navigate(['/login']);
            return of(false);
          })
        );
      } else {

        this.router.navigate(['/login']);
        return of(false);
      }
    }
  
}
