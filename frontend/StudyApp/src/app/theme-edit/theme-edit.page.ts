import { CommonModule, formatDate } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, Platform, ToastController } from '@ionic/angular';
import { DataService, Message } from '../services/data.service';
import axios from 'axios';

@Component({
  selector: 'app-theme-edit',
  templateUrl: './theme-edit.page.html',
  styleUrls: ['./theme-edit.page.scss'],
})
export class ThemeEditPage implements OnInit {
  public message!: Message;
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  theme: any = '';
  accion = 'Agregar Tema';
  id: string = '';

  constructor(
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    //con este comando se recupera el id que se pasa
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    // this.message = this.data.getMessageById(parseInt(id, 10));
    if(this.id!=="0"){
      let headers = this.getHeader();
      axios
        .get('http://localhost:3000/themes/buscarPorCodigo/' + this.id,headers)
        .then((result) => {
          if (result.data.success == true) {
            if (this.id !== '0') {
              this.accion = 'Editar Tema';
            }
            if (result.data.theme != null) {
              this.theme = result.data.theme;
            } else {
              this.theme = {};
            }
          } else {
            console.log(result.data.error);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }else{
      this.theme = {}
    }
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Inbox' : '';
  }

  saveTheme() {
    //let fecha = formatDate(new Date(), 'yyyy-MM-dd', 'en-US')
    let fecha =  formatDate(Date.now(), 'yyy-MM-dd hh:mm:ss', 'en-US');
    //console.log('Temas: ', this.theme);
    let headers = this.getHeader();
    var data = {
      id: this.theme.id,
      create_date: fecha,
      name: this.theme.name,
      description: this.theme.description,
      keywords: this.theme.keywords,
      owner_user_id: localStorage.getItem("user_id"),
    };
    console.log('theme: ', data);
    axios
      .post('http://localhost:3000/themes/update', data, headers)
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
