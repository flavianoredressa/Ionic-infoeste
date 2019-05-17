import { AboutPage } from './../about/about';
import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  feeds = [];
  i = 1
  constructor(
    public navCtrl: NavController,
    public app : App
    ) {
    this.getFeeds(null)
  }
  getFeeds(infiniteScroll){
    if(this.feeds.length < 49){
      for (let index = 0; index < 10; index++) {
        this.feeds.push(
          {thumbmail:'https://via.placeholder.com/400x300', 
          descricao:'Lorem ipsum dolor sit amet, consectetur', 
          data: (index + 1) +  '/05/2019'})
      }
      console.log("Passou" + this.i)
      this.i++;
    }

    if(infiniteScroll){
      infiniteScroll.complete();
    }
  }
  addFeed(){
    this.app.getRootNav().push(AboutPage, null, { animate: true, animation: 'transition', duration: 1000, direction: 'forward' })
  }
}
