import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {environment} from 'environments/environment';
import { BillingWebConstants } from "../../constants/billing-web.const";
import { InvoiceRestResponse } from "../invoice/to/invoice.rest.response";


@Injectable()
export class CompanyInvoiceService {

    private url = environment.baseUrl + BillingWebConstants.V1_API_CONST + 'company/invoice/';

    constructor(private http: HttpClient 
                ) { }
    
    public searchInvoice(dealerToken: String, startDate?: Date, endDate?: Date, status?: String, page?:Number, size?:Number, dateToFilter?:String) {
        var formatedStartDate;
        var formatedEndDate;
        if((startDate !== null) && (endDate !== null)){
            formatedStartDate = startDate.toISOString().substring(0,10);
            formatedEndDate = endDate.toISOString().substring(0,10);
        }
        if(page == null){
            page = 0;
        }
        if(size == null){
            size = 10
        }
        return this.http.get<InvoiceRestResponse>(this.url+'report/?dealer='+dealerToken+'&startDate='+formatedStartDate+'&endDate='+formatedEndDate+'&dateToFilter='+dateToFilter+
            '&status='+status);
    } 

}