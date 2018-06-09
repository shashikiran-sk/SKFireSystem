import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private messages:any[]=[];
  private message;

  constructor(
    private socketService:SocketService,
    private authService:AuthService) {
    
   }

  ngOnInit() {
    this.socketService.initSocket(this.authService.getToken()); 
    this.socketService.receiveMessage().subscribe(msg=>{
      this.messages.push(msg);
    })
  }

  sendMsg(){
    this.socketService.sendMessage(this.message);
  }
}
