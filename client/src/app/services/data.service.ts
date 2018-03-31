import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(public http:Http) {
    console.log('Data Service Connected');
  }
  getMenuList(){
    let headers = new Headers();
    let options = new RequestOptions({headers:headers});
    return this.http.get( 'http://localhost:3000/api/menu/list', options)
    .map(res => res.json());
  }

  getCategoryList(id){
    let headers = new Headers();
    let options = new RequestOptions({headers:headers});
    return this.http.get( 'http://localhost:3000/api/menu/list/'+id, options)
    .map(res => res.json());
  }

  getSong(id){
    let headers = new Headers();
    let options = new RequestOptions({headers:headers});
    return this.http.get( 'http://localhost:3000/api/song/'+id, options)
    .map(res => res.json());
  }
}
