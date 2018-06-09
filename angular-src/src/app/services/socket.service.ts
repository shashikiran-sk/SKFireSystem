import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import  *  as io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable()
export class SocketService {
  private socket;

  constructor() { }

  public initSocket(token){
    this.socket = io(environment.URL, {
      // query: 'token=' + data.token
      query:{token:token}
    });
    // this.socket.on('success',(data)=>{
    //   console.log(data.message);
    //   console.log('user info: ' + data.user);
    //   console.log('logged in: ' + data.logged_in)
    // });
  }
  public disconnectSocket(){
    this.socket.disconnect();
    console.log('Disconnected');
  }
  public sendMessage(msg){
    this.socket.emit('Chat Message',msg);
  }   
  public receiveMessage():Observable<any>{
    return new Observable<any>(observer=>{
      this.socket.on('Chat Message',(data)=>observer.next(data));
    })
  }
  public reconnectSocket(){
    this.socket.connect();
  }     
}
