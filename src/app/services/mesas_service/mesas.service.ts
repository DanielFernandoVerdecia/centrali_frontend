import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrearEditarMesa } from 'src/app/interfaces/crear_editar_mesa';
import { Mesa } from 'src/app/interfaces/mesa';

@Injectable({
  providedIn: 'root'
})
export class MesasService {

  constructor(
    private http_client: HttpClient
    
  ) { }

  direccion = "http://127.0.0.1:8000/"


  crear_mesa(token: string, mesa: CrearEditarMesa): Observable<CrearEditarMesa>{

    const direccion_api = this.direccion + "api/crear_mesa"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.post<CrearEditarMesa>(direccion_api, mesa  , {headers})

  }


  ver_todas_las_mesas(token: string, pagina: string): Observable<Mesa[]>{

    const direccion_api = this.direccion + "api/ver_mesas?page=" + pagina

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.get<Mesa[]>(direccion_api, {headers})

  }

  ver_mesa_por_id(token: string, id: string): Observable<Mesa>{

    const direccion_api = this.direccion + "api/ver_mesa_por_id/" + id + "/"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.get<Mesa>(direccion_api, {headers})

  }

  actualizar_mesa_por_id(token: string, id: string, datos_actualizar: CrearEditarMesa): Observable<CrearEditarMesa>{

    const direccion_api = this.direccion + "api/editar_mesa/" + id + "/"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.put<CrearEditarMesa>(direccion_api, datos_actualizar  ,{headers})

  }

  eliminar_mesa_por_id(token: string, id: string): Observable<{}>{

    const direccion_api = this.direccion + "api/eliminar_mesa_por_id/" + id + "/"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.delete<{}>(direccion_api, {headers})

  }


  eliminar_varias_mesas(token: string, ids: number[]): Observable<any>{

    const direccion_api = this.direccion + "api/eliminar_varias_mesas"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.delete(direccion_api, {headers, body: {ids}})

  }

  buscar_mesa_por_nombre(token: string, mesa: string): Observable<Mesa[]> {

    const direccion_api = this.direccion + "api/buscar_mesa";

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    const params = { mesa }; 

    return this.http_client.get<[]>(direccion_api, { headers, params });

  }

}
