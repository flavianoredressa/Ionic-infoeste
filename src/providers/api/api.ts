import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {} 
  getMeusFeeds(){
    return new Promise ((resolve, reject) =>{
      this.http.get("https://5cdc5827069eb30014202d28.mockapi.io/infoeste/feed").toPromise()
      .then((res:any)=>{
        resolve(res)
      }).catch(() => {
        reject()
      })
    })
  }
  getFeeds(){
    return new Promise ((resolve, reject) =>{
      this.http.get("https://newsapi.org/v2/top-headlines?country=br&category=technology&apiKey=59f57a2b05034632aa4038428afe2b26").toPromise()
      .then((res:any)=>{
        resolve(res.articles)
      }).catch(() => {
        reject()
      })
    })
  }
  AddFeed(feed){
    return new Promise ((resolve, reject) =>{
      this.http.post("https://5cdc5827069eb30014202d28.mockapi.io/infoeste/feed/", feed).toPromise()
      .then((res:any)=>{
        resolve()
      }).catch(() => {
        reject()
      })
    })
  }
  login(usuario){
    return new Promise ((resolve, reject) =>{
      this.http.get("https://5cdc5827069eb30014202d28.mockapi.io/infoeste/usuario?search="+ usuario.email ).toPromise()
      .then((res:any)=>{
        if(usuario.email == res[0].email && usuario.senha == res[0].senha){
          resolve(res)
        }
        else{
          resolve(null)
        }
      }).catch(() => {
        reject()
      })
    })
  }
}
