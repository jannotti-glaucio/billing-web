import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BillingWebConstants } from "../../constants/billing-web.const";
import { User } from "../../classes/user";
import { DealerUserRestRequest } from "./to/dealer-user-rest-request";
import { DealerUserRestResponse } from "./to/dealer-user-rest-response";

@Injectable()
export class CompanyUserService {

    private url = environment.baseUrl + BillingWebConstants.V1_API_CONST + 'company/dealer/user/';

    constructor(private http: HttpClient ) { }
    
    public searchDealerUsers(dealerToken: String) {
       return this.http.get<DealerUserRestResponse>(this.url+'?dealer='+dealerToken)
    }

    public addDealerUsers(dealerUser : DealerUserRestRequest){
        return this.http.post(this.url, dealerUser);
    }

    public updateDealerUser(userRequest: DealerUserRestRequest){
        return this.http.put(this.url+userRequest.token, userRequest)
    }

    public deleteDealerUser(userToken: String){
        return this.http.delete(this.url + userToken);
    }

    public getDealerUser(userToken: String){
        return this.http.get<DealerUserRestResponse>(this.url+userToken);
    }

    public blockDealerUser(userToken: String){
        return this.http.put(this.url+userToken+'/block', null);
    }

    public unBlockDealerUser(userToken: String){
        return this.http.put(this.url+userToken+'/unblock', null);
    }

    public updateDealerUserPassword(userToken: String, userRequest: DealerUserRestRequest){
        return this.http.put(this.url+userToken+'/password', userRequest);
    }

    public parseUserToRequest(user: User){
        let userRequest = new DealerUserRestRequest();

        userRequest.token = user.token;
        userRequest.userName = user.username;
        userRequest.email = user.email;
        userRequest.realName =  user.realName;
        userRequest.dealer = user.dealer;

        return userRequest;
    }




    
}