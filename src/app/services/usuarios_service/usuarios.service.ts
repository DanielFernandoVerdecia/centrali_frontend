import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActualizarUsuario } from 'src/app/interfaces/actualizar_usuario';
import { LoginUsuario } from 'src/app/interfaces/login_usuario';
import { TodoLosUsuarios } from 'src/app/interfaces/todos_los_usuarios';
import { UsuarioEmailPassword } from 'src/app/interfaces/usuario_email_password';
import { UsuarioFacebookGmail } from 'src/app/interfaces/usuario_facebook_gmail';
import { SoloUsuario } from 'src/app/interfaces/ver_solo_usuarios';

import { AuthConfig, OAuthService } from 'angular-oauth2-oidc'
import { LoginUsuarioEmailPassword } from 'src/app/interfaces/login_email_password';
import { CambiarPassword } from 'src/app/interfaces/cambiar_password';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http_client: HttpClient,
    private oauthService: OAuthService
    
  ) { 
    this.initLogin();
  }

  //Login Gmail
  initLogin() {

    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '228427730877-ph697luaitfrrsdnq4tv78e7cnhq3sv1.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/login',
      scope: 'openid profile email',
    }


    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

  
  }



  autenticar_gmail() {
    
    this.oauthService.initLoginFlow();
  
  }

  
  get_email(){
    return this.oauthService.getIdentityClaims()
  }

  

  //Fin Login Gmail

  direccion = "http://127.0.0.1:8000/"


 
  crear_usuario_facebook_gmail(nuevo_usuario: UsuarioFacebookGmail): Observable<UsuarioFacebookGmail>{

    const direccion_api = this.direccion + "api/crear_usuario_facebook_gmail"

    return this.http_client.post<UsuarioFacebookGmail>(direccion_api, nuevo_usuario);

  }

  crear_usuario_email_password(nuevo_usuario: UsuarioEmailPassword): Observable<UsuarioEmailPassword>{

    const direccion_api = this.direccion + "api/crear_usuario_email_password"

    return this.http_client.post<UsuarioEmailPassword>(direccion_api, nuevo_usuario)

  }

  

  login_usuario_facebook_gmail(usuario: LoginUsuario): Observable<LoginUsuario>{

    const direccion_api = this.direccion + "api/login_usuario_facebook_gmail"

    return this.http_client.post<LoginUsuario>(direccion_api, usuario)

  }


  login_email_password(usuario: LoginUsuarioEmailPassword): Observable<any>{

    const direccion_api = this.direccion + "api/login_email_password_vista"

    return this.http_client.post<any>(direccion_api, usuario)

  }


  validar_token_usuario_is_active(token: string): Observable<boolean>{

    const direccion_api = this.direccion + "api/validar_token_usuario_is_active"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.get<boolean>(direccion_api, {headers})

  }

  validar_token_usuario_is_jefe(token: string): Observable<boolean>{

    const direccion_api = this.direccion + "api/validar_token_user_is_jefe_vista"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.get<boolean>(direccion_api, {headers})

  }

  logout(token: string): Observable<string>{

    const direccion_api = this.direccion + "api/logout_usuario"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.post<string>(direccion_api, {headers})

  }

  ver_todos_los_usuarios(token: string, pagina: string): Observable<TodoLosUsuarios[]>{

    const direccion_api = this.direccion + "api/ver_todos_los_usuarios?page=" + pagina

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.get<TodoLosUsuarios[]>(direccion_api, {headers})

  }

  ver_usuario_por_id(token: string, id: string): Observable<SoloUsuario[]>{

    const direccion_api = this.direccion + "api/ver_usuario/" + id + "/"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.get<SoloUsuario[]>(direccion_api, {headers})

  }

  obtener_id_usuario_by_token(token: string): Observable<number>{

    const direccion_api = this.direccion + "api/usuario_id_by_token_vista"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.get<number>(direccion_api, {headers})

  }

  actualizar_usuario_por_id(token: string, id: string, datos_actualizar: ActualizarUsuario): Observable<ActualizarUsuario>{

    const direccion_api = this.direccion + "api/actualizar_usuario/" + id + "/"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.put<SoloUsuario>(direccion_api, datos_actualizar  ,{headers})

  }

  eliminar_usuario_por_id(token: string, id: string): Observable<{}>{

    const direccion_api = this.direccion + "api/eliminar_usuario/" + id + "/"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.delete<{}>(direccion_api, {headers})

  }

  eliminar_varios_usuarios_por_id(token: string, ids: number[]): Observable<any>{

    const direccion_api = this.direccion + "api/eliminar_varios_usuarios"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.delete(direccion_api, {headers, body: {ids}})

  }

 buscar_usuarios_por_nombre(token: string, nombre: string): Observable<TodoLosUsuarios[]> {

    const direccion_api = this.direccion + "api/buscar_usuario_por_nombre";

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    const params = { nombre }; 

    return this.http_client.get<TodoLosUsuarios[]>(direccion_api, { headers, params });
  }


  generar_codigo_email_password(email: {email:string}): Observable<any>{

    const direccion_api = this.direccion + "api/generar_codigo_recuperacion_password_vista"

    return this.http_client.put<any>(direccion_api, email)

  }

  cambiar_password_user_email_password_vista(datos: CambiarPassword): Observable<any>{

    const direccion_api = this.direccion + "api/cambiar_password_user_email_passwor_vista"

    return this.http_client.put<any>(direccion_api, datos)

  }
  
}
