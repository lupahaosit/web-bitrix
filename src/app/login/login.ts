import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../services/login.Service";
import {LoginModel} from "../models/Login.model";
import {Router} from "@angular/router";
import {routes} from "../app.routes";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
    constructor(private http: HttpClient, private loginService: LoginService, private router: Router) { }

    username: string = "";
    password: string = "";
    isError: boolean = false;


    public login() {
        const loginModel = new LoginModel(this.username, this.password);
        this.loginService.login(loginModel).subscribe({
            next: (result) =>{
                this.isError = false;
                this.router.navigate(['/lections'])
            },
            error: (result) => {
                this.isError = true
                this.router.navigate(['/login'])
            }
        })
    }
}
