import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLoggedIn: boolean;
  constructor(
    private authService: AuthService,
    private socketService: SocketService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.loggedIn();
  }

  onLogoutClick() {
    this.authService.logout();
    this.socketService.disconnectSocket();
    this.flashMessage.show('You are logged out', {
      cssClass: 'alert-success', timeout: 3000
    });
    this.router.navigate(['/login']);
    return false;
  }

}
