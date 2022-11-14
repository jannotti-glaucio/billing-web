import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { BillingWebConstants } from "app/constants/billing-web.const";
import { InvoiceAlertRestResponse } from "./to/invoice-alert-rest-response";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class AlertService {

    private url = environment.baseUrl + BillingWebConstants.V1_API_CONST + 'dealer/invoice/';

    constructor(private http: HttpClient ) { }


    public getInvoiceAlerts(invoiceToken: String){
        return this.http.get<InvoiceAlertRestResponse>(this.url + invoiceToken + '/alerts')

    }

}
