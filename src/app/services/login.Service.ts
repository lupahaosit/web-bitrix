import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginModel} from "../models/Login.model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    constructor(private http: HttpClient) { }
  public login(loginModel: LoginModel) {
      return this.http.post("http://192.168.1.60/api/AuthApi/login/", loginModel);
  }
}
