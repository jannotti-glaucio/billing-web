import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserLogin } from '../../classes/user-login';
import { LoaderService } from 'app/services/loader/loader.service';


@Component({
  templateUrl: 'login.component.html',
  styleUrls: [
    '../../../../node_modules/ladda/dist/ladda-themeless.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  public userLogin: UserLogin = new UserLogin();
  public isLoading = false;

  constructor(private authService: AuthService,
              public loaderService: LoaderService
              ) {
              }


  logar() {
 
    this.authService.logar(this.userLogin);
  }


}
