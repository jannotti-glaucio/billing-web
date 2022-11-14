import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserRoles } from '../constants/roles.const';
import { LoginService } from './login/login.service';
import { UserService } from './user/user.service';

@Injectable()
export class AuthService {

  private token: any;

  constructor(private router: Router, 
              private jwtHelper: JwtHelperService,
              private loginService: LoginService,
              private userService: UserService) {    
  }

  logar(userLogin){

    this.loginService.login(userLogin).subscribe(response => {
      
      sessionStorage.setItem('access_token', response.headers.get('Authorization'));
      
      
      this.token = this.jwtHelper.decodeToken(response.headers.get('Authorization'));
      
      this.userService.getUserConfig().subscribe(response => {
        sessionStorage.setItem('userName', response.user.realName.toString());
        if(response.user.role.code == UserRoles.dealer){
          sessionStorage.setItem('dealerName', response.user.dealer.name.toString());
          
        } else if(response.user.role.code == UserRoles.company){
          sessionStorage.setItem('companyName', response.user.company.tradingName.toString());
        }
        
        if(this.token){
          if(this.token.role === UserRoles.dealer){
            this.router.navigate(['/dealer/billing/invoice-expiration']);
          } else if(this.token.role === UserRoles.company ){
            this.router.navigate(['/company/transfer/requested-transfer']);
          } else if(this.token.role === UserRoles.admin){
            this.router.navigate(['/admin/dashboard']);
          }
          location.reload();
        }
      });
    });
    
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
