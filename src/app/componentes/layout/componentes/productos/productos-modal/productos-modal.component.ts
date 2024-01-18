import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ProductosService } from 'src/app/services/productos_service/productos.service';
import Swal from 'sweetalert2';
import { ProductosModalService } from './services/productos-modal.service';
import { ActualizarProducto } from 'src/app/interfaces/actualizar_producto';
import { dineroInputValidador } from '../form_group_validacion/dinero_input';
import { numeroEnteroInput } from '../form_group_validacion/numero_entero_input';


@Component({
  selector: 'app-productos-modal',
  templateUrl: './productos-modal.component.html',
  styleUrls: ['./productos-modal.component.css']
})
export class ProductosModalComponent {

  formulario_modal: FormGroup

  editar_modal: boolean = false

  id_producto = ""

  formulario_valido: boolean = false

  constructor(

    private form_builder: FormBuilder,
    private productos_service: ProductosService,
    private cookie_service: CookieService,
    private productos_modal_service: ProductosModalService

  ){

    //Formulario modal  
    this.formulario_modal = this.form_builder.group(

      {

       
        producto: ['', [Validators.required]],
        precio_producto: [0, [Validators.required, Validators.pattern(/^\d*\.?\d+$/), dineroInputValidador()]],
        cantidad_disponible: [0, [Validators.required, Validators.pattern(/^\d+$/), numeroEnteroInput()]]

       
      }

    )

    //Limpiar el contenido anterior al abrir el modal para crear nuevo producto
    this.productos_modal_service.modal_crear_producto.subscribe(

      ()=>{

        

        //Dejamos vacíos los valores del formularios
        this.formulario_modal.patchValue({

          producto: '',
          precio_producto: '',
          cantidad_disponible: ''
          
        })

        this.formulario_modal.controls['producto'].markAsUntouched()
        this.formulario_modal.controls['precio_producto'].markAsUntouched()
        this.formulario_modal.controls['cantidad_disponible'].markAsUntouched()

        //Mostramos el botón de crear producto
        this.editar_modal = false


      }

    ) 

    //Obtener valores para editar productos
    this.productos_modal_service.campos_editar_modal.subscribe(

      (respuesta)=>{

        //Obtener el id del producto
        this.id_producto = String(respuesta.id)

        //Actulizamos los valores del formulario
        this.formulario_modal.patchValue({

          producto: respuesta.producto,
          precio_producto: respuesta.precio,
          cantidad_disponible: respuesta.cantidad_disponible
          
        })

        //Mostramos el botón de actualizar producto
        this.editar_modal = true

      }

    )

  }


  validar_formulario(){


    let recolector_errores = ""

    if (this.formulario_modal.controls['producto'].invalid) {

      recolector_errores += "Escriba un producto correcto. <br>" 

      this.formulario_modal.controls['producto'].markAsTouched()

    }

    if (this.formulario_modal.controls['precio_producto'].invalid){

      recolector_errores += "Debe ingresar un precio para el producto que sea válido. <br>" 

      this.formulario_modal.controls['precio_producto'].markAsTouched()

    }

    if (this.formulario_modal.controls['cantidad_disponible'].invalid){

      recolector_errores += "Ingrese una cantidad del producto válida. <br>" 

      this.formulario_modal.controls['cantidad_disponible'].markAsTouched()

    }

    if (recolector_errores.length > 0) {

      this.formulario_valido = false

      Swal.fire({
        icon: 'error',
        title: 'Formato incorrecto',
        html: recolector_errores,
        
      })

    }

    else{

      this.formulario_valido = true

    }



  }

  crear_producto(){

    this.validar_formulario()

    if (this.formulario_valido){

      const producto = this.formulario_modal.controls['producto'].value 
      const precio_producto = this.formulario_modal.controls['precio_producto'].value
      const cantidad_disponible = this.formulario_modal.controls['cantidad_disponible'].value

      const toke_access = this.cookie_service.get('centrali_JWT_access')

      const nuevo_producto = {
        producto: producto,
        precio: precio_producto,
        cantidad_disponible: cantidad_disponible
      }

      console.log(nuevo_producto)


      
      this.productos_service.crear_producto(toke_access, nuevo_producto).subscribe(

        (respuesta)=>{

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Producto creado con éxito",
            showConfirmButton: false,
            timer: 3000
          });

          //Cerrar el modal
          this.productos_modal_service.cerrar_modal.emit(true);
          

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

 
  actualizar_producto(){

    this.validar_formulario()

    if (this.formulario_valido){

      const producto_actualizado: ActualizarProducto = {

        producto: this.formulario_modal.controls['producto'].value,
        precio: this.formulario_modal.controls['precio_producto'].value,
        cantidad_disponible: this.formulario_modal.controls['cantidad_disponible'].value
  
      }
  
      const toke_access = this.cookie_service.get('centrali_JWT_access')
  
      this.productos_service.actualizar_producto_por_id(toke_access, this.id_producto, producto_actualizado).subscribe(
  
        (respuesta)=>{
  
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Producto actualizado",
            showConfirmButton: false,
            timer: 3000
          });
  
          //Cerrar el modal
          this.productos_modal_service.cerrar_modal.emit(true)
  
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
