import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class TodoService {


  constructor(
    private http:Http,
    private authservice:AuthService) { }

  addOneTodo(todo){
    let headers = new Headers();
    this.authservice.loadToken();
    headers.append('Authorization', 'JWT ' + this.authservice.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.URL+'/todos/add',todo,{headers:headers})
      .map(res=>res.json());
  }

  getTodos(){
    let headers = new Headers();
    this.authservice.loadToken();
    headers.append('Authorization', 'JWT ' + this.authservice.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.URL+'/todos/get',{headers:headers})
      .map(res=>res.json());
  }

  deleteTodo(id){
    let headers = new Headers();
    this.authservice.loadToken();
    headers.append('Authorization', 'JWT ' + this.authservice.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.URL+'/todos/delete',id,{headers:headers})
      .map(res=>res.json());
  }
}
