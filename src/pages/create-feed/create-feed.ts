import { ApiProvider } from './../../providers/api/api';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ActionSheetController } from 'ionic-angular';
import { CameraProvider } from '../../providers/camera/camera';
import swal from 'sweetalert';

@IonicPage()
@Component({
  selector: 'page-create-feed',
  templateUrl: 'create-feed.html',
})
export class CreateFeedPage {
  @ViewChild('fileInput') fileInput;

  feed = {thumbmail:'assets/imgs/img-placeholder.png', descricao:'', data:'', idOwner: ''}

  constructor(
    public navCtrl: NavController, 
    private events: Events,
    protected actionSheetCtrl: ActionSheetController,
    protected _Camera: CameraProvider,
    protected Api: ApiProvider,
    public navParams: NavParams) {
  }

  getImage() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Selecione',
      buttons: [
        {
          text: 'Camera', handler: () => {
            this._Camera.getPicture('Camera', 400).then((res: any) => {
              this.feed.thumbmail = res;
            }).catch(() => { this.fileInput.nativeElement.click(); })
          }
        },
        {
          text: 'Galeria', handler: () => {
            this._Camera.getPicture('FotoPerfil', 400).then((res: any) => {
              this.feed.thumbmail = res
            }).catch(() => { this.fileInput.nativeElement.click(); })
          }
        },
        { text: 'Cancelar', role: 'cancel', handler: () => { } }
      ]
    });
    this.events.publish('Overlay', actionSheet);
    actionSheet.present();
  }
  processWebImage(event) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = (readerEvent) => {
        let imageData = (readerEvent.target as any).result;
        this._Camera.qualidade(imageData, 400, data => {
          this.feed.thumbmail = data
          resolve(data)
        })
      };
      if (event.target.files.length > 0)
        reader.readAsDataURL(event.target.files[0]);
    })
  }
  addFeed(){
    if(this.feed.thumbmail == "assets/imgs/img-placeholder.png" || this.feed.descricao == ''){
      swal({ title: "Atenção", text: "Campos Obrigatorios", icon: "error" });
    }else{
      this.Api.AddFeed(this.feed).then(()=>{
        this.feed.data =''
        this.feed.thumbmail = 'assets/imgs/img-placeholder.png'
        this.feed.descricao = ''
        swal({ title: "OK", text: "Top Top Top", icon: "success" });
      }).catch(() =>{
        swal({ title: "Opss", text: "Algo aconteceu", icon: "error" });
      })
    }
  }
}
