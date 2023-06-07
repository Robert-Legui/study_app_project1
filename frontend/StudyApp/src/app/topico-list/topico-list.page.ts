import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { DataService, Message} from '../services/data.service';
import axios from 'axios';

@Component({
  selector: 'app-theme-list',
  templateUrl: './topico-list.page.html',
  styleUrls: ['./topico-list.page.scss'],
})
export class TopicoListPage implements OnInit {
  topicos : any = [];
  private platform = inject(Platform);
  public alertButtons = ['Aceptar', 'Cancelar'];

  constructor(private toastController: ToastController,
    
    private alertController: AlertController
    ) 
    {}

  ionViewWillEnter(): void {
    this.getThemes();
  }

  ngOnInit() {}
  async confirmDelete(id: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: 'Desea eliminar al usuario?',
      buttons: [
        {
          text: 'Confirmar ',
          handler: () => {
            this.deleteTheme(id);
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

  getThemes() {
    axios
      .get('http://localhost:3000/topics/list')
      .then((result) => {
        if (result.data.success == true) {
          this.topicos = result.data.temas;
        } else {
          console.log(result.data.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  deleteTheme(id : any) {
    axios
      .delete('http://localhost:3000/topics/delete/' + id)
      .then((result) => {
        if (result.data.success == true) {
          this.presentToast('Topico Eliminado');
          this.getThemes();
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
}
