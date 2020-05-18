import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  nick:             string = ""
  email:            string = ""
  password:         string = ""
  confirm_password: string = ""

  constructor(public auth: AngularFireAuth, public alertController: AlertController, public router: Router) { }

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
    const { nick, email, password, confirm_password } = this

    if (password !== confirm_password){
      this.presentAlert("Error","Contraseñas don't match")//this.presentAlert("Error","Las contraseñas no son iguales.")
        console.log("error")
    }else{

      try {
      
        const res = await this.auth.auth.createUserWithEmailAndPassword(email, password)

        console.log(res)

        this.router.navigate(['/login']);
      } catch (err) {
        console.dir(err)
        
        // Hay que crear un if para "auth/weak-password" y alert
        // "auth/email-already-in-use" y alert
      }
      
    }
  }

}
