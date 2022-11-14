import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BillingWebConstants } from "../../constants/billing-web.const";
import { WithdrawRestResponse } from "../to/response/withdraw.rest.response";
import { WithdrawRestRequest } from "../to/request/withdraw-rest-request";
import { WithdrawFeesRestResponse } from "../to/response/withdraw-fees-rest-response";

@Injectable()
export class DealerWithdrawService {

    private url = environment.baseUrl + BillingWebConstants.V1_API_CONST + 'dealer/market/';

    constructor(private http: HttpClient ) { }
    
    public getWithdrawFees(withdrawRestRequest: WithdrawRestRequest){

        return this.http.put<WithdrawFeesRestResponse>(this.url+'withdraw/fees', withdrawRestRequest)
    }


    public getWithdraws(startDate?: Date, endDate?: Date, page?:Number, size?:Number,) {
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

        return this.http.get<WithdrawRestResponse>(this.url+'withdraw/?startDate='+formatedStartDate+'&endDate='+formatedEndDate+'&page='+page+'&size='+size);
    }

    public getWithdraw(token: String){
        return this.http.get<WithdrawRestResponse>(this.url+'withdraw/'+token);
    }

    public addWithdraw(withdraw : WithdrawRestRequest){
        return this.http.post(this.url+'withdraw/', withdraw);
    }

    public deleteWithdraw(token: String){
        return this.http.delete(this.url+'withdraw/' + token);
    }




    
}