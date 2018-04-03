import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject }    from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class DataService {
  //pageTitle: string = "Bappa Music";
  private pageTitle = Observable.of("Bappa Music");

  constructor(public http:Http) {
    console.log('Data Service Connected');
  }

  getPageTitle(): Observable<any[]> {
    return this.pageTitle;
  }
  getMenuList(){
    let headers = new Headers();
    let options = new RequestOptions({headers:headers});
    //return this.http.get( 'http://localhost:3000/api/menu/list', options)
    return this.http.get( 'https://bappamusic.herokuapp.com/api/menu/list', options)
    .map(res => res.json());
  }

  getCategoryList(id){
    let headers = new Headers();
    let options = new RequestOptions({headers:headers});
    //return this.http.get( 'http://localhost:3000/api/menu/list/'+id, options)
    return this.http.get( 'https://bappamusic.herokuapp.com/api/menu/list/'+id, options)
    .map(res => res.json());
  }

  getSong(id){
    let headers = new Headers();
    let options = new RequestOptions({headers:headers});
    return this.http.get( 'http://localhost:5000/api/song/'+id, options)
    //return this.http.get( 'https://bappamusic.herokuapp.com/api/song/'+id, options)
    .map(res => res.json());
  }

  setPageTitle(title:string){
    this.pageTitle = title;
    console.log("Service Set title: "+this.pageTitle);
  }

  getAudio(id){
    let headers = new Headers();
    let options = new RequestOptions({headers:headers});
    return this.http.get( 'http://localhost:5000/api/aarti/'+id+'/audio', options);
  }

}
