import { ApiProvider } from './../../providers/api/api';
import { Component, ViewChild } from '@angular/core';
import { NavController, App, Events, ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CameraProvider } from '../../providers/camera/camera';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  @ViewChild('fileInput') fileInput;
  user = {id: '', nome: '', avatar: '', email: '', senha: ''}

  constructor(
    public app: App,
    private events: Events,
    private api: ApiProvider,
    protected actionSheetCtrl: ActionSheetController,
    protected _Camera: CameraProvider,
    public alertCtrl: AlertController,
    public navCtrl: NavController) {

      this.user = JSON.parse(localStorage.getItem('usuario'))
      // this.user = this.user[0];
  }

  trocarAvatar(){
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Selecione',
      buttons: [
        {
          text: 'Camera', handler: () => {
            this._Camera.getPicture('Camera', 400).then((res: any) => {
              this.user.avatar = res;
              this.api.salvarUser(this.user)
            }).catch(() => { this.fileInput.nativeElement.click(); })
          }
        },
        {
          text: 'Galeria', handler: () => {
            this._Camera.getPicture('FotoPerfil', 400).then((res: any) => {
              this.user.avatar = res
              this.api.salvarUser(this.user)
            }).catch(() => { this.fileInput.nativeElement.click(); })
          }
        },
        { text: 'Cancelar', role: 'cancel', handler: () => { } }
      ]
    });
    this.events.publish('Overlay', actionSheet);
    actionSheet.present();
  }
  
  sair(){
    localStorage.clear()
    this.app.getRootNav().setRoot("LoginPage")
  }
  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Atenção',
      message: 'Deseja realmente sair?',
      buttons: [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          handler: () => {
            this.sair()
          }
        }
      ]
    });
    confirm.present();
  }
  processWebImage(event) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = (readerEvent) => {
        let imageData = (readerEvent.target as any).result;
        this._Camera.qualidade(imageData, 400, data => {
          this.user.avatar = data
          this.api.salvarUser(this.user)
          resolve(data)
        })
      };
      if (event.target.files.length > 0)
        reader.readAsDataURL(event.target.files[0]);
    })
  }
  editarProfile(){
    this.app.getRootNav().push("EditProfilePage", null, { animate: true, animation: 'transition', duration: 1000, direction: 'forward' })
  }
}
