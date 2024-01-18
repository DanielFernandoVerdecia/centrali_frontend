import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActualizarProducto } from 'src/app/interfaces/actualizar_producto';
import { CrearProducto } from 'src/app/interfaces/crear_producto';
import { VerProducto } from 'src/app/interfaces/ver_productos';
import { VerSoloProducto } from 'src/app/interfaces/ver_solo_producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(
    private http_client: HttpClient
    
  ) { }

  direccion = "http://127.0.0.1:8000/"


  crear_producto(token: string, producto: CrearProducto): Observable<VerProducto>{

    const direccion_api = this.direccion + "api/crear_producto"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.post<VerProducto>(direccion_api, producto  , {headers})

  }


  ver_todos_los_productos(token: string, pagina: string): Observable<VerProducto[]>{

    const direccion_api = this.direccion + "api/ver_productos?page=" + pagina

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.get<VerProducto[]>(direccion_api, {headers})

  }


  ver_producto_por_id(token: string, id: string): Observable<VerSoloProducto>{

    const direccion_api = this.direccion + "api/ver_producto_por_id/" + id + "/"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.get<VerSoloProducto>(direccion_api, {headers})

  }


  actualizar_producto_por_id(token: string, id: string, datos_actualizar: ActualizarProducto): Observable<ActualizarProducto>{

    const direccion_api = this.direccion + "api/actualizar_producto_por_id/" + id + "/"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.put<ActualizarProducto>(direccion_api, datos_actualizar  ,{headers})

  }


  eliminar_producto_por_id(token: string, id: string): Observable<{}>{

    const direccion_api = this.direccion + "api/eliminar_producto_por_id/" + id + "/"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.delete<{}>(direccion_api, {headers})

  }


  eliminar_varios_productos_por_id(token: string, ids: number[]): Observable<any>{

    const direccion_api = this.direccion + "api/eliminar_varios_productos"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.delete(direccion_api, {headers, body: {ids}})

  }


  buscar_productos_por_nombre(token: string, producto: string): Observable<VerProducto[]> {

    const direccion_api = this.direccion + "api/buscar_producto_por_nombre";

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    const params = { producto }; 

    return this.http_client.get<VerProducto[]>(direccion_api, { headers, params });
  }


}
