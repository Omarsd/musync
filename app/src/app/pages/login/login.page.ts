import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // Inicializamos variables
  email:      string = ""
  password:   string = ""

  //Cargamos el objeto de la clase AngularFireAuth para la autenticacion
  constructor(public auth: AngularFireAuth, 
    public alertController: AlertController, 
    public router: Router) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'usuario/contraseña no válidos.',
      buttons: ['OK']
    });

    await alert.present();
  }


  async login(){

    const { email, password } = this
    
    try {
      // Le pasamos a firebase el email y contraseña para que valide. El resultado va a "res". Si falla, va al catch
      const res = await this.auth.auth.signInWithEmailAndPassword(email, password)
      console.log(res)

      this.router.navigate(['/home']);
      //Esto es para autenticarse con google. Hay que activarlo en firebase.google.com
      //this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } catch (err) {
        console.dir(err)
        if(err.code = "auth/user-not-found"){
          this.presentAlert()
        }
    }


  }
}
