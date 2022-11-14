import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BillingWebConstants } from "../../constants/billing-web.const";
import { StatementRestResponse } from "../to/response/statement.rest.response";

@Injectable()
export class CompanyStatementService {

    private url = environment.baseUrl + BillingWebConstants.V1_API_CONST + 'company/dealer/market/statement/';

    constructor(private http: HttpClient ) { }
    
    getStatements(dealerToken:String, startDate: String, endDate: String) {        

        return this.http.get<StatementRestResponse>(this.url+dealerToken+'/?startDate='+startDate+'&endDate='+endDate);
    } 

    
}