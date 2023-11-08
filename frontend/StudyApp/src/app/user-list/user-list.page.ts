import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { DataService, Message } from '../services/data.service';
import axios from 'axios';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {
  usuarios: any = [];
  usuario: any = '';
  resDelete = '';
  private platform = inject(Platform);
  isAlertOpen = false;
  public alertButtons = ['Confirmar ', 'Cancelar'];

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) {}

  ionViewWillEnter(): void {
    this.getUsers();
  }

  ngOnInit() {
    this.getUsers
  }

  async confirmDelete(id: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: 'Desea eliminar al usuario?',
      buttons: [
        {
          text: 'Confirmar ',
          handler: () => {
            this.deleteUser(id);
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

  getUsers() {
    let token = localStorage.getItem("token");
    if(!token) {
      this.router.navigate(["/login"]);
    }

    var headers = {
        headers: {
            'Authorization': token
        }
    }
    axios
      .get('http://localhost:3000/users/list',headers)
      .then((result) => {
        //console.log(JSON.stringify(result.data));
        if (result.data.success == true) {
          this.usuarios = result.data.usuarios;
        } else {
          console.log(result.data.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  deleteUser(id: any) {
    let headers = this.getHeader();
    axios
      .delete('http://localhost:3000/users/delete/' + id,headers)
      .then((result) => {
        if (result.data.success == true) {
          this.presentToast('Usuario Eliminado');
          this.getUsers();
        } else {
          this.presentToast(result.data.error);
        }
      })
      .catch((error) => {
        this.presentToast(error.message);
      });
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? '' : '';
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }

  getHeader() {
    let token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }

    var headers = {
      headers: {
        Authorization: token,
      },
    };
    return headers;
  }
}
