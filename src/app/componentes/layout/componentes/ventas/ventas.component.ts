import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { TablaRegistrosService } from '../tabla-registros/services/tabla-registros.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerVenta } from 'src/app/interfaces/ventas';
import Swal from 'sweetalert2';
import { VentaModalService } from './services/venta-modal.service';
import { VentaService } from 'src/app/services/ventas_service/venta.service';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct  } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {

 

  constructor(

    private tabla_registro_service: TablaRegistrosService,
    private cookie_service: CookieService,
    //private productos_modal_service: ProductosModalService,
    //private productos_service: ProductosService,

    private form_builder: FormBuilder,

    private venta_modal_service: VentaModalService,

    private venta_service: VentaService,



  ){

    //Una venta ha sido creada
    this.venta_modal_service.venta_creada.subscribe(

      ()=>{

        this.cambiar_pagina(1)

      }

    )

    //Estar pendiente del cierre del modal
    this.venta_modal_service.cerrar_modal.subscribe(

      ()=>{
        
        this.cerrar_modal()
        this.cambiar_pagina(this.pagina_actual)

      }

    )
   
    

  }

  ngOnInit(): void {
    
    this.cambiar_pagina(this.pagina_actual)
    

      
  }
  
  switch_rango_fecha = false

  calendar = inject(NgbCalendar);

  //------Una sola fecha DatePicker--------
  una_fecha: NgbDate | null = this.calendar.getToday();
  
  //--------Rango DatePicker--------

	formatter = inject(NgbDateParserFormatter);

	hoveredDate: NgbDate | null = null;
	fecha_inicial: NgbDate | null = this.calendar.getToday();
	fecha_final: NgbDate | null = this.calendar.getNext(this.calendar.getToday(), 'd', 10);

	onDateSelection(date: NgbDate) {
		if (!this.fecha_inicial && !this.fecha_final) {
			this.fecha_inicial = date;
		} else if (this.fecha_inicial && !this.fecha_final && date && date.after(this.fecha_inicial)) {
			this.fecha_final = date;
		} else {
			this.fecha_final = null;
			this.fecha_inicial = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fecha_inicial && !this.fecha_final && this.hoveredDate && date.after(this.fecha_inicial) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.fecha_final && date.after(this.fecha_inicial) && date.before(this.fecha_final);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fecha_inicial) ||
			(this.fecha_final && date.equals(this.fecha_final)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}

  //--------Fin Rango DatePicker--------



  

  registros_datos: VerVenta[] = [] 

  seleccionar_registros = false
  registros_seleccionados: any[] = []

  pagina_actual: number = 1
  total_registros: number = 0

  datos_registro_editar = []

  titulo_modal = ""

  //-----Botón busqueda venta fecha-------

  buscar_venta(){

    //Busqueda de venta de una sola fecha
    if (!this.switch_rango_fecha){

      const fecha = this.una_fecha?.year + '-' + String(this.una_fecha?.month).padStart(2, '0') + '-' + String(this.una_fecha?.day).padStart(2, '0')

      const token_access = this.cookie_service.get('centrali_JWT_access')

      this.venta_service.buscar_venta_por_una_fecha(token_access, fecha).subscribe(

        (data)=>{

          this.registros_datos = (data as any).results.datos

        },

        (errores) =>{

          this.registros_datos = []
        
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
    
    //Busqueda de venta rango de fechas
    else{

      
      const fecha_inicial = this.fecha_inicial?.year + '-' + String(this.fecha_inicial?.month).padStart(2, '0') + '-' + String(this.fecha_inicial?.day).padStart(2, '0')
      const fecha_final = this.fecha_final?.year + '-' + String(this.fecha_final?.month).padStart(2, '0') + '-' + String(this.fecha_final?.day).padStart(2, '0')


      const token_access = this.cookie_service.get('centrali_JWT_access')

      this.venta_service.buscar_venta_por_fechas(token_access, fecha_inicial, fecha_final).subscribe(

        (data)=>{

          this.registros_datos = (data as any).results.datos

        },

        (errores) =>{

          this.registros_datos = []
        
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
    

  }


  //-----Fin Botón busqueda venta fecha-------

  
  //Cambiar de página la tabla
  cambiar_pagina(event: any){

    this.pagina_actual = event

    //Obtenemos la actual página

    const token_access = this.cookie_service.get('centrali_JWT_access')

    const pagina_actual = String(this.pagina_actual)



    this.venta_service.ver_todas_las_ventas(token_access, pagina_actual).subscribe(

      (resultados)=>{

        this.registros_datos = (resultados as any).results.datos
        this.total_registros = (resultados as any).count


      },
      (errores) =>{
  
  
        let errors = errores.error.Errors


        let mensaje_obtenido = ""

        if ( typeof errors == 'string' ){

          mensaje_obtenido = errors 

        }

        else if (errors instanceof Array ){

          mensaje_obtenido = errors.join('<br>');

        }
        
        else{
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

  //En el DropDown para activar o desactivar selección registros
  select_on_off(){

     //Activar selección
     if(!this.seleccionar_registros){

      this.seleccionar_registros = true

      }   
    
    //Desactivar selección
    else{

      this.seleccionar_registros = false

      this.registros_seleccionados = []

    }

  }

  //Acción de seleccionar los registros uno por uno
  elegir_registro(id_obtenido: any){

  
    if (this.seleccionar_registros) {

      const indice = this.registros_seleccionados.indexOf(id_obtenido)
    
      //Agregar a seleccionados
      if (indice == -1){

        this.registros_seleccionados.push(id_obtenido)

      }

      //Quitar de seleccionados
      else{

        this.registros_seleccionados.splice(indice, 1)

      } 

    } 

      

  }

  //Fin Acción de seleccionar los registros uno por uno
  elegir_todos_registro(){

    //Vaciar todo seleccionado
    this.registros_seleccionados = []

    //Obtener el ID de cada registro
    this.registros_datos.forEach(

      (actual)=>{

        this.registros_seleccionados.push(actual.id)

      }

    )
   
    

  }

  abrir_crear_modal(){

    this.titulo_modal = "Crear venta"

    this.venta_modal_service.modal_crear_venta.emit(true)
    

  }

  editar_venta(id: number){

    this.titulo_modal = "Editar venta"

    const token_access = this.cookie_service.get('centrali_JWT_access')

    const id_obtenido = String(id)

    this.venta_service.ver_venta_por_id(token_access, id_obtenido).subscribe(

      (data)=>{

        const venta_obtenida = (data as any).respuesta

        this.venta_modal_service.campos_editar_modal.emit(venta_obtenida)

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

  eliminar_venta(id: number){

    
    Swal.fire({
      title: "¿Quiere eliminar esa venta?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {

        const token_access = this.cookie_service.get('centrali_JWT_access')
        const id_actual = String(id)

       
    
        this.venta_service.eliminar_venta_por_id(token_access, id_actual).subscribe(

          (respuesta)=>{

            Swal.fire({
              position: "center",
              icon: "success",
              title: "Venta eliminada",
              showConfirmButton: false,
              timer: 3000
            });

            //Obtenemos los actuales registros
            this.cambiar_pagina(this.pagina_actual)

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
    });

    

  }

  eliminar_varias_ventas(){

    Swal.fire({
      title: "¿Quieres eliminar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {

        const token_access = this.cookie_service.get('centrali_JWT_access')

        
        this.venta_service.eliminar_varias_ventas_por_id(token_access, this.registros_seleccionados).subscribe(

          (respuesta)=>{

            Swal.fire({
              position: "center",
              icon: "success",
              title: "Se ha realizado la eliminación",
              showConfirmButton: false,
              timer: 3000
            });

            //Obtenemos los actuales registros
            this.cambiar_pagina(this.pagina_actual)

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
    });

    

  }

 

  //botón cerrar modal
  @ViewChild('boton_cerrar_modal') boton_cerrar_modal!: ElementRef;
 

  cerrar_modal(){

    this.boton_cerrar_modal.nativeElement.click()

  }

  

}
