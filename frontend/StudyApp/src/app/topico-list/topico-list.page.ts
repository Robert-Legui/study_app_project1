import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { DataService, Message } from '../services/data.service';
import axios from 'axios';

@Component({
  selector: 'app-topico-list',
  templateUrl: './topico-list.page.html',
  styleUrls: ['./topico-list.page.scss'],
})
export class TopicoListPage implements OnInit {
  topicos: any = [];
  private platform = inject(Platform);
  private activatedRoute = inject(ActivatedRoute);
  public alertButtons = ['Aceptar', 'Cancelar'];
  userId: string = '';
  theme_id: string = '';
  theme_prop_id: string = '';
  theme_prop_name: string = '';
  orden: string= 'desc';

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) {}

  ionViewWillEnter(): void {
    this.getTopics(this.orden);
    this.getPropName();
  }

  ngOnInit() {
    this.theme_id = this.activatedRoute.snapshot.paramMap.get('theme_id') as string;
    this.theme_prop_id = this.activatedRoute.snapshot.paramMap.get('theme_prop_id') as string;
    this.userId = localStorage.getItem("user_id") ??'';
    //this.getTopics();
  }

  ordenAsc(){
    this.orden = 'asc'
    this.getTopics('asc')
  }

  ordenDesc(){
    this.orden = 'desc'
    this.getTopics('desc')
  }


  async confirmDelete(id: string, theme_id: string, theme_prop_id: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: 'Desea eliminar el Topico?',
      buttons: [
        {
          text: 'Confirmar ',
          handler: () => {
            this.deleteTheme(id,theme_id,theme_prop_id);
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

  getTopics(orden: string) {
    let headers = this.getHeader();
    axios
      .get('http://localhost:3000/topics/list/'+this.theme_id+'/'+this.theme_prop_id+'/'+orden,headers)
      .then((result) => {
        if (result.data.success == true) {
          if(result.data.topicos && result.data.topicos[0]){
            //console.log(`result.data.topicos: ${JSON.stringify(result.data.topicos)}`)
            this.topicos = result.data.topicos;
          }
        } else {
          console.log(result.data.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  getPropName(){
    let headers = this.getHeader();
      axios
        .get('http://localhost:3000/themeproperties/buscarPorCodigo/' + this.theme_id + '/' + this.theme_prop_id,headers)
        .then((result) => {
          if (result.data.success == true) {
            //console.log(`result.data: ${JSON.stringify(result.data)}`)
            if (result.data.themes_properties[0] != null) {
              this.theme_prop_name = result.data.themes_properties[0].property_name;
            } else {
              this.theme_prop_name = '';
            }
          } else {
            console.log(result.data.error);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
  }

  deleteTheme(id: any,theme_id: any,theme_prop_id: any) {
    let headers = this.getHeader();
    axios
      .delete('http://localhost:3000/topics/delete/'+id+'/'+theme_id+'/'+theme_prop_id ,headers)
      .then((result) => {
        if (result.data.success == true) {
          this.presentToast('Topico Eliminado');
          this.getTopics(this.orden);
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
