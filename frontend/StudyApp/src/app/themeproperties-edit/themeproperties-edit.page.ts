import { CommonModule, formatDate } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicModule, Platform, ToastController } from '@ionic/angular';
import { DataService, Message } from '../services/data.service';
import axios from 'axios';

@Component({
  selector: 'app-themeproperties-edit',
  templateUrl: './themeproperties-edit.page.html',
  styleUrls: ['./themeproperties-edit.page.scss'],
})
export class ThemePropertiesEditPage implements OnInit {
  public message!: Message;
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  themeproperties: any = '';
  accion = 'Agregar Propiedad de Tema';
  id: string = '';
  idTema: string = '';

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    //con este comando se recupera el id que se pasa
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.idTema = this.activatedRoute.snapshot.paramMap.get('idTema') as string;
    console.log(`id: ${this.id} - idTema: ${this.idTema}`)
    // this.message = this.data.getMessageById(parseInt(id, 10));
    if(this.id!=="0"){
      let headers = this.getHeader();
      axios
        .get('http://localhost:3000/themeproperties/buscarPorCodigo/' + this.idTema + '/' + this.id,headers)
        .then((result) => {
          if (result.data.success == true) {
            console.log(`result.data: ${JSON.stringify(result.data)}`)
            if (this.id !== '0') {
              this.accion = 'Editar Propiedad';
            }
            if (result.data.themes_properties[0] != null) {
              this.themeproperties = result.data.themes_properties[0];
            } else {
              this.themeproperties = {};
            }
          } else {
            console.log(result.data.error);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }else{
      this.themeproperties = {}
    }
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Inbox' : '';
  }

  saveThemeProperty() {
    //let fecha = formatDate(new Date(), 'yyyy-MM-dd', 'en-US')
    let fecha =  formatDate(Date.now(), 'yyy-MM-dd hh:mm:ss', 'en-US');
    //console.log('Temas: ', this.themeproperties);
    let headers = this.getHeader();
    var data = {
      id: this.id,
      theme_id: this.idTema,
      property_name: this.themeproperties.property_name,
      property_value: this.themeproperties.property_value
    };
    console.log('themeproperties: ', data);
    axios
      .post('http://localhost:3000/themeproperties/update', data, headers)
      .then(async (result) => {
        if (result.data.success == true) {
          this.presentToast('Tema Guardado');
          this.router.navigate(['/home']);
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
