import { Component, ViewChild, Renderer, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { UserMessage } from '../../../classes/user-message';
import { MessageService } from '../../../services/message/message.service';
import { Router } from '@angular/router';
import { LoaderService } from 'app/services/loader/loader.service';

@Component({
  templateUrl: 'change-password.component.html',
  styleUrls: [
    '../../../../../node_modules/ladda/dist/ladda-themeless.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ChangePasswordComponent {

  private message;
  public currentPassword;
  public newPassword;
  public newPasswordConfirmation;



  @ViewChild('inputNewPassword') inputNewPassword: ElementRef;
  @ViewChild('inputNewPasswordConfirmation') inputNewPasswordConfirmation: ElementRef;

  constructor(private userService: UserService,
              private messageService: MessageService,
              private router: Router,
              private renderer: Renderer,
              public loaderService: LoaderService) { }

  public onSubmit(changePasswordForm: FormGroup){
    if(this.newPassword == this.newPasswordConfirmation){
      if(changePasswordForm.valid){
        this.loaderService.startLoader('changeCompanyPasswordButton');
        this.renderer.setElementClass(this.inputNewPassword.nativeElement, 'ng-invalid', false);
        this.renderer.setElementClass(this.inputNewPasswordConfirmation.nativeElement, 'ng-invalid', false);

        this.userService.changePassword(this.currentPassword, this.newPassword).subscribe(response => {
          if(response.result.code === '000'){
            this.message = new UserMessage('success', 'Sucesso', 'Senha alterada com sucesso');
            this.router.navigate(['/dealer/billing/invoice']);
          } else {
            this.message = new UserMessage('error', 'Falha', response.result.message);
          }
          this.messageService.showMessage(this.message);
        });
      }
    } else {
      this.inputNewPassword.nativeElement.setCustomValidity('Erro');
      this.inputNewPasswordConfirmation.nativeElement.setCustomValidity('Erro');
      this.renderer.setElementClass(this.inputNewPassword.nativeElement, 'ng-invalid', true);
      this.renderer.setElementClass(this.inputNewPassword.nativeElement, 'ng-touched', true);
      this.renderer.setElementClass(this.inputNewPasswordConfirmation.nativeElement, 'ng-invalid', true);
      this.renderer.setElementClass(this.inputNewPasswordConfirmation.nativeElement, 'ng-touched', true);
      this.message = new UserMessage('error', 'Falha', 'As senhas não conferem!');
      this.messageService.showMessage(this.message);
    }

       
    

  }
  

}
