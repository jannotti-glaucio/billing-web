import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from 'environments/environment';
import { UserLogin } from "../../classes/user-login";
import { Observable } from "rxjs";


@Injectable()
export class LoginService {

    private url = environment.baseUrl;

    constructor(private http: HttpClient ) { }
    
    public login(user: UserLogin): Observable<HttpResponse<any>> {
        return this.http.post(this.url+'login', user, { observe: 'response' });
    }


}