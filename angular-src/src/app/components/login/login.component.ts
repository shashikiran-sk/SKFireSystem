import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { SocketService } from '../../services/socket.service';


interface User<T> {
  username: T;
  password: T;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private authService: AuthService,
    private validateService:ValidateService,
    private socketService:SocketService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user: User<string> = {
      username: this.username,
      password: this.password
    }

    // Required Fields
    if(!this.validateService.validateLogin(user)) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    this.authService.authenticateUser(user).subscribe(data => {
        if(data.success) {
          this.authService.storeUserData(data.token, data.user);
          // this.socketService.initSocket(data);
          this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000});
          this.router.navigate(['dashboard']);
        } else {
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
          this.router.navigate(['login']);
        }
    });
  }


  onGoogleLogin(){
    this.authService.googlelogin().subscribe(data => {
      if(data.success) {
        // this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['dashboard']);
      }
      else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        // this.router.navigate(['/users/login']);
      }
    });
  }
}