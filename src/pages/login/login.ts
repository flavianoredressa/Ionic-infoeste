import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,  } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //Objeto Usuário
  user = { email: '', senha: ''}


  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController, 
    public navParams: NavParams) {
  }
  
  login(){
    if(this.user.email == '' || this.user.senha == ''){
      const toast = this.toastCtrl.create({
        message: 'Por favor verifique campos obrigatorios',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }else{
      localStorage.setItem("usuario", JSON.stringify(this.user));
      this.navCtrl.setRoot(TabsPage, null, { animate: true, animation: 'transition', duration: 1000, direction: 'forward' })
    }
  }

}
