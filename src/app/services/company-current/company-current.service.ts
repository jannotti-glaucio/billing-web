import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BillingWebConstants } from "../../constants/billing-web.const";
import { BankAccountRestResponse } from "../to/response/bank-account-rest-response";

@Injectable()
export class CompanyCurrentService {

    private url = environment.baseUrl + BillingWebConstants.V1_API_CONST + 'company/current/';

    constructor(private http: HttpClient ) { }
    
    getCurrentBankAccounts() {
        
        return this.http.get<BankAccountRestResponse>(this.url + 'bankAccounts');
    }
    
}