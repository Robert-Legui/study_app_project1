import { Component, OnInit, inject } from '@angular/core';
import { AlertController, RefresherCustomEvent, ToastController } from '@ionic/angular';
import { DataService, Message } from '../services/data.service';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private data = inject(DataService);
  temas: any = [];
  usuario: any = {};
  themesProperties: any = [];
  buscar: string = '';

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private router : Router) {
    }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 100);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  ionViewWillEnter(): void {
    

     // verificar si es que mi el usuario no esta logeado
     let token = localStorage.getItem("token");


     
     if(!token){       
       this.router.navigate(['/login']);
       return;
     }
    this.getUser();
    this.getThemes();
  }

  ngOnInit(): void {
  }

  getThemes() {
    let token = localStorage.getItem("token");
      if(!token) {
        this.router.navigate(["/login"]);
      }

      var headers = {
          headers: {
              'Authorization': token
          }
      }
      var datos = {
        userId: localStorage.getItem("user_id")
      }
    axios
      .get('http://localhost:3000/themes/list',headers)
      .then((result) => {
        if (result.data.success == true) {
          this.temas = result.data.temas;
          //console.log(`this.temas: ${JSON.stringify(this.temas)} - localStorage.getItem("user_id"): ${localStorage.getItem("user_id")}`)
        } else {
          console.log(result.data.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  getUser () {
    let token = localStorage.getItem("token");
    let id = localStorage.getItem("user_id");
    let config ={
        headers : {
        Authorization : token
      }
    }
    
    axios.get("http://localhost:3000/users/buscarPorCodigo/"+id, config)
    .then( result => {
      if (result.data.success == true) {
        this.usuario = result.data.usuario;
      } else {
        console.log(result.data.error);
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        this.router.navigate(["/login"]);
      }
      
    }).catch(error => {
      console.log(error.message);
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      this.router.navigate(["/login"]);
    })
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
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

  // addThemeProperty(idTema: number){
  //   this.router.navigate(['details',{idTema:idTema}])
  // }

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

  async confirmDeleteProp(id: string, idTema:string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: 'Desea eliminar la propiedad?',
      buttons: [
        {
          text: 'Confirmar ',
          handler: () => {
            this.deleteProp(id,idTema);
          },
        },
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancelado');
          },
        },
      ],
    });
    await alert.present();
  }

  

  deleteProp(id: any, idTema:any) {
    let headers = this.getHeader();
    axios
      .delete('http://localhost:3000/themeproperties/delete/' + idTema+'/'+id,headers)
      .then((result) => {
        if (result.data.success == true) {
          this.presentToast('Propiedad Eliminada');
          this.getThemes();
        } else {
          this.presentToast(result.data.error);
        }
      })
      .catch((error) => {
        this.presentToast(error.message);
      });
  }
}
