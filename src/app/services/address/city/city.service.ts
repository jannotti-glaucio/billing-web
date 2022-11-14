import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { BillingWebConstants } from "../../../constants/billing-web.const";
import { HttpClient } from "@angular/common/http";
import { CityRestResponse } from "./to/city.rest.response";

@Injectable()
export class CityService {

    private url = environment.baseUrl + BillingWebConstants.V1_API_CONST + 'address';

    constructor(private http: HttpClient ) { }
    
    getCities(state: String) {
        return this.http.get<CityRestResponse>(this.url+'/city/'+BillingWebConstants.INITIALS.BRAZIL+'/'+state).map(res => res);
    } 

}