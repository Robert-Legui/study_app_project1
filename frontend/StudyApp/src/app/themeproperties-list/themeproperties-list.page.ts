import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { DataService, Message } from '../services/data.service';
import axios from 'axios';

@Component({
  selector: 'app-themeproperties-list',
  templateUrl: './themeproperties-list.page.html',
  styleUrls: ['./themeproperties-list.page.scss'],
})
export class ThemePropertiesListPage implements OnInit {
  themesProperties: any = [];
  private platform = inject(Platform);
  public alertButtons = ['Aceptar', 'Cancelar'];

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) {}

  ionViewWillEnter(): void {
    this.getThemeProperties();
  }

  ngOnInit() {}
  async confirmDelete(id: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: 'Desea eliminar el Tema?',
      buttons: [
        {
          text: 'Confirmar ',
          handler: () => {
            this.deleteThemeProperties(id);
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

  getThemeProperties() {
    let headers = this.getHeader();
    axios
      .get('http://localhost:3000/themeproperties/list',headers)
      .then((result) => {
        if (result.data.success == true) {
          console.log(JSON.stringify(result.data.themes_properties))
          this.themesProperties = result.data.themes_properties;
        } else {
          console.log(`result.data.error : ${result.data.error}`);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  deleteThemeProperties(id: any) {
    let headers = this.getHeader();
    axios
      .delete('http://localhost:3000/themeproperties/delete/' + id,headers)
      .then((result) => {
        if (result.data.success == true) {
          this.presentToast('Tema Eliminado');
          this.getThemeProperties();
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
