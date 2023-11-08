import { CommonModule, formatDate} from '@angular/common';
import { Component, inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, Platform, ToastController } from '@ionic/angular';
import { DataService, Message } from '../services/data.service';
//import { ColorPickerModule } from 'ngx-color-picker';

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
  Topico: any = '';
  accion = 'Agregar Topicos';
  id: string = '';
  theme_id: string = '';
  theme_prop_id: string = '';
  theme_prop_name: string = '';
  //color:any;
  userId: string = '';
  link:string='';
  isCopied = false
  
  //@ViewChild('palette') public palette!: ElementRef;
  public color = 'rgba(48, 48, 48, 1)';

  constructor(
    private toastController: ToastController,
    private router: Router
  ) {}

  public captureColour(event: any): void {
    this.color = event;
    //console.log(`this.color: ${this.color}`)
    this.Topico.color=this.color
    //this.palette.nativeElement.style.backgroundColor = this.color;
  }

  ngOnInit() {
    //con este comando se recupera el id que se pasa
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.theme_id = this.activatedRoute.snapshot.paramMap.get('theme_id') as string;
    this.theme_prop_id = this.activatedRoute.snapshot.paramMap.get('theme_prop_id') as string;
    this.userId = localStorage.getItem("user_id") ??'';
    this.link='http://localhost:4200/topico-edit/'+this.id+'/'+this.theme_id+'/'+this.theme_prop_id
    // this.message = this.data.getMessageById(parseInt(id, 10));
    if(this.id!=="0"){
      let headers = this.getHeader();
      axios
        .get('http://localhost:3000/topics/buscarPorCodigo/'+this.id+'/'+this.theme_id+'/'+this.theme_prop_id, headers)
        .then((result) => {
          console.log(JSON.stringify(result.data));
          if (result.data.success == true) {
            if (this.id !== '0') {
              this.accion = 'Editar Topicos';
            }
            if (result.data.topic != null) {
              this.Topico = result.data.topic;
              this.color=this.Topico.color;
            } else {
              this.Topico = {};
            }
          } else {
            console.log(result.data.error);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }else{
      this.Topico = {};
    }
    this.getPropName()
  }

  
  copytext = async (link:string) =>{
    try {
      await navigator.clipboard.writeText(link)
      this.isCopied = true
      setTimeout(() => {
        this.isCopied = false
      }, 1500)
    } catch (e) {
      console.error('e', e)
    }
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Inbox' : '';
  }

  saveTopic() {
    let fecha = formatDate( Date.now(), 'yyyy-MM-dd hh:mm:ss', 'en-US')
    console.log('topico: ', this.Topico);
    var data = {
      id: this.Topico.id,
      theme_id: this.theme_id,
      theme_prop_id: this.theme_prop_id,
      create_date: fecha,
      name: this.Topico.name,
      priority: this.Topico.priority,
      color: this.Topico.color,
      prc_completed: this.Topico.prc_completed,
      owner_user_id: localStorage.getItem("user_id"),
      comment: this.Topico.comment,
     
    };
    let headers = this.getHeader();
    axios
      .post('http://localhost:3000/topics/update', data, headers)
      .then(async (result) => {
        if (result.data.success == true) {
          this.presentToast('Topico Guardado');
          this.router.navigate(['/topico-list/'+this.theme_id+'/'+this.theme_prop_id]);
        } else {
          this.presentToast(result.data.error);
        }
      })
      .catch(async (error) => {
        this.presentToast(error.message);
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
