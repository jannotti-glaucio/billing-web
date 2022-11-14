import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { BillingWebConstants } from "../../constants/billing-web.const";
import { HttpClient } from "@angular/common/http";
import { BankRestResponse } from "../to/response/bank-rest-response";

@Injectable()
export class BankService {

    private url = environment.baseUrl + BillingWebConstants.V1_API_CONST + 'banking/bank';

    constructor(private http: HttpClient 
                ) { }

    public findBanks(){
        return this.http.get<BankRestResponse>(this.url);
    }

}