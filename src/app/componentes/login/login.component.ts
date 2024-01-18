import { Component, ElementRef, ViewChild } from '@angular/core';

//Formularios reactivos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//SweetAlert2
import Swal from 'sweetalert2';

//Login Facebook
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider} from "@abacritt/angularx-social-login";
import { UsuariosService } from 'src/app/services/usuarios_service/usuarios.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { OAuthEvent, OAuthService } from 'angular-oauth2-oidc';
import { LoginUsuario } from 'src/app/interfaces/login_usuario';
import { UsuarioFacebookGmail } from 'src/app/interfaces/usuario_facebook_gmail';
import { LoginUsuarioEmailPassword } from 'src/app/interfaces/login_email_password';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  //formulario de login con email y password
  login_email_password: FormGroup

  
  constructor(

      private form_builder: FormBuilder,

      private auth_service: SocialAuthService,

      private usuarios_service: UsuariosService,

      private router: Router,

      private cookieService: CookieService,

      private oauthService: OAuthService


    ){

      this.login_email_password = this.form_builder.group(

        {

          //se usa "Validators.pattern()" para que el formato del correo sea completo y válido 
          //solo se permiten correos "@gmail.com", "@hotmail.com", "@yahoo.com"
          email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@(gmail|hotmail|yahoo)\\.com$')]],

          //las contraseñas deben ser mínimo 8 carácteres 
          //máximo 20 carácteres
          password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]

        }

      )
      
   

  }
  
  suscripcion_login_gmail: any;

  ngOnInit(): void {

    
   this.suscripcion_login_gmail = this.oauthService.events.subscribe(
      (event: OAuthEvent) => {
        if (event.type === 'token_received') {

          const dato = this.usuarios_service.get_email()['email'];

          const gmail: LoginUsuario = {
            email: dato
          }
          
          const usuario_localStorage = localStorage.getItem('nuevo_usuario_centrali')
          
          //Registrar nuevo usuario Gmail
          if (usuario_localStorage != null) {

            const usuario_obtenido = JSON.parse(usuario_localStorage)

            const datos_nuevo_usuario: UsuarioFacebookGmail = {
              nombre: usuario_obtenido.nombre,
              email: dato,
              cargo: usuario_obtenido.cargo
            }


            this.usuarios_service.crear_usuario_facebook_gmail(datos_nuevo_usuario).subscribe(

              (respuesta)=>{

                Swal.fire({
                  title: "Usuario Creado.",
                  text: "Debe esperar a que un administrador verifique tu cuenta.",
                  icon: "success"
                });

              },

              (errores) =>{
  
  
          
                let errors = errores.error.Errors
  
                console.log(typeof errors)
  
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

            localStorage.removeItem('nuevo_usuario_centrali')

          }
          
          //Login Gmail
          else {

            
            this.usuarios_service.login_usuario_facebook_gmail(gmail).subscribe(
  
              (respuesta)=>{
          
              
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Bienvenido",
                  showConfirmButton: false,
                  timer: 2500
                });
          
                const JWT_access = (respuesta as any).access
                const JWT_refresh = (respuesta as any).refresh
          
                const nombre_usuario = (respuesta as any).nombre;
                const cargo_usuario = (respuesta as any).cargo;
                
                
                this.cookieService.set('centrali_JWT_access', JWT_access);
                this.cookieService.set('centrali_JWT_refresh', JWT_refresh);
          
                localStorage.setItem('nombre_usuario_centrali', nombre_usuario)
                localStorage.setItem('cargo_usuario_centrali', cargo_usuario)
          
                this.router.navigate(['/layout/ventas']);
                
          
              },
          
              (errores) =>{
  
  
                let errors = errores.error.Errors

                let mensaje_obtenido = ""

                if (errors){

                  mensaje_obtenido = Object.values(errors).join('<br>') 
      
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
          
          
            );


          }
          
        

        }
      }
   )
    
  }

  ngOnDestroy(): void {
    
    this.suscripcion_login_gmail.unsubscribe()

    
  }

  password_input = "password"

  formulario_correo_password = {

    correo: {

      error: false,
      mensaje_error: ""

    },

    password: {

      error: false,
      mensaje_error: ""

    }

  }

  //Input Contraseña
  ver_password(){

    if (this.password_input == "password"){

      this.password_input = "text"

    }

    else{

      this.password_input = "password"

    }

  }


  //Validar correo y contraseña
  validar_formato_email_password(tocado: boolean){

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
      this.formulario_correo_password.password.mensaje_error = "Mínimo 8 carácteres para la contraseña "

     }

     //se pasa del máximo de 20 carácteres permitidos
     else if ( this.login_email_password.controls['password'].touched == tocado && this.login_email_password.controls['password'].value.length > 20){

      this.formulario_correo_password.password.error = true
      this.formulario_correo_password.password.mensaje_error = "Máximo 20 carácteres para la contraseña "

     }
     
     //contraseña válida
     else if (this.login_email_password.controls['password'].valid){
      
      this.formulario_correo_password.password.error = false
      this.formulario_correo_password.password.mensaje_error = ""
      
    }


    //--------------Fin Contraseña---------------------------------------



  }

  //Iniciar sesión con correo y contraseña, sin usar botón Facebook o Gmail
  boton_login_correo_password(){

    let error_correo_password = ""

    if ( this.login_email_password.controls['email'].invalid){

      error_correo_password += "Para el <b> correo</b>, use <u>gmail</u>, <u>hootmail</u> o <u>yahoo</u>. <br>"

    } 

    if ( this.login_email_password.controls['password'].invalid){

      error_correo_password += "Verifica la <b> contraseña</b>."

    } 

    //Mostramos el mensaje de error
    if ( error_correo_password.length > 0 ){

      Swal.fire({
        icon: 'error',
        title: 'Formato incorrecto',
        html: error_correo_password,
        
      })
  
      this.validar_formato_email_password(false)

    }

    //Si el formato del correo y la contraseña son válidos entonces hacemos inicio de sesión
    else{


      const usuario: LoginUsuarioEmailPassword = {
        email: this.login_email_password.controls['email'].value,
        password: this.login_email_password.controls['password'].value
      } 



      this.usuarios_service.login_email_password(usuario).subscribe(
  
        (respuesta)=>{

          if (respuesta.respuesta) {

            this.router.navigate(['/recuperar_password']);

            const email = this.login_email_password.controls['email'].value

            localStorage.setItem('centrali_codigo_password', respuesta.codigo_verificacion);
            localStorage.setItem('email_centrali', email);
            
          }

          else{

            Swal.fire({
              position: "center",
              icon: "success",
              title: "Bienvenido",
              showConfirmButton: false,
              timer: 2500
            });
      
            const JWT_access = (respuesta as any).access
            const JWT_refresh = (respuesta as any).refresh
      
            const nombre_usuario = (respuesta as any).nombre;
            const cargo_usuario = (respuesta as any).cargo;
            
            
            this.cookieService.set('centrali_JWT_access', JWT_access);
            this.cookieService.set('centrali_JWT_refresh', JWT_refresh);
      
            localStorage.setItem('nombre_usuario_centrali', nombre_usuario)
            localStorage.setItem('cargo_usuario_centrali', cargo_usuario)
      
            this.router.navigate(['/layout/ventas']);


          }
    
        
          
          
    
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
    
    
      );

      

      

    }

    


    

  }

  login_facebook(){
    this.auth_service.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (user)=>{

        const usuario = {
         email: (user as any).email
        }

        this.usuarios_service.login_usuario_facebook_gmail(usuario).subscribe(
  
          (respuesta)=>{
      
          
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Bienvenido",
              showConfirmButton: false,
              timer: 2500
            });
      
            const JWT_access = (respuesta as any).access
            const JWT_refresh = (respuesta as any).refresh
      
            const nombre_usuario = (respuesta as any).nombre;
            const cargo_usuario = (respuesta as any).cargo;
            
            
            this.cookieService.set('centrali_JWT_access', JWT_access);
            this.cookieService.set('centrali_JWT_refresh', JWT_refresh);
      
            localStorage.setItem('nombre_usuario_centrali', nombre_usuario)
            localStorage.setItem('cargo_usuario_centrali', cargo_usuario)
      
            this.router.navigate(['/layout/ventas']);
            
      
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
      
      
        );

        
      }
    ).catch(
      (error)=>{

        Swal.fire({
          icon: "error",
          title: "¡Error!",
          html: 'Ha ocurrido un error!',
        });
  

      }
    )

    
   

 


  }

  login_gmail(){

   this.usuarios_service.autenticar_gmail()
   
   

  }



  
  
  


}
