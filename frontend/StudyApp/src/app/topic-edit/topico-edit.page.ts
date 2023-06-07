import { CommonModule, formatDate} from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, Platform, ToastController } from '@ionic/angular';
import { DataService, Message } from '../services/data.service';

import axios from 'axios';

@Component({
  selector: 'app-user-edit',
  templateUrl: './topico-edit.page.html',
  styleUrls: ['./topico-edit.page.scss'],
})
export class TopicoEditPage implements OnInit {
  public message!: Message;
  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  Topicos: any = '';
  accion = 'Agregar Topicos';

  constructor(
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    //con este comando se recupera el id que se pasa
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    // this.message = this.data.getMessageById(parseInt(id, 10));
    axios
      .get('http://localhost:3000/topics/' + id)
      .then((result) => {
        if (result.data.success == true) {
          if (id !== '0') {
            this.accion = 'Editar Topicos';
          }
          if (result.data.usuario != null) {
            this.Topicos = result.data.usuario;
          } else {
            this.Topicos = {};
          }
        } else {
          console.log(result.data.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Inbox' : '';
  }

  saveUser() {
    let fecha = formatDate(new Date(), 'yyyy-MM-dd', 'en-US')
    console.log('usuario: ', this.Topicos);
    var data = {
      id: this.Topicos.id,
      create_date: fecha,
      name: this.Topicos.name,
      color: this.Topicos.colo
     
    };
    axios
      .post('http://localhost:3000/topics/update', data)
      .then(async (result) => {
        if (result.data.success == true) {
          this.presentToast('Usuario Guardado');
          this.router.navigate(['/topico-list']);
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
}
