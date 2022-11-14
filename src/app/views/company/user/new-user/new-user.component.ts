import { Component, OnInit, ViewChild, ElementRef, Renderer, ViewEncapsulation } from '@angular/core';
import { MessageService } from '../../../../services/message/message.service';
import { LocaleService } from '../../../../services/message/locale.service';
import { UserMessage } from '../../../../classes/user-message';
import { Router } from '@angular/router';
import { CompanyCurrentService } from '../../../../services/company-current/company-current.service';
import { DealerUserRestRequest } from '../../../../services/company-user/to/dealer-user-rest-request';
import { DealerService } from '../../../../services/dealer/dealer.service';
import { CompanyUserService } from '../../../../services/company-user/company-user.service';
import { LoaderService } from 'app/services/loader/loader.service';

@Component({
  templateUrl: './new-user.component.html',
  styleUrls: [
    '../../../../../../node_modules/ladda/dist/ladda-themeless.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class NewUserComponent implements OnInit{
  
  public userRestRequest = new DealerUserRestRequest();
  public dealerList;
  public dealerToken;
  private message: UserMessage;
  public passwordConfirmation;


  @ViewChild('inputPassword') inputPassword: ElementRef;
  @ViewChild('inputPasswordConfirmation') inputPasswordConfirmation: ElementRef;
   
  constructor(private router: Router,
              private companyUserService: CompanyUserService,
              private dealerService: DealerService,
              private messageService: MessageService,
              private localeService: LocaleService,
              public currentService: CompanyCurrentService,
              private renderer: Renderer,
              public loaderService: LoaderService) { 


  }

  public searchDealer(){
    this.dealerService.searchDealerNotPagging().subscribe(response => {
        this.dealerList = [];
        response.dealers.forEach(dealer => {
          let dealerOption = {label:'', value:''};
          dealerOption.value = dealer.token.toString();
          dealerOption.label = dealer.name.toString();
          this.dealerList.push(dealerOption);
        });
    });
  }


  public onSubmit(insertForm){
    if(insertForm.valid){
      
      if(this.userRestRequest.password == this.passwordConfirmation){
        this.renderer.setElementClass(this.inputPassword.nativeElement, 'ng-invalid', false);
        this.renderer.setElementClass(this.inputPasswordConfirmation.nativeElement, 'ng-invalid', false);

        this.loaderService.startLoader('newUserButton');

        this.companyUserService.addDealerUsers(this.userRestRequest).subscribe(resposta => {
          var message = this.localeService.get('Usuário inserido com sucesso!');
          var title = this.localeService.get('screen.commons.message.success.title');
          this.router.navigate(['/company/user']);
          this.message = new UserMessage('success', title.toString(), message.toString());
          this.messageService.showMessage(this.message);
        });
      } else {
        this.inputPassword.nativeElement.setCustomValidity('Erro');
        this.inputPasswordConfirmation.nativeElement.setCustomValidity('Erro');
        this.renderer.setElementClass(this.inputPassword.nativeElement, 'ng-invalid', true);
        this.renderer.setElementClass(this.inputPassword.nativeElement, 'ng-touched', true);
        this.renderer.setElementClass(this.inputPasswordConfirmation.nativeElement, 'ng-invalid', true);
        this.renderer.setElementClass(this.inputPasswordConfirmation.nativeElement, 'ng-touched', true);
        this.message = new UserMessage('error', 'Falha', 'As senhas não conferem!');
        this.messageService.showMessage(this.message);
      }
      
    } else {
      var message = this.localeService.get('screen.commons.message.error.invalidInput');
      var title = this.localeService.get('screen.commons.message.error.title');
      this.message = new UserMessage('error', title.toString(), message.toString());
      this.messageService.showMessage(this.message);
    }

   
  }

  public ngOnInit() {
    this.searchDealer();
  }


}
