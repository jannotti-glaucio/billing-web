import { UserRoles } from './../../constants/roles.const';
import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent{ 
  
  public userName;
  public dealerName;
  public companyName;
  public role;
  public userRoles = UserRoles;

  constructor(private authService: AuthService,
              private jwtHelper: JwtHelperService
            ) { 
      this.dealerName = sessionStorage.getItem('dealerName');
      this.userName = sessionStorage.getItem('userName');
      this.companyName = sessionStorage.getItem('companyName');

      let token = this.jwtHelper.decodeToken(sessionStorage.getItem('access_token'));
      
      if(token.role == this.userRoles.dealer){
        this.role = 'dealer';
      } else if (token.role == this.userRoles.company){
        this.role = 'company';
      }
  }
  
 

  logout(){
    this.authService.logout();
  }

}
