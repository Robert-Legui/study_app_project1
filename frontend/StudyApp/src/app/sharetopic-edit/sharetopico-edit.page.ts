import { CommonModule, formatDate} from '@angular/common';
import { Component, inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, Platform, ToastController } from '@ionic/angular';
import { DataService, Message } from '../services/data.service';
//import { ColorPickerModule } from 'ngx-color-picker';

import axios from 'axios';

@Component({
  selector: 'app-user-edit',
  templateUrl: './sharetopico-edit.page.html',
  styleUrls: ['./sharetopico-edit.page.scss'],
})
export class ShareTopicoEditPage implements OnInit {
  public message!: Message;
  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  ShareTopic: any = {} ;
  accion = 'Compartir Topico';
  id: string = '';
  theme_id: string = '';
  theme_prop_id: string = '';
  theme_prop_name: string = '';
  topic_id: string = '';
  //color:any;
  user_id:string='';
  userId: string = '';
  
  // @ViewChild('palette') public palette!: ElementRef;
  //public color = 'rgba(48, 48, 48, 1)';

  constructor(
    private toastController: ToastController,
    private router: Router
  ) {}

  // public captureColour(event: any): void {
  //   this.color = event;
  //   this.palette.nativeElement.style.backgroundColor = this.color;
  // }

  ngOnInit() {
    //con este comando se recupera el id que se pasa
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.theme_id = this.activatedRoute.snapshot.paramMap.get('theme_id') as string;
    this.theme_prop_id = this.activatedRoute.snapshot.paramMap.get('theme_prop_id') as string;
    this.topic_id = this.activatedRoute.snapshot.paramMap.get('topic_id') as string;
    this.userId = localStorage.getItem("user_id") ??'';
  }

  validarEmail(){
    let headers = this.getHeader();
    axios
      .get('http://localhost:3000/shared_topics/validar_email/'+this.theme_id+'/'+this.theme_prop_id+'/'+this.topic_id+'/'+this.ShareTopic.email,  headers)
      .then(async (result) => {
        if (result.data.success == true) {
          if(result.data.user){
            this.user_id = result.data.user.id
            this.ShareTopic.name = result.data.user.name+' '+result.data.user.last_name
            this.presentToast('Usuario encontrado');
          }else{
            this.presentToast('Usuario NO encontrado');
          }
        } else {
          this.presentToast(result.data.error);
        }
      })
      .catch(async (error) => {
        this.presentToast(error.message);
      });
  }
  

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Inbox' : '';
  }

  saveTopic() {
    let fecha = formatDate( Date.now(), 'yyyy-MM-dd hh:mm:ss', 'en-US')
    console.log('topico: ', this.ShareTopic);
    var data = {
      id: '0',
      theme_id: this.theme_id,
      theme_prop_id: this.theme_prop_id,
      topic_id: this.topic_id,
      user_id: this.user_id
    };
    let headers = this.getHeader();
    axios
      .post('http://localhost:3000/shared_topics/update', data, headers)
      .then(async (result) => {
        if (result.data.success == true) {
          this.presentToast('Topico compartido!!');
          this.router.navigate(['/']);
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
