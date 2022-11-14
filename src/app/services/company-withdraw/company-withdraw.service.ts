import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BillingWebConstants } from "../../constants/billing-web.const";
import { WithdrawRestResponse } from "../to/response/withdraw.rest.response";
import { WithdrawRestRequest } from "../to/request/withdraw-rest-request";
import { WithdrawDenyRestRequest } from "../to/request/withdraw-deny-rest-request";

@Injectable()
export class CompanyWithdrawService {

    private url = environment.baseUrl + BillingWebConstants.V1_API_CONST + 'company/dealer/market/';

    constructor(private http: HttpClient ) { }
    
    getWithdraws(startDate: Date, endDate: Date, dealerToken?: String, status?: String, page?:Number, size?:Number) {
        var formatedStartDate;
        var formatedEndDate;
        if((startDate !== null) && (endDate !== null)){
            formatedStartDate = startDate.toISOString().substring(0,10);
            formatedEndDate = endDate.toISOString().substring(0,10);
        }
        if(dealerToken == null){
            dealerToken = '';
        }
        if(status == null){
            status = '';
        }
        if(page == null){
            page = 0;
        }
        if(size == null){
            size = 10
        }

        return this.http.get<WithdrawRestResponse>(this.url+'withdraw/'+
                                                    '?startDate='+formatedStartDate+
                                                    '&endDate='+formatedEndDate+
                                                    '&dealer='+dealerToken+
                                                    '&status='+status+
                                                    '&page='+page+
                                                    '&size='+size);
    }

    getPendingsWithdraws(dealerToken?: String, page?:Number, size?:Number) {
        if(dealerToken == null){
            dealerToken = '';
        }
                
        if(page == null){
            page = 0;
        }
        if(size == null){
            size = 10
        }

        return this.http.get<WithdrawRestResponse>(this.url+'withdraw/pending/'+
                                                    '?dealer='+dealerToken+
                                                    '&page='+page+
                                                    '&size='+size);
    }

    getWithdrawsReport(startDate: Date, endDate: Date, dealerToken?: String, status?: String) {
        var formatedStartDate;
        var formatedEndDate;
        if((startDate !== null) && (endDate !== null)){
            formatedStartDate = startDate.toISOString().substring(0,10);
            formatedEndDate = endDate.toISOString().substring(0,10);
        }
        if(dealerToken == null){
            dealerToken = '';
        }
        if(status == null){
            status = '';
        }
    

        return this.http.get<WithdrawRestResponse>(this.url+'withdraw/'+
                                                    '?startDate='+formatedStartDate+
                                                    '&endDate='+formatedEndDate+
                                                    '&dealer='+dealerToken+
                                                    '&status='+status);
    }
    
    public addWithdraw(withdraw : WithdrawRestRequest){
        return this.http.post(this.url+'withdraw/', withdraw);
    }

    public deleteWithdraw(token: String){
        return this.http.delete(this.url+'withdraw/' + token);
    }

    public denyWithdraw(token: String, withdrawDenyRequest: WithdrawDenyRestRequest){
        return this.http.put(this.url +'withdraw/'+token+'/deny', withdrawDenyRequest);
    }

    public approveWithdraw(token: String, withdraw: WithdrawRestRequest){
        return this.http.put(this.url +'withdraw/'+token+'/approve', withdraw);
    }

    public releaseWithdraw(token: String, withdraw: WithdrawRestRequest){
        return this.http.put(this.url +'withdraw/'+token+'/release', withdraw);
    }



    
}