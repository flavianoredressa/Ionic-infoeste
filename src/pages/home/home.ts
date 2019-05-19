import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  feeds = [];

  constructor(
    public navCtrl: NavController,
    public app : App,
    public Api: ApiProvider,
    ) {
    this.getFeeds()
    
  }
  getFeeds(){
    this.feeds = [];
    this.Api.getMeusFeeds().then((res:any) =>{
      res.forEach(element => {
        let fedd = {thumbmail: element.thumbmail, descricao: element.descricao, data: element.data}
        this.feeds.push(fedd)
      });
      this.feeds.reverse();
    })
  }
  getModeFedd(infiniteScroll){
    this.Api.getFeeds().then((res:any)=>{
      res.forEach(element => {
        let fedd = {thumbmail: element.urlToImage, descricao: element.content, data: element.publishedAt}
        this.feeds.push(fedd)
      });
    })
    infiniteScroll.complete();
  }
  addFeed(){
    this.app.getRootNav().push("CreateFeedPage", null, { animate: true, animation: 'transition', duration: 1000, direction: 'forward' })
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.getFeeds();
      refresher.complete();
    }, 2000);
  }



}
