import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {environment} from 'environments/environment';
import { BillingWebConstants } from "../../constants/billing-web.const";
import { InvoiceRestResponse } from "./to/invoice.rest.response";
import { InvoiceFeesRestResponse } from "./to/invoice-fees.rest.response";
import { InvoiceRestRequest } from "./to/invoice.rest.request";


@Injectable()
export class InvoiceService {

    private url = environment.baseUrl + BillingWebConstants.V1_API_CONST + 'dealer/invoice/';

    constructor(private http: HttpClient 
                ) { }

    public searchInvoice(startDate?: Date, endDate?: Date, status?: String, keyword?: String, page?:Number, size?:Number, dateToFilter?:String) {
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
        return this.http.get<InvoiceRestResponse>(this.url+'?startDate='+formatedStartDate+'&endDate='+formatedEndDate+'&dateToFilter='+dateToFilter+
            '&status='+status+'&filter='+keyword+'&page='+page+'&size='+size+'&sort=expirationDate');
    }

    public searchInvoiceToReport(startDate?: Date, endDate?: Date, status?: String, keyword?: String, dateToFilter?:String) {
        var formatedStartDate;
        var formatedEndDate;
        if((startDate !== null) && (endDate !== null)){
            formatedStartDate = startDate.toISOString().substring(0,10);
            formatedEndDate = endDate.toISOString().substring(0,10);
        }
        return this.http.get<InvoiceRestResponse>(this.url+'report/?startDate='+formatedStartDate+'&endDate='+formatedEndDate+'&dateToFilter='+dateToFilter+
            '&status='+status+'&filter='+keyword);
    }

    public getInvoiceFees(invoiceRestRequest: InvoiceRestRequest){
        return this.http.put<InvoiceFeesRestResponse>(this.url+'fees', invoiceRestRequest);
    }

    public getInvoice(invoiceToken: String) {
        return this.http.get<InvoiceRestResponse>(this.url+invoiceToken);        
    }

    public cancelInvoice(token: String) {
        return this.http.delete(this.url+token);
    }

    public insertInvoice(invoiceRestRequest: any){
        return this.http.post<InvoiceRestResponse>(this.url, invoiceRestRequest);
    }

    public updateInvoice(invoice: any, token: String){
        return this.http.put<InvoiceRestResponse>(this.url+token, invoice);
    }

    public sendInvoice(token: String){
        return this.http.put(this.url+token+'/send/email', null);
    }

    public printInvoice(token: String){
        return this.http.get(this.url+token+'/bankbillet', {responseType: 'blob', observe: 'response'});
    }

    public getExpiredInvoices(keyword?: String, page?:Number, size?:Number) {
        if(page == null){
            page = 0;
        }
        if(size == null){
            size = 10
        }
        return this.http.get<InvoiceRestResponse>(this.url+'expired/?filter='+keyword+'&page='+page+'&size='+size+'&sort=expirationDate');
    } 

    public getExpiringInvoices(keyword?: String, page?:Number, size?:Number) {
        var currentDate = new Date().toISOString().substring(0,10);
        
        if(page == null){
            page = 0;
        }
        if(size == null){
            size = 10
        }
        return this.http.get<InvoiceRestResponse>(this.url+'expiring/?currentDate='+currentDate+'&filter='+keyword+'&page='+page+'&size='+size+'&sort=expirationDate');
    } 

}