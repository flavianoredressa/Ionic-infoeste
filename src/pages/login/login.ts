import { ApiProvider } from './../../providers/api/api';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import swal from 'sweetalert';
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
    public api: ApiProvider,
    public navParams: NavParams) {
  }
  
  login(){
    if(this.user.email == '' || this.user.senha == ''){
      swal({ title: "Atenção", text: "Campos obrigatorios não preenchidos", icon: "warning" });
    }else{
      this.api.login(this.user).then((res:any) =>{
        if(res){
          localStorage.setItem("usuario", JSON.stringify(res));
          this.navCtrl.setRoot(TabsPage, null, { animate: true, animation: 'transition', duration: 1000, direction: 'forward' })
        }
        else{
          swal({ title: "Atenção", text: "Verifique seu login e senha", icon: "error" });
        }
      }).catch(() =>{
        swal({ title: "Atenção", text: "Verifique seu login e senha", icon: "error" });
      })
    }
  }

}
