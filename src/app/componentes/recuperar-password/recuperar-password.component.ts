import { Component } from '@angular/core';

//Formularios reactivos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CambiarPassword } from 'src/app/interfaces/cambiar_password';
import { UsuariosService } from 'src/app/services/usuarios_service/usuarios.service';

//SweetAlert2
import Swal from 'sweetalert2';


@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent {

  //formulario de login con email y password
  recuperar_password: FormGroup

  constructor(

    private form_builder: FormBuilder,
    private cookie_service: CookieService,
    private usuarios_service: UsuariosService,
    private router: Router


  ){

    this.recuperar_password = this.form_builder.group(

      {

        //se usa "Validators.pattern()" para que el formato del correo sea completo y válido 
        //solo se permiten correos "@gmail.com", "@hotmail.com", "@yahoo.com"
        email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@(gmail|hotmail|yahoo)\\.com$')]],

        //las contraseñas deben ser mínimo 8 carácteres 
        //máximo 20 carácteres
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],


      }

    )

  }

  cargando = false

  pedir_email = true

  //Para ver las contraseñas
  password_input = "password"
  //Input Contraseña
  ver_password(){

    if (this.password_input == "password"){

      this.password_input = "text"

    }

    else{

      this.password_input = "password"

    }

  }


  //Formulario nombre del usuario y elegir cargo
  formulario_correo_password = {

    correo:  {

      error: false,
      mensaje_error: ""

    },

    password: {

      error: false,
      mensaje_error: ""
      

    }


  }

  //Validar nombre del usuario, correo y contraseña y contraseña repetida
  validar_formato_email_password(tocado: boolean){

      //--------------Email---------------------------------------

      //Se ha tocado el input del email pero no se escribió nada
      if ( this.recuperar_password.controls['email'].touched == tocado && this.recuperar_password.controls['email'].value.length == 0){

        this.formulario_correo_password.correo.error = true
        this.formulario_correo_password.correo.mensaje_error = "Escriba su correo"

  
      }
      
      //Email incorrecto
      else if ( this.recuperar_password.controls['email'].touched == tocado && this.recuperar_password.controls['email'].invalid){

        this.formulario_correo_password.correo.error = true
        this.formulario_correo_password.correo.mensaje_error = "Correcto formato incorrecto"


      }

      //cuando es válido el formato del email es correcto
      else if ( this.recuperar_password.controls['email'].valid){
        
        this.formulario_correo_password.correo.error = false
        this.formulario_correo_password.correo.mensaje_error = ""
        
      }

  
      //--------------Fin Email---------------------------------------


      //--------------Nueva contraseña---------------------------------------

      //no se cumple el mínimo de 8 carácteres 
      if ( this.recuperar_password.controls['password'].touched == tocado && this.recuperar_password.controls['password'].value.length < 8){

        this.formulario_correo_password.password.error = true
        this.formulario_correo_password.password.mensaje_error = "Mínimo 8 carácteres para la contraseña"

      }

      //se pasa del máximo de 20 carácteres permitidos
      else if ( this.recuperar_password.controls['password'].touched == tocado && this.recuperar_password.controls['password'].value.length > 20){

        this.formulario_correo_password.password.error = true
        this.formulario_correo_password.password.mensaje_error = "Máximo 20 carácteres para la contraseña"

      }
      
      //contraseña válida
      else if (this.recuperar_password.controls['password'].valid){
        
        this.formulario_correo_password.password.error = false
        this.formulario_correo_password.password.mensaje_error = ""
        
      }

      //--------------Fin Nueva contraseña---------------------------------------

    


  }
  
  enviar_codigo_recuperacion(){
    
    if (this.recuperar_password.controls['email'].invalid) {

      this.validar_formato_email_password(false);

      Swal.fire({
        icon: "error",
        title: "¡Error!",
        html: 'Hay un problema con el email',
      });

    }

    else{

      this.cargando = true

      const email = {
       email: this.recuperar_password.controls['email'].value
      }

      this.usuarios_service.generar_codigo_email_password(email).subscribe(

          (respuesta)=>{

            
            this.router.navigate(['/login'])

            Swal.fire({
              position: "center",
              icon: "success",
              title: "A su correo le hemos enviado código de recuperación de su cuenta.",
            });

          },

          (errores) =>{
            
            this.cargando = false
            
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

  }

  cambiar_password(){


    if (this.recuperar_password.controls['password'].invalid) {

      this.validar_formato_email_password(false);

      Swal.fire({
        icon: "error",
        title: "¡Error!",
        html: 'Hay un problema con la contraseña',
      });

    }

    else{


      const usuario: CambiarPassword = {
        email: String(localStorage.getItem('email_centrali')),
        password: this.recuperar_password.controls['password'].value,
        codigo_recuperar_cuenta: String(localStorage.getItem('centrali_codigo_password'))
      }


      this.usuarios_service.cambiar_password_user_email_password_vista(usuario).subscribe(

        (respuesta)=>{

          this.router.navigate(['/login']);
          localStorage.removeItem('email_centrali');
          localStorage.removeItem('centrali_codigo_password');


          Swal.fire({
            position: "center",
            icon: "success",
            title: "Cambio de contraseña exitoso.",
          });

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
    
    

  }

  ngOnInit(): void {
    
    const codigo_verificacion = localStorage.getItem('centrali_codigo_password')
    
    //Para cambiar contraseña
    if (codigo_verificacion) {

      this.pedir_email = false

    }

  }
    
    



  

  

}
