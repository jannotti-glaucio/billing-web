import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import { CustomerRestResponse } from "./to/customer.rest.response";
import {environment} from 'environments/environment';
import { BillingWebConstants } from "../../constants/billing-web.const";
import { Customer } from "../../classes/customer";
import { CustomerRestRequest } from "./to/customer.rest.request";

@Injectable()
export class CustomerService {

    private url = environment.baseUrl + BillingWebConstants.V1_API_CONST + 'dealer/customer';

    constructor(private http: HttpClient ) { }
    
    getCustomer(token:string) {
        return this.http.get<CustomerRestResponse>(this.url +'/'+ token).map(res => res);
    } 

    searchCustomer(keyword?: String, page?:Number, size?:Number) {
        if(keyword == null){
            keyword = '';
        }

        if(page == null){
            page = 0;
        }

        if(size == null){
            size = 10
        }

        return this.http.get<CustomerRestResponse>(this.url+'/?filter='+keyword+'&page='+page+'&size='+size+'&sort=name').map(res => res);        
    } 

    insertCustomer(customer: any){
        return this.http.post(this.url, customer);
    }

    deleteCustomer(token: any){
        return this.http.delete(this.url+'/'+token);  
    }

    updateCustomer(customer:any){
        return this.http.put(this.url+'/'+customer.token, customer);
    }

    parseToRequest(customer: Customer){
        var customerRequest = new CustomerRestRequest();

        customerRequest.addresses = customer.addresses;
        customerRequest.comments = customer.comments;
        customerRequest.documentNumber = customer.documentNumber;
        customerRequest.documentType = customer.documentType.code;
        customerRequest.email = customer.email;
        customerRequest.mobileNumber = customer.mobileNumber;
        customerRequest.name = customer.name;
        customerRequest.personType = customer.personType;
        customerRequest.phoneNumber = customer.phoneNumber;
        customerRequest.status = customer.status;
        customerRequest.token = customer.token;
        customerRequest.id = customer.id;

        return customerRequest;
    }
}