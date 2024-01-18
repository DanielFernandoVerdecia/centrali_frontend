import { Component } from '@angular/core';
import { VentaModalService } from '../services/venta-modal.service';
import { ProductosService } from 'src/app/services/productos_service/productos.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerSoloProducto } from 'src/app/interfaces/ver_solo_producto';
import { ElegirProducto } from 'src/app/interfaces/elegir_producto';
import { Mesa } from 'src/app/interfaces/mesa';
import { VentaService } from 'src/app/services/ventas_service/venta.service';
import { CrearVenta } from 'src/app/interfaces/crear_venta';
import Swal from 'sweetalert2';
import { EditarVenta } from 'src/app/interfaces/editar_venta';

@Component({
  selector: 'app-venta-modal',
  templateUrl: './venta-modal.component.html',
  styleUrls: ['./venta-modal.component.css']
})
export class VentaModalComponent {

  editar_modal = false
 

  venta_finalizada = false

  

  constructor(

    private venta_modal_service: VentaModalService,
    private productos_service: ProductosService,
    private cookie_service: CookieService,
    private form_builder: FormBuilder,
    private venta_service: VentaService
    

  ){

    //Limpiar el contenido anterior al abrir el modal para crear nueva venta
    this.venta_modal_service.modal_crear_venta.subscribe(

      ()=>{

      
        //Mostramos el botón de crear producto
        this.editar_modal = false
        this.productos_encontrados = []
        this.productos_elegidos = []

        this.mesas_encontradas = []
        this.mesa_elegida = []
        


      }

    ),
    
    //Obtener datos para actualizar
    this.venta_modal_service.campos_editar_modal.subscribe(

      (respuesta)=>{

        //Obtener ids de productos
        const token_access = this.cookie_service.get('centrali_JWT_access')
      
        this.venta_service.ids_productos(token_access).subscribe(
    
          (data)=>{
    
            
            this.ids_productos_existentes = (data as any).respuesta
                
          },
    
          (error)=>{
    
            console.log(error)
    
          }
    
        )

        

        //Aparece el botón editar venta en lugar de crear venta
        this.editar_modal = true

        const datos = (respuesta as any)

        this.id_venta = datos.id

        this.productos_elegidos = datos.productos

        this.mesa_elegida = []
        this.mesa_elegida.push(datos.mesa)
        this.venta_finalizada = datos.venta_finalizada

        


      }

    )



  }

  ids_productos_existentes: number[] = []

  id_venta = 0

  productos_encontrados: VerSoloProducto[]  = []
  total_productos = 0
   
  pagina_actual_producto: number = 1

  productos_elegidos: ElegirProducto[] = []
  
  nombre_producto = ""


  buscar_productos(){


    const token_access = this.cookie_service.get('centrali_JWT_access')
    const nombre_producto  = this.nombre_producto

    this.productos_service.buscar_productos_por_nombre(token_access, nombre_producto).subscribe(

      (respuesta)=>{

        this.productos_encontrados = (respuesta as any).results.datos
        this.total_productos = (respuesta as any).count

    

      },

      (errores) =>{

        this.productos_encontrados = []
      
        let errors = errores.error.Errors



        let mensaje_obtenido = ""

        if (errors) {


          mensaje_obtenido = errors

        }

        else {

          mensaje_obtenido = "Ha ocurrido un error!"

        }
        
    

        Swal.fire({
          icon: "error",
          title: "¡Error!",
          html: mensaje_obtenido,
        });
  
      }

    )


    
  }

  //Cambiar de página la tabla productos
  cambiar_pagina_producto(event: any){

    this.pagina_actual_producto = event

    //Obtenemos la actual página

    const token_access = this.cookie_service.get('centrali_JWT_access')

    const pagina_actual_producto = String(this.pagina_actual_producto)

    
    this.productos_service.ver_todos_los_productos(token_access, pagina_actual_producto).subscribe(

      (resultados)=>{

        this.productos_encontrados = (resultados as any).results.datos
        this.total_productos = (resultados as any).count

      }

    )
    

  }

  ocultar_sugerencia_productos(){

    this.productos_encontrados = []

  }

  
  elegir_producto(registro: any){

    const id = registro.id
    const producto = registro.producto
    const precio = registro.precio
    const cantidad = 1

    const producto_elegido: ElegirProducto = {

      id: id,
      producto: producto,
      precio: precio,
      cantidad:cantidad,
      editado: false

    }

    //Se descontarán los productos elegidos para actualizar
    if (this.editar_modal) {

      producto_elegido.editado = true

    }

    //Si el producto ya fue elegido entonces se aumenta su cantidad
    let ya_elegido = false

    this.productos_elegidos.find(
      (producto)=>{

        if (producto.id == id){

          producto.cantidad += cantidad
          ya_elegido = true

        }

      }
    )


    if (!ya_elegido){

      this.productos_elegidos.push(producto_elegido)

    }

    

  }

  escribir_cantidad(event: any, id: number){

    const cantidad = Number(event.target.value)
    
    this.productos_elegidos.filter( (producto)=>{

      if (producto.id == id){

        producto.cantidad = cantidad
        
        //Se descontarán los productos elegidos para actualizar
        if (this.editar_modal) {

          producto.editado = true

        }

      }

    } )
    
  }

  eliminar_producto(id: number){

    this.productos_elegidos.splice(id, 1)

  }
  
  
  mesas_encontradas: Mesa[]  = []
  total_mesas = 0
   
  pagina_actual_mesa: number = 1

  mesa_elegida: Mesa[] = []

  nombre_mesa = ""

  buscar_mesa(){

    const token_access = this.cookie_service.get('centrali_JWT_access')
    
    this.venta_service.buscar_mesa_por_nombre(token_access, this.nombre_mesa).subscribe(

      (respuesta)=>{

        this.mesas_encontradas = (respuesta as any).results.datos
        this.total_mesas = (respuesta as any).count

    

      },

      (error) => {

        let errors = error.error.Errors;
        let mensaje_obtenido = "";
      
        if (errors) {
          if (errors instanceof Object) {
            mensaje_obtenido = Object.values(errors).join('<br>');
          } else {
            mensaje_obtenido = errors;
          }
        } else if (!errors) {
          let errorObject = error.error;
          if (errorObject instanceof Object) {
            mensaje_obtenido = Object.values(errorObject).join('<br>');
          } else {
            mensaje_obtenido = errorObject;
          }
        } else {
          mensaje_obtenido = "Ha ocurrido un error!";
        }
      
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          html: mensaje_obtenido,
        });
      }

    )
    
    

  }

  cambiar_pagina_mesa(event: any){

    this.pagina_actual_mesa = event

    //Obtenemos la actual página

    const token_access = this.cookie_service.get('centrali_JWT_access')

    const pagina_actual_mesa = String(this.pagina_actual_mesa)

    
    this.venta_service.ver_todas_las_mesas(token_access, pagina_actual_mesa).subscribe(

      (resultados)=>{

        this.mesas_encontradas = (resultados as any).results.datos
        this.total_mesas = (resultados as any).count

      }

    )
    

  }

  ocultar_sugerencia_mesas(){

    this.mesas_encontradas = []

  }

  elegir_mesa(registro: any){

    //Se elige una única mesa
    
    this.mesa_elegida.pop()

    const id = registro.id
    const nombre = registro.nombre

    const mesa_elegida = {
      id: id,
      nombre: nombre
    }

    this.mesa_elegida.push(mesa_elegida)

  }

  eliminar_mesa(){

    this.mesa_elegida.pop()

  }

  es_valida = true

  validar_venta(){

    this.es_valida = true

    let mensaje_obtenido = ""

    if (this.mesa_elegida[0] == null){

      mensaje_obtenido = "No se ha elegido ninguna mesa"

    }

    if (mensaje_obtenido.length > 0) {

      this.es_valida = false

      Swal.fire({
        icon: "error",
        title: "¡Error!",
        html: mensaje_obtenido,
      });

    }
  
   

  }

  crear_venta(){

    this.validar_venta();

    if (this.es_valida) {

      const nueva_venta: CrearVenta = {
        productos: this.productos_elegidos,
        mesa: this.mesa_elegida[0].id,
        venta_finalizada: this.venta_finalizada
      }
  
  
      const token_access = this.cookie_service.get('centrali_JWT_access')
      
      this.venta_service.crear_venta(token_access, nueva_venta).subscribe(
  
        (respuesta)=>{
  
          this.venta_modal_service.venta_creada.emit(true)
  
          this.nombre_producto = ""
          this.nombre_mesa = ""
  
          this.productos_elegidos = []
          this.productos_encontrados = []
  
          this.mesa_elegida = []
          this.mesas_encontradas = []
          this.venta_finalizada = false
          
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Venta creada con éxito",
            showConfirmButton: false,
            timer: 3000
          });
          
  
        },
  
        (error) => {

          let errors = error.error.Errors;
          let mensaje_obtenido = "";
        
          if (errors) {
            if (errors instanceof Object) {
              mensaje_obtenido = Object.values(errors).join('<br>');
            } else {
              mensaje_obtenido = errors;
            }
          } else if (!errors) {
            let errorObject = error.error;
            if (errorObject instanceof Object) {
              mensaje_obtenido = Object.values(errorObject).join('<br>');
            } else {
              mensaje_obtenido = errorObject;
            }
          } else {
            mensaje_obtenido = "Ha ocurrido un error!";
          }
        
          Swal.fire({
            icon: "error",
            title: "¡Error!",
            html: mensaje_obtenido,
          });
        }
  
      )

    }

    



  }

  actualizar_venta(){


    this.validar_venta();

    if (this.es_valida) {

      const venta_actualizada: EditarVenta = {
        productos: this.productos_elegidos,
        mesa: this.mesa_elegida[0].id,
        venta_finalizada: this.venta_finalizada
      }

      const token_access = this.cookie_service.get('centrali_JWT_access')
  
      const id_obtenido = String(this.id_venta)
  
      this.venta_service.actualizar_venta_por_id(token_access, id_obtenido, venta_actualizada).subscribe(
        
        (respuesta)=>{
  
          this.venta_modal_service.cerrar_modal.emit(true)
  
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Venta actualizada con éxito",
            showConfirmButton: false,
            timer: 3000
          });
  
        },
  
        (error) => {

          let errors = error.error.Errors;
          let mensaje_obtenido = "";
        
          if (errors) {
            if (errors instanceof Object) {
              mensaje_obtenido = Object.values(errors).join('<br>');
            } else {
              mensaje_obtenido = errors;
            }
          } else if (!errors) {
            let errorObject = error.error;
            if (errorObject instanceof Object) {
              mensaje_obtenido = Object.values(errorObject).join('<br>');
            } else {
              mensaje_obtenido = errorObject;
            }
          } else {
            mensaje_obtenido = "Ha ocurrido un error!";
          }
        
          Swal.fire({
            icon: "error",
            title: "¡Error!",
            html: mensaje_obtenido,
          });
        }
        
      )

    }

    

  }

  

}
