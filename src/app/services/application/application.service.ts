import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { BillingWebConstants } from "../../constants/billing-web.const";
import { HttpClient } from "@angular/common/http";
import { ApplicationRestResponse } from "./to/application-rest-response";
import { ApplicationRestRequest } from "./to/application-rest-request";
import { Application } from "app/classes/application";

@Injectable()
export class ApplicationService {

    private url = environment.baseUrl + BillingWebConstants.V1_API_CONST + 'dealer/application/';

    constructor(private http: HttpClient 
                ) { }

    public findApplications(){
        return this.http.get<ApplicationRestResponse>(this.url);
    }

    public getApplication(applicationToken: String){
        return this.http.get<ApplicationRestResponse>(this.url+applicationToken);
    }

    public generateApplicationSecret(applicationToken: String){
        return this.http.put<ApplicationRestResponse>(this.url+applicationToken+'/generateSecret', null);
    }

    public addApplication(applicationRestRequest: ApplicationRestRequest){
        return this.http.post<ApplicationRestResponse>(this.url, applicationRestRequest);
    }

    public deleteApplication(applicationToken: String){
        return this.http.delete(this.url + applicationToken);
    }

    public updateApplication(applicationToken: String, applicationRestRequest: ApplicationRestRequest){
        return this.http.put(this.url+applicationToken, applicationRestRequest)
    }

    public parseToRequest(application: Application){
        let applicationRestRequest = new ApplicationRestRequest();

        applicationRestRequest.name = application.name;

        return applicationRestRequest;
    }

}