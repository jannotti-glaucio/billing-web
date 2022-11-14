import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { MessageService } from '../services/message/message.service';
import { UserMessage } from '../classes/user-message';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { LoaderService } from 'app/services/loader/loader.service';
 
@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  private message: UserMessage;
 
  constructor(public messageService: MessageService,
              public jwtHelper: JwtHelperService,
              public router: Router,
              public loaderService: LoaderService) {}
 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if(this.jwtHelper.tokenGetter() != null){
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': this.jwtHelper.tokenGetter()
        }
      });
    }
    
    return next.handle(request).do((event: HttpEvent<any>) => {
      if(event instanceof HttpResponse){
        this.loaderService.endLoader();
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse ) {
        if (err.status === 401) {
          let loginUrl = new RegExp('\/login', 'g');
          if(loginUrl.test(request.url)){
            this.message = new UserMessage('error', 'Falha no Login', 'Usuário ou senha incorretos, tente novamente.');
          
          } else {
            sessionStorage.clear();
            this.router.navigate(['/login']);
            this.message = new UserMessage('error', 'Desconectado', 'Seu token de acesso está expirado. Por favor logue novamente.');
          }
        } else if(err.error.result){
          this.message = new UserMessage('error', 'Falha:', err.error.result.message);
        } else {
          this.message = new UserMessage('error', 'Falha:', 'Ocorreu um erro interno.');
        }
        this.messageService.showMessage(this.message);
      }
      
      this.loaderService.endLoader();
    });
  }
}