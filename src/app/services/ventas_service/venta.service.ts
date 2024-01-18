import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrearVenta } from 'src/app/interfaces/crear_venta';
import { EditarVenta } from 'src/app/interfaces/editar_venta';
import { Mesa } from 'src/app/interfaces/mesa';
import { VerVenta } from 'src/app/interfaces/ventas';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(
    private http_client: HttpClient
    
  ) { }

  direccion = "http://127.0.0.1:8000/"

  ids_productos(token: string): Observable<number[]>{

    const direccion_api = this.direccion + "api/id_productos_vista"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.get<number[]>(direccion_api, {headers})

  }


  ver_todas_las_mesas(token: string, pagina: string): Observable<Mesa[]>{

    const direccion_api = this.direccion + "api/ver_mesas?page=" + pagina

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.get<Mesa[]>(direccion_api, {headers})

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

  crear_venta(token: string, venta: CrearVenta): Observable<VerVenta>{

    const direccion_api = this.direccion + "api/crear_venta";
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.post<VerVenta>(direccion_api, venta  , {headers}) 


  }

  ver_todas_las_ventas(token: string, pagina: string): Observable<VerVenta[]>{

    const direccion_api = this.direccion + "api/ver_ventas?page=" + pagina

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.get<VerVenta[]>(direccion_api, {headers})

  }



  ver_venta_por_id(token: string, id: string): Observable<EditarVenta>{

    const direccion_api = this.direccion + "api/ver_venta_por_id/" + id + "/"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.get<EditarVenta>(direccion_api, {headers})

  }


  actualizar_venta_por_id(token: string, id: string, datos_actualizar: EditarVenta): Observable<EditarVenta>{

    const direccion_api = this.direccion + "api/actualizar_venta_por_id/" + id + "/"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.put<EditarVenta>(direccion_api, datos_actualizar  ,{headers})

  }

  eliminar_venta_por_id(token: string, id: string): Observable<{}>{

    const direccion_api = this.direccion + "api/eliminar_venta_por_id/" + id + "/"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.delete<{}>(direccion_api, {headers})

  }


  eliminar_varias_ventas_por_id(token: string, ids: number[]): Observable<any>{

    const direccion_api = this.direccion + "api/eliminar_varias_ventas"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.delete(direccion_api, {headers, body: {ids}})

  }

  buscar_venta_por_una_fecha(token: string, fecha: string): Observable<VerVenta[]>{

    const direccion_api = this.direccion + "api/buscar_venta_una_fecha"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    const params = { fecha }; 
    
    return this.http_client.get<VerVenta[]>(direccion_api, {headers, params})

  }


  buscar_venta_por_fechas(token: string, fecha_inicial: string, fecha_final: string): Observable<VerVenta[]>{

    const direccion_api = this.direccion + "api/buscar_venta_rango_fechas/" + fecha_inicial + "/" + fecha_final + "/"

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http_client.get<VerVenta[]>(direccion_api, {headers})

  }


  

  
}
