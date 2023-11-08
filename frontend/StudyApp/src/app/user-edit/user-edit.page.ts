import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, Platform, ToastController } from '@ionic/angular';
import { DataService, Message } from '../services/data.service';
import axios from 'axios';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.page.html',
  styleUrls: ['./user-edit.page.scss'],
})
export class UserEditPage implements OnInit {
  public message!: Message;
  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  usuario: any = '';
  accion = 'Agregar Usuario';
  id: string | undefined;
  buttonClicked = false;
  origen:string=''

  constructor(
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    //con este comando se recupera el id que se pasa
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.origen = this.activatedRoute.snapshot.paramMap.get('origen') as string;
    // this.message = this.data.getMessageById(parseInt(id, 10));
    if(this.id !== '0') {
      let headers = this.getHeader();
      axios
        .get('http://localhost:3000/users/buscarPorCodigo/' + this.id, headers)
        .then((result) => {
          if (result.data.success == true) {
            if (this.id !== '0') {
              this.accion = 'Editar Usuario';
            }
            if (result.data.usuario != null) {
              this.usuario = result.data.usuario;
            } else {
              this.usuario = {};
            }
          } else {
            console.log(result.data.error);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }else{
      this.buttonClicked = true;
      this.usuario = {};
    }
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Inbox' : '';
  }

  saveUser() {
    //console.log('usuario: ', this.usuario);
    var data = {
      id: this.id=="0"?"0":this.usuario.id,
      name: this.usuario.name,
      last_name: this.usuario.last_name,
      email: this.usuario.email,
      password: this.usuario.password,
      admin: this.usuario.admin,
      deleted: this.usuario.deleted
    };
    
    let headers = this.getHeader();
    axios
      .post('http://localhost:3000/users/update', data, headers)
      .then(async (result) => {
        if (result.data.success == true) {
          this.presentToast('Usuario Guardado');
          if (this.id=="0"){
            this.router.navigate(['/login']);
          }else{
            this.router.navigate(['/user-list']);
          }
        } else {
          this.presentToast(result.data.error);
        }
      })
      .catch(async (error) => {
        this.presentToast(error.message);
      });
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
}
