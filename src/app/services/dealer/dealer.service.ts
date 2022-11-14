import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import {environment} from 'environments/environment';
import { BillingWebConstants } from "../../constants/billing-web.const";
import { DealerRestResponse } from "./to/dealer.rest.response";
import { DealerRestRequest } from "./to/dealer.rest.request";
import { Dealer } from "../../classes/dealer";
import { BankAccountRestResponse } from "../to/response/bank-account-rest-response";
import { BankAccount } from "../../classes/bank-account";
import { BankAccountRestRequest } from "../to/request/bank-account-rest-request";

@Injectable()
export class DealerService {

    private url = environment.baseUrl + BillingWebConstants.V1_API_CONST;

    constructor(private http: HttpClient ) { }

    public getDealer(token:string) {
        return this.http.get<DealerRestResponse>(this.url +'company/dealer/'+ token);
    } 

    public searchDealer(keyword?: String, page?:Number, size?:Number) {
        if(keyword == null){
            keyword = '';
        }

        if(page == null){
            page = 0;
        }

        if(size == null){
            size = 10
        }

        return this.http.get<DealerRestResponse>(this.url+'company/dealer/?filter='+keyword+'&page='+page+'&size='+size+'&sort=name');        
    }

    public searchDealerNotPagging() {

        return this.http.get<DealerRestResponse>(this.url+'company/dealer/');        
    }

    public findByBillingPlan(billingPlanToken: String, page?:Number, size?:Number) {

        if(page == null){
            page = 0;
        }

        if(size == null){
            size = 10
        }

        return this.http.get<DealerRestResponse>(this.url+'company/dealer/billingPlan/'+billingPlanToken+'?page='+page+'&size='+size+'&sort=name');        
    }

    public insertDealer(dealer: any){
        return this.http.post(this.url + 'company/dealer/', dealer);
    }

    public deleteDealer(token: any){
        return this.http.delete(this.url+'company/dealer/'+token);  
    }

    public updateDealer(dealer: any){
        return this.http.put(this.url+'company/dealer/'+dealer.token, dealer);
    }

    public getBankAccounts(){
        return this.http.get<BankAccountRestResponse>(this.url + 'dealer/current/bankAccounts');
    }

    public parseToRequest(dealer: Dealer){
        var dealerRequest = new DealerRestRequest();

        dealerRequest.addresses = dealer.addresses;
        dealerRequest.comments = dealer.comments;
        dealerRequest.documentNumber = dealer.documentNumber;
        dealerRequest.documentType = dealer.documentType.code;
        dealerRequest.email = dealer.email;
        dealerRequest.mobileNumber = dealer.mobileNumber;
        dealerRequest.name = dealer.name;
        dealerRequest.personType = dealer.personType;
        dealerRequest.phoneNumber = dealer.phoneNumber;
        dealerRequest.status = dealer.status;
        dealerRequest.token = dealer.token;
        dealerRequest.companyBankAccount = dealer.companyBankAccount.token;
        dealerRequest.billingPlan = dealer.billingPlan.token;
        dealerRequest.bankBilletInstructions = dealer.bankBilletInstructions;
        dealerRequest.bankAccounts = [];
        dealer.bankAccounts.forEach(account =>{
            dealerRequest.bankAccounts.push(this.parseBankAccountToRequest(account));
        } )

        dealerRequest.bankBilletExpiredPayment = dealer.bankBilletExpiredPayment;
        dealerRequest.bankBilletPenaltyPercent = dealer.bankBilletPenaltyPercent
        dealerRequest.bankBilletInterestPercent = dealer.bankBilletInterestPercent;
        
        return dealerRequest;
    }

    public parseBankAccountToRequest(bankAccount: BankAccount){

        let accountRequest: BankAccountRestRequest;

        accountRequest = new BankAccountRestRequest();

        accountRequest.token = bankAccount.token;
        accountRequest.description = bankAccount.description;
        accountRequest.bank = bankAccount.bank.code.toString();
        accountRequest.agencyNumber = bankAccount.agencyNumber;
        accountRequest.agencyCheckDigit = bankAccount.agencyCheckDigit;
        accountRequest.accountNumber = bankAccount.accountNumber;
        accountRequest.accountCheckDigit = bankAccount.accountCheckDigit;
        accountRequest.operation = bankAccount.operation;

        return accountRequest;
    }

 
}