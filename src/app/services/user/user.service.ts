import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {environment} from 'environments/environment';
import { BillingWebConstants } from "../../constants/billing-web.const";
import { UserRestResponse } from "./to/user-rest-response";
import { UserChangePasswordRestRequest } from "./to/user-change-password-rest-request";



@Injectable()
export class UserService {
    
    private url = environment.baseUrl + BillingWebConstants.V1_API_CONST + 'user/';

    constructor(private http: HttpClient 
                ) { }

    public changePassword(currentPassword: String, newPassword: String) {
        let userRestRequest = new UserChangePasswordRestRequest();
        userRestRequest.currentPassword = currentPassword;
        userRestRequest.newPassword = newPassword;

        return this.http.put<UserRestResponse>(this.url+'password', userRestRequest);
    } 

    public getUserConfig(){
        return this.http.get<UserRestResponse>(this.url+'current');
    }
}