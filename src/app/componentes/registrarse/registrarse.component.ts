import { Component } from '@angular/core';

//Formularios reactivos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//SweetAlert2
import Swal from 'sweetalert2';

//Login Facebook
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider} from "@abacritt/angularx-social-login";


import {HttpClient} from '@angular/common/http'
import { UsuariosService } from 'src/app/services/usuarios_service/usuarios.service';
import { UsuarioFacebookGmail } from 'src/app/interfaces/usuario_facebook_gmail';
import { UsuarioEmailPassword } from 'src/app/interfaces/usuario_email_password';
import { ConnectableObservable } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent {


  //formulario de login con email y password
  login_email_password: FormGroup

    constructor(

      private form_builder: FormBuilder,
      private auth_service: SocialAuthService,
      private usuarios_service: UsuariosService,
      private router: Router

    ){

      this.login_email_password = this.form_builder.group(

        {

          //El nombre del usuario
          nombre_usuario: ['', [Validators.required, Validators.minLength(5)]],
          
          //se usa "Validators.pattern()" para que el formato del correo sea completo y válido 
          //solo se permiten correos "@gmail.com", "@hotmail.com", "@yahoo.com"
          email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@(gmail|hotmail|yahoo)\\.com$')]],

          //las contraseñas deben ser mínimo 8 carácteres 
          //máximo 20 carácteres
          password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],

          repita_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],



        }

      )

    }

  formulario_correo_password = {

    correo: {

      error: false,
      mensaje_error: ""

    },

    password: {

      error: false,
      mensaje_error: ""

    }

    ,

    repita_password: {

      error: false,
      mensaje_error: ""

    },

    ambas_passwords:{

      error: false,
      mensaje_error: ""

    }



  }

  
 
 
  //Animación del principion de escribiendo
  ver_animacion_escribiendo = true
  animacion_salida_escribiendo = false
  
  //Mostramos la animación de escribiendo por 6 segundos
  ngAfterViewInit(): void {

    setTimeout(() => {


      this.animacion_salida_escribiendo = true
     
      setTimeout(() => {


        this.ver_animacion_escribiendo = false
      
      }, 500);

    
    }, 4000);
    
    
    
  }

  //Formulario nombre del usuario y elegir cargo
  formulario_nombre_cargo = {

    nombre_usuario:  {

      error: false,
      mensaje_error: ""


    },

    cargo_usuario: {

      nombre_cargo: "",
      error: false,
      mensaje_error: ""
      

    }


  }

  //Elegir el cargo del usuario
  elegir_cargo( cargo_elegido: any ){

    this.formulario_nombre_cargo.cargo_usuario.nombre_cargo = cargo_elegido.target.value
    
    //En caso de volver a dejar vacío el campo del cargo
    if ( this.formulario_nombre_cargo.cargo_usuario.nombre_cargo == ""){

      
      this.formulario_nombre_cargo.cargo_usuario.error = true
      this.formulario_nombre_cargo.cargo_usuario.mensaje_error = "Elija un cargo para su usuario"

        
    }

    else{

      this.formulario_nombre_cargo.cargo_usuario.error = false
      this.formulario_nombre_cargo.cargo_usuario.mensaje_error = ""

    }
    
  }


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

  
  //Validar nombre del usuario, correo y contraseña y contraseña repetida
  validar_formato_email_password(tocado: boolean, datos_extra: boolean){

    //--------------Nombre del usuario---------------------------------------

    //Se ha tocado el input del nombre del usuario pero no se escribió nada
    if ( this.login_email_password.controls['nombre_usuario'].touched == tocado && this.login_email_password.controls['nombre_usuario'].value.length == 0){

      this.formulario_nombre_cargo.nombre_usuario.error = true
      this.formulario_nombre_cargo.nombre_usuario.mensaje_error = "Ingrese el nombre completo del usuario"


    }
    
    //Se escribe un nombre menor de 5 carácteres
    else if ( this.login_email_password.controls['nombre_usuario'].touched == tocado && this.login_email_password.controls['nombre_usuario'].invalid){

      this.formulario_nombre_cargo.nombre_usuario.error = true
      this.formulario_nombre_cargo.nombre_usuario.mensaje_error = "Nombre del usuario debe tener mínimo 5 letras"


    }

    //cuando es válido el formato del nombre del usuario
    else if (this.login_email_password.controls['nombre_usuario'].valid){
      
      this.formulario_nombre_cargo.nombre_usuario.error = false
      this.formulario_nombre_cargo.nombre_usuario.mensaje_error = ""
      
    }

    //--------------Fin Nombre del usuario---------------------------------------


    //--------------Cargo del usuario, cuando no se ha elejido y se presiona el botón de registrarse---------------------------------------

    if (!tocado) {


      if ( this.formulario_nombre_cargo.cargo_usuario.nombre_cargo == ""){

        this.formulario_nombre_cargo.cargo_usuario.error = true

        this.formulario_nombre_cargo.cargo_usuario.mensaje_error = "Elija un cargo para su usuario"

      }


    
    }


    //--------------Fin Cargo del usuario, cuando no se ha elejido y se presiona el botón de registrarse-------------------------------------


    //PARA CUANDO SE NECESITE MÁS INFORMACIÓN COMO EL NOMBRE DEL USUARIO Y EL CARGO
    //COMO EL EMAIL Y LA CONTRASEÑA
    if ( datos_extra ) {

        //--------------Correo---------------------------------------
        //No se ha escrio nada y se ha tocado el input del correo
        if ( this.login_email_password.controls['email'].touched == tocado && this.login_email_password.controls['email'].value.length == 0){

          this.formulario_correo_password.correo.error = true
          this.formulario_correo_password.correo.mensaje_error = "Escriba su correo"


        }
        
        //Formato del correo incorrecto
        else if ( this.login_email_password.controls['email'].touched == tocado && this.login_email_password.controls['email'].invalid){

          this.formulario_correo_password.correo.error = true
          this.formulario_correo_password.correo.mensaje_error = "Correo formato incorrecto"

          

        }

        //cuando es válido el formato del correo y no se ha tocado
        else if (this.login_email_password.controls['email'].valid){
          
          this.formulario_correo_password.correo.error = false
          this.formulario_correo_password.correo.mensaje_error = ""
          
        }

      
        //--------------Fin Correo---------------------------------------


        //--------------Contraseña---------------------------------------
        
        //no se cumple el mínimo de 8 carácteres 
        if ( this.login_email_password.controls['password'].touched == tocado && this.login_email_password.controls['password'].value.length < 8){

          this.formulario_correo_password.password.error = true
          this.formulario_correo_password.password.mensaje_error = "Mínimo 8 carácteres para la contraseña"

        }

        //se pasa del máximo de 20 carácteres permitidos
        else if ( this.login_email_password.controls['password'].touched == tocado && this.login_email_password.controls['password'].value.length > 20){

          this.formulario_correo_password.password.error = true
          this.formulario_correo_password.password.mensaje_error = "Máximo 20 carácteres para la contraseña"

        }
        
        //contraseña válida
        else if (this.login_email_password.controls['password'].valid){
          
          this.formulario_correo_password.password.error = false
          this.formulario_correo_password.password.mensaje_error = ""
          
        }


        //--------------Fin Contraseña---------------------------------------



        //--------------Repetir contraseña---------------------------------------

        //no se cumple el mínimo de 8 carácteres 
        if ( this.login_email_password.controls['repita_password'].touched == tocado && this.login_email_password.controls['repita_password'].value.length < 8){

          this.formulario_correo_password.repita_password.error = true
          this.formulario_correo_password.repita_password.mensaje_error = "Mínimo 8 carácteres para la contraseña"
          

        }

        //se pasa del máximo de 20 carácteres permitidos
        else if ( this.login_email_password.controls['repita_password'].touched == tocado && this.login_email_password.controls['repita_password'].value.length > 20){

          this.formulario_correo_password.repita_password.error = true
          this.formulario_correo_password.repita_password.mensaje_error = "Máximo 20 carácteres para la contraseña"

        }
        
        //contraseña válida
        else if (this.login_email_password.controls['repita_password'].valid){
          
          this.formulario_correo_password.repita_password.error = false
          this.formulario_correo_password.repita_password.mensaje_error = ""
          
        }

        //--------------Fin repetir contraseña---------------------------------------


        //--------------Validar que ambas contraseñas sean correctas---------------------------------------

        if ( this.login_email_password.controls['password'].touched && this.login_email_password.controls['repita_password'].touched){
            
            
            if ( this.login_email_password.controls['password'].value != this.login_email_password.controls['repita_password'].value ){

                this.formulario_correo_password.ambas_passwords.error = true
                this.formulario_correo_password.ambas_passwords.mensaje_error = "Las dos contraseñas NO son iguales"

            }

            else{

              this.formulario_correo_password.ambas_passwords.error = false
              this.formulario_correo_password.ambas_passwords.mensaje_error = ""


            }
          
            
        }

      

        //--------------Fin validar que ambas contraseñas sean correctas---------------------------------------


    }
    

    
    
  


  }

  //Propiedades para los botones de Facebook y Gmail
  botones_facebook_gmail: { [key: string]: {animacion:boolean, desactivar: boolean} } = {

    'facebook': {

      animacion: false,
      desactivar: false

    },

    
    'gmail': {

      animacion: false,
      desactivar: false

    }

  }

  //Animación botones Facebook y Gmail
  animacion_botones_facebook_gmail(tipo_boton: string, tiempo_animacion: number){

    this.botones_facebook_gmail[tipo_boton].animacion = true

    //Colocamos la animación de selección de Facebook o Gmail
    setTimeout(()=>{

      this.botones_facebook_gmail[tipo_boton].animacion = false

    }, tiempo_animacion * 1000)
    

  }

  //Botón registrarse con Facebook o Gmail
  boton_registro_facebook_gmail(tipo_boton: string){

    let error_correo_password = ""

    //Nombre del usuario incorrecto
    if (this.login_email_password.controls['nombre_usuario'].invalid){

      error_correo_password += "Nombre del usuario inválido. <br>"

    }

    //Cargo del usuario no elejido
    if (this.formulario_nombre_cargo.cargo_usuario.nombre_cargo == ""){

      error_correo_password += "Elija el cargo para el usuario. <br>"

    }


     //Mostramos el mensaje de error
    if ( error_correo_password.length > 0 ){

      Swal.fire({
        icon: 'error',
        title: 'Formato incorrecto',
        html: error_correo_password,
        
      })
      
      //Solo queremos que el nombre del usario esté correcto y el cargo
      this.validar_formato_email_password(false, false)

    }

    //Si el nombre del usuario y el cargo elijido son correctos se registra, el usuario
    else{

      
      this.animacion_botones_facebook_gmail(tipo_boton, 3.6)

    
      //Para Gmail
      if (tipo_boton == 'gmail'){
        

        const nuevo_usuario: UsuarioFacebookGmail = {

          nombre: this.login_email_password.controls['nombre_usuario'].value,
          email: '',
          cargo: this.formulario_nombre_cargo.cargo_usuario.nombre_cargo

        }

        localStorage.setItem('nuevo_usuario_centrali', JSON.stringify(nuevo_usuario))
        
        this.usuarios_service.autenticar_gmail();
      

      }

      //Facebook
      else{

        this.auth_service.signIn(FacebookLoginProvider.PROVIDER_ID).then((user: SocialUser) => {
          
          const nuevo_usuario: UsuarioFacebookGmail = {

            nombre: this.login_email_password.controls['nombre_usuario'].value,
            email: (user as any).email,
            cargo: this.formulario_nombre_cargo.cargo_usuario.nombre_cargo
  
          }

      
          this.usuarios_service.crear_usuario_facebook_gmail(nuevo_usuario).subscribe(

            (respuesta)=>{

              this.router.navigate(['/login']);

              Swal.fire({
                title: "Usuario Creado.",
                text: "Debe esperar a que un administrador verifique tu cuenta.",
                icon: "success"
              });

            },

            (data) =>{

          
              const error_obtenido = (data as any).error.Errors
              let mostrar_error = ""


              if (error_obtenido){

                mostrar_error =  Object.values(error_obtenido).join('<br>')

              }

              else{

                mostrar_error = "Ha ocurrido un error!";

              }


              Swal.fire({
                icon: 'error',
                title: 'Error',
                html: mostrar_error,
                
              })
        
            }



          )

        });

      }
      
    


    }


  }


  //Registrarse con correo y contraseña, sin usar botón Facebook o Gmail
  boton_registro_correo_password(){

    let error_correo_password = ""

    //Nombre del usuario incorrecto
    if (this.login_email_password.controls['nombre_usuario'].invalid){

      error_correo_password += "Nombre del usuario inválido. <br>"

    }

    //Cargo del usuario no elejido
    if (this.formulario_nombre_cargo.cargo_usuario.nombre_cargo == ""){

      error_correo_password += "Elija el cargo para el usuario. <br>"

    }

    //Incorrecto email
    if ( this.login_email_password.controls['email'].invalid){

      error_correo_password += "Para el <b> correo</b>, use <u>gmail</u>, <u>hootmail</u> o <u>yahoo</u>. <br>"

    }

    //Incorrecta contraseña
    if ( this.login_email_password.controls['password'].invalid || this.login_email_password.controls['repita_password'].invalid){

      error_correo_password += "Contraseña inválida. <br>"

    }

    //Las dos contraseñas no son iguales
    if (this.formulario_correo_password.ambas_passwords.error ){

      error_correo_password += "Las dos contraseñas NO son iguales."

    }

    //Mostramos el mensaje de error
    if ( error_correo_password.length > 0 ){

      Swal.fire({
        icon: 'error',
        title: 'Formato incorrecto',
        html: error_correo_password,
        
      })
  
      this.validar_formato_email_password(false, true)

    }

    //Si el formato del correo y la contraseña son válidos el usuario se podrá registrar
    else{

      const nombreUsuarioControl = this.login_email_password.controls['nombre_usuario'];
      const nombre = nombreUsuarioControl ? nombreUsuarioControl.value : '';

      const emailUsuarioControl = this.login_email_password.controls['email'];
      const email = emailUsuarioControl ? emailUsuarioControl.value : '';

      const passwordUsuarioControl = this.login_email_password.controls['password'];
      const password = passwordUsuarioControl ? passwordUsuarioControl.value : '';

      const repetir_passwordUsuarioControl = this.login_email_password.controls['repita_password'];
      const repetir_password = repetir_passwordUsuarioControl ? repetir_passwordUsuarioControl.value : '';
      
      const nuevo_usuario: UsuarioEmailPassword = {

        nombre: nombre,
        email: email,
        password: password,
        repetir_password:  repetir_password,
        cargo: this.formulario_nombre_cargo.cargo_usuario.nombre_cargo

      }

      this.usuarios_service.crear_usuario_email_password(nuevo_usuario).subscribe(

        (respuesta)=>{

          this.router.navigate(['/login']);

          Swal.fire({
            title: "Usuario Creado.",
            text: "Debe esperar a que un administrador verifique tu cuenta.",
            icon: "success"
          });
          

        },

        (data) =>{


          const error_obtenido = (data as any).error.Errors
          let mostrar_error = ""

          if (error_obtenido){

            mostrar_error = Object.values(error_obtenido).join('<br>')

          }

          else{

            mostrar_error = "Ha ocurrido un error!";

          }


          Swal.fire({
            icon: 'error',
            title: 'Error',
            html: mostrar_error,
            
          })

          
        

        }

      )

    }

    
  }

  login_facebook(){
    this.auth_service.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  

 


}
