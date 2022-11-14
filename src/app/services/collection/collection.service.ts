import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { BillingWebConstants } from "../../constants/billing-web.const";
import { HttpClient } from '@angular/common/http';
import { CollectionRestResponse } from "../collection/to/collection.rest.response";
import { CollectionRestRequest } from "./to/collection.rest.request";
import { CollectionInstalmentsRestResponse } from "./to/collection-instalments.rest.response";


@Injectable()
export class CollectionService {

    private url = environment.baseUrl + BillingWebConstants.V1_API_CONST + 'dealer/collection/';

    constructor(private http: HttpClient 
                ) { }

    public searchCollection(startDate?: Date, endDate?: Date, status?: String, keyword?: String, page?:Number, size?:Number, dateToFilter?:String) {
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
        return this.http.get<CollectionRestResponse>(this.url+'?startDate='+formatedStartDate+'&endDate='+formatedEndDate+
            '&dateToFilter='+dateToFilter+'&status='+status+'&filter='+keyword+'&page='+page+'&size='+size);
    } 

    public searchCollectionReport(startDate?: Date, endDate?: Date, status?: String, keyword?: String, dateToFilter?:String) {
        var formatedStartDate;
        var formatedEndDate;
        if((startDate !== null) && (endDate !== null)){
            formatedStartDate = startDate.toISOString().substring(0,10);
            formatedEndDate = endDate.toISOString().substring(0,10);
        }

        return this.http.get<CollectionRestResponse>(this.url+'report/?startDate='+formatedStartDate+'&endDate='+formatedEndDate+
            '&dateToFilter='+dateToFilter+'&status='+status+'&filter='+keyword);
    } 

    public getCollection(collectionToken: String) {
        return this.http.get<CollectionRestResponse>(this.url+collectionToken);        
    }

    public cancelCollection(token: String) {
        return this.http.delete(this.url+token);
    }

    public insertCollection(collectionRestRequest: CollectionRestRequest){
        return this.http.post<CollectionRestResponse>(this.url, collectionRestRequest);
    }

    public getInstalments(collectionRestRequest: CollectionRestRequest){
        return this.http.put<CollectionInstalmentsRestResponse>(this.url+'instalments', collectionRestRequest);
    }
}