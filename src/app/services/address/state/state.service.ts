import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { BillingWebConstants } from "../../../constants/billing-web.const";
import { HttpClient } from "@angular/common/http";
import { StateRestResponse } from "./to/state.rest.response";

@Injectable()
export class StateService {

    private url = environment.baseUrl + BillingWebConstants.V1_API_CONST + 'address';

    constructor(private http: HttpClient ) { }
    
    getStates() {
        return this.http.get<StateRestResponse>(this.url +'/state/' + BillingWebConstants.INITIALS.BRAZIL).map(res => res);
    } 

}