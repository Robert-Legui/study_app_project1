import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import axios from 'axios';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private toastController: ToastController,
    private router : Router) {}
  color:any;

  logOut() {
    //console.log('usuario: ', this.usuario);
    var data = {
      id: localStorage.getItem("user_id")
    };
    
    let headers = this.getHeader();
    axios
      .post('http://localhost:3000/user/logout', data, headers)
      .then(async (result) => {
        if (result.data.success == true) {          
          localStorage.removeItem("token");
          localStorage.removeItem("user_id");
          this.presentToast('Sesion Cerrada');
          this.router.navigate(['/login']);
        } else {
          this.presentToast(result.data.error);
        }
      })
      .catch(async (error) => {
        this.presentToast(error.message);
      });
  }

  getHeader(){
    let token = localStorage.getItem("token");
      if(!token) {
        this.router.navigate(["/login"]);
      }

      var headers = {
          headers: {
              'Authorization': token
          }
      }
      return headers;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }
}
