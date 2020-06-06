import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  usuario: Usuario = {
    nick: '',
    nombreCompleto: '',
    email: '',
	  cp: '',
	  descripcion: '',
	  imagenPerfil: '',
    rol: 'musico',
    baneado: '0',
    fechaBaneo: null,
    fechaDesbaneo: null
  };
  password: string = ''
  confirm_password: string = ''

  constructor(public auth: AngularFireAuth, 
    public alertController: AlertController, 
    public router: Router, 
    public usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async registrarse(){
    const { password, confirm_password } = this

    var error: string = ''

		if(this.usuario.nick == ''){
			error += "nick"
			
		}
		if(this.usuario.nombreCompleto == ''){
			if(error == ''){
				error += "nombre completo"
			} else{
				error += ", nombre completo"
			}
    }
    
    if(this.usuario.cp == ''){
			if(error == ''){
				error += "ubicación"
			} else{
				error += ", ubicación"
			}
    }
    
    if(this.usuario.email == ''){
			if(error == ''){
				error += "email"
			} else{
				error += ", email"
			}
    }

    if(this.password == '' || this.confirm_password == ''){
			if(error == ''){
				error += "contraseña"
			} else{
				error += ", contraseña"
			}
    }

    if(error != ''){

      this.presentAlert("Error","Debe rellenar los siguientes datos: "+error)

    }else if (password !== confirm_password){
      this.presentAlert("Error","Las contraseñas no son iguales.")
        console.log("error")
  

    }else{

      try {
      
        const res = await this.auth.auth.createUserWithEmailAndPassword(this.usuario.email, password)


        this.usuarioService.addUsuario(this.usuario, res.user.uid)
        console.log(res)

        this.password = ''
        this.confirm_password = ''

        this.router.navigate(['/login']);
      } catch (err) {
        console.dir(err)
        
        this.password = ''
        this.confirm_password = ''
        switch (err.message) {
          case "The email address is badly formatted.":
            this.presentAlert("Error","Escriba un email correcto.")
            break;

          case "The password must be 6 characters long or more.":
            this.presentAlert("Error","La contraseña debe tener más de 6 caracteres.")
            break;
          
          case "Password should be at least 6 characters":
            this.presentAlert("Error","La contraseña debe tener más de 6 caracteres.")
            break;

          case "The email address is already in use by another account.":
            this.presentAlert("Error","El email ya está en uso. Pruebe a hacer login")

          default:
            break;
        }
      }  
    }
  }

}
