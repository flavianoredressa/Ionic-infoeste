import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import swal from 'sweetalert';
@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {


  user = {id: '', nome: '', avatar: '', email: '', senha: ''}


  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider) {


    this.user = JSON.parse(localStorage.getItem('usuario'))
    // this.user = this.user[0];


  }

  ionViewDidLoad() {

  }

  salvar(){
    this.api.salvarUser(this.user).then((res)=>{
      if(res == true){
        swal({ title: "OK", text: "Top da balada", icon: "success" });
      }else{
        swal({ title: "Ops", text: "Algo Errado", icon: "error" });
      }
    }).catch(() =>{
      swal({ title: "Ops", text: "Algo Errado", icon: "error" });
    })
  }

}
