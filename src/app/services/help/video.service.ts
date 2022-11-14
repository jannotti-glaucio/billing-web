import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {environment} from 'environments/environment';
import { BillingWebConstants } from "../../constants/billing-web.const";
import { VideoRestResponse } from "../to/response/video-rest-response";

@Injectable()
export class VideoService {
    
    private url = environment.baseUrl + BillingWebConstants.V1_API_CONST + 'help/';

    constructor(private http: HttpClient 
                ) { }

    
        public getVideo(){
            return this.http.get<VideoRestResponse>(this.url+'video/');
        }
   
}