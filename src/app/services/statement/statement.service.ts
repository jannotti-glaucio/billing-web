import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BillingWebConstants } from "../../constants/billing-web.const";
import { StatementRestResponse } from "../to/response/statement.rest.response";

@Injectable()
export class StatementService {

    private url = environment.baseUrl + BillingWebConstants.V1_API_CONST + 'dealer/market/statement/';

    constructor(private http: HttpClient ) { }
    
    getStatements(startDate?: Date, endDate?: Date) {
        var formatedStartDate;
        var formatedEndDate;
        if((startDate !== null) && (endDate !== null)){
            formatedStartDate = startDate.toISOString().substring(0,10);
            formatedEndDate = endDate.toISOString().substring(0,10);
        }
        

        return this.http.get<StatementRestResponse>(this.url+'?startDate='+formatedStartDate+'&endDate='+formatedEndDate);
    } 

    
}