import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import {environment} from 'environments/environment';
import { BillingWebConstants } from "../../constants/billing-web.const";
import { DocumentTypeRestResponse } from "./to/document-type.rest.response";

@Injectable()
export class DocumentService {

    private url = environment.baseUrl + BillingWebConstants.V1_API_CONST + 'person';

    constructor(private http: HttpClient ) { }
    
    getDocumentType(personType: String) {
        return this.http.get<DocumentTypeRestResponse>(this.url+'/documentType/'+BillingWebConstants.INITIALS.BRAZIL+'/'+personType);
    } 

    validateDocumentNumber(documentType:String, documentNumber: String){
        return this.http.get<DocumentTypeRestResponse>(this.url+'/documentType/'+
                                        documentType +'/validate/'+documentNumber);
    }
}