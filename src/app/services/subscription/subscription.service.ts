import { BillingWebConstants } from '../../constants/billing-web.const';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { SubscriptionRestRequest } from './to/subscription-rest-request';
import { SubscriptionRestResponse } from './to/subscription-rest-response';

@Injectable()
export class SubscriptionService {

    private url = environment.baseUrl + BillingWebConstants.V1_API_CONST + 'dealer/subscription/';

    constructor(private http: HttpClient)
    { 

    }

    public searchSubscription(startDate?: Date, endDate?: Date, status?: String, keyword?: String, page?:Number, size?:Number, dateToFilter?:String) {
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
        return this.http.get<SubscriptionRestResponse>(this.url+'?startDate='+formatedStartDate+'&endDate='+formatedEndDate+
            '&dateToFilter='+dateToFilter+'&status='+status+'&filter='+keyword+'&page='+page+'&size='+size);
    } 

    public searchSubscriptionReport(startDate?: Date, endDate?: Date, status?: String, keyword?: String, dateToFilter?:String) {
        var formatedStartDate;
        var formatedEndDate;
        if((startDate !== null) && (endDate !== null)){
            formatedStartDate = startDate.toISOString().substring(0,10);
            formatedEndDate = endDate.toISOString().substring(0,10);
        }
        return this.http.get<SubscriptionRestResponse>(this.url+'report/?startDate='+formatedStartDate+'&endDate='+formatedEndDate+
            '&dateToFilter='+dateToFilter+'&status='+status+'&filter='+keyword);
    }

    public insertSubscription(subscriptionRestRequest: SubscriptionRestRequest){
        return this.http.post<SubscriptionRestRequest>(this.url, subscriptionRestRequest);
    }

    public getSubscription(subscriptionToken: String) {
        return this.http.get<SubscriptionRestResponse>(this.url+subscriptionToken);        
    }

    public cancelSubscription(token: String) {
        return this.http.delete(this.url+token);
    }

    public updateSubscription(subscriptionRestRequest: SubscriptionRestRequest, token: String){
        return this.http.put(this.url+token, subscriptionRestRequest);
    }

    public suspendSubscription(token: String){
        return this.http.put(this.url+token+'/suspend', null);
    }

    public reopenSubscription(token: String){
        return this.http.put(this.url+token+'/reopen', null);
    }

}