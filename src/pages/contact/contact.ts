import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(
    public app: App,
    public alertCtrl: AlertController,
    public navCtrl: NavController) {

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
}
