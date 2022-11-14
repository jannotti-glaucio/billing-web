import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router'
import { Observable } from 'rxjs/Observable';
import { UserRoles } from '../constants/roles.const';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable()
export class DealerAuthGuard implements CanActivate, CanLoad{


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
      if(session.role === UserRoles.dealer){
        return true;
      }
    }
    sessionStorage.clear();
    this.router.navigate(['/login']);
    return false;
  }

  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean{
    return this.verificarAcesso();
  }
}
