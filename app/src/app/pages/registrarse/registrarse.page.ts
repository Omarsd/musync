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

    if (password !== confirm_password){
      this.presentAlert("Error","Las contraseñas no son iguales.")
        console.log("error")
    }else{

      try {
      
        const res = await this.auth.auth.createUserWithEmailAndPassword(this.usuario.email, password)


        this.usuarioService.addUsuario(this.usuario, res.user.uid)
        console.log(res)

        this.router.navigate(['/login']);
      } catch (err) {
        console.dir(err)
        
        if(err.code="auth/weak-password"){
          this.presentAlert("Error","La contraseña es demasiado débil. Pruebe con más de 6 caracteres")
        } else if(err.code="auth/email-already-in-use"){
          this.presentAlert("Error","Email ya en uso.")
        }
      }
      
    }
  }

}
