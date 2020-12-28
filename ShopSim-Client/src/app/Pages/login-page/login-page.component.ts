import { Component, Input, OnInit, ɵɵresolveBody } from '@angular/core';
import { LoginService } from 'src/app/Services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  userEmail: string = '';
  userPassword: string = '';
  message: string = '';

  model: any = {}; //this is for remember me functionality

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmitClick() {
    this.loginService.sendLogin(this.userEmail,this.userPassword, this.handleLogin.bind(this));
  }

  handleLogin(b : boolean) {
    if (b) {
      this.message = '<div class="alert alert-success" role="alert"> Correct Credentials! </div>'
      this.router.navigate(['selectStore']);
    } else {
      this.message = '<div class="alert alert-danger" role="alert"> Incorrect Credentials! </div>'
    }   
  }


}
