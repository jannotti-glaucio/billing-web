import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BillingWebConstants } from "../../constants/billing-web.const";
import { CompanyBillingPlanRestResponse } from "./to/company-billing-plan-rest-response";
import { CompanyBillingPlanRestRequest } from "./to/company-billing-plan-rest-request";
import { CompanyBillingPlan } from "app/classes/company-billing-plan";

@Injectable()
export class CompanyBillingPlanService {

    private url = environment.baseUrl + BillingWebConstants.V1_API_CONST + 'company/billingPlan/';

    constructor(private http: HttpClient ) { }
    
    public find() {
       return this.http.get<CompanyBillingPlanRestResponse>(this.url)
    }

    public get(token: String){
        return this.http.get<CompanyBillingPlanRestResponse>(this.url+token);
    }

    public add(billingPlan : CompanyBillingPlanRestRequest){
        return this.http.post(this.url, billingPlan);
    }

    public update(token: String, billingPlan: CompanyBillingPlanRestRequest){
        return this.http.put(this.url+token, billingPlan)
    }

    public delete(token: String){
        return this.http.delete(this.url + token);
    }

    

    public parseBillingPlanToRequest(billingPlan: CompanyBillingPlan){
        let companyBillingPlanRestRequest = new CompanyBillingPlanRestRequest();

        companyBillingPlanRestRequest.description = billingPlan.description;
        companyBillingPlanRestRequest.marketWithdrawFee =  billingPlan.marketWithdrawFee;
        companyBillingPlanRestRequest.paidBankBilletFee = billingPlan.paidBankBilletFee;

        return companyBillingPlanRestRequest;
    }




    
}