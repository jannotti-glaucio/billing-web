import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router'
import { Observable } from 'rxjs/Observable';
import { UserRoles } from '../constants/roles.const';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable()
export class LoginAuthGuard implements CanActivate, CanLoad{

  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService) { }

  canActivate(
    route:ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | boolean {
    
    return this.verificarAcesso();
  }

  verificarAcesso(){
    if(!this.jwtHelper.isTokenExpired()){
      let session = this.jwtHelper.decodeToken();
      if(session.role == UserRoles.dealer){
        this.router.navigate(['/dealer/billing/invoice-expiration']);
      } else if(session.role == UserRoles.company){
        this.router.navigate(['/company/transfer/requested-transfer']);
      } else if (session.role == UserRoles.admin){
        this.router.navigate(['/admin/dashboard']);
      }
    } else {
      sessionStorage.removeItem('access_token');
      return true;
    }
  }

  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean{
    return this.verificarAcesso();
  }
}
