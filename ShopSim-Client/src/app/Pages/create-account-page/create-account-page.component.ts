import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateAccountService} from 'src/app/Services/create-account.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-create-account-page',
  templateUrl: './create-account-page.component.html',
  styleUrls: ['./create-account-page.component.css']
})
export class CreateAccountPageComponent implements OnInit {
  createUserEmail: string = '';
  createPassword: string = '';
  createFirstName: string = '';
  createLastName: string = '';
  createStreetAddress: string = '';
  createZipcode: string = '';
  
  message: string = '';

  constructor(private createAccountService: CreateAccountService, private loginService : LoginService, private router : Router) { }

  ngOnInit(): void {
  }

  onSubmitClick() {
    this.createAccountService.sendCreate(this.createFirstName,this.createLastName,this.createUserEmail,this.createPassword,this.createStreetAddress,this.createZipcode, this.handleAccountCreation.bind(this));
  }

  handleAccountCreation(b : Boolean) : void {

    if (b) {
      this.message = '<div class="alert alert-success" role="alert"> Account Created! Logging in...</div>'
      this.loginService.sendLogin(this.createUserEmail, this.createPassword, this.handleLogin.bind(this));
    } else {
      this.message = '<div class="alert alert-danger" role="alert"> Could not create account. Try again later!</div>'
    }

  }

  handleLogin(b : Boolean){
    if (b) {
       this.router.navigate(['/selectStore']);
    } else {
      this.message = '<div class="alert alert-danger" role="alert"> Account created but couldn\'t log in.</div>'
    }
  }



}
