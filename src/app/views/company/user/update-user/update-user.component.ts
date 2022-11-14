import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'app/services/loader/loader.service';
import { User } from '../../../../classes/user';
import { UserMessage } from '../../../../classes/user-message';
import { CompanyUserService } from '../../../../services/company-user/company-user.service';
import { DealerUserRestRequest } from '../../../../services/company-user/to/dealer-user-rest-request';
import { LocaleService } from '../../../../services/message/locale.service';
import { MessageService } from '../../../../services/message/message.service';

@Component({
  templateUrl: './update-user.component.html',
  styleUrls: [
    '../../../../../../node_modules/ladda/dist/ladda-themeless.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class UpdateUserComponent implements OnInit{

  public userRestRequest = new DealerUserRestRequest();
  public userAddresses = [];
  public userAccounts = [];


  private message: UserMessage;
  private userToken; 

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private companyUserService: CompanyUserService,
    private messageService: MessageService,
    private localeService : LocaleService,
    public loaderService: LoaderService) {

  }
  
  public onSubmit(updateForm){
   if(updateForm.valid){
      this.loaderService.startLoader('updateUserButton');
      this.companyUserService.updateDealerUser(this.userRestRequest).subscribe(resposta => {
        var message = this.localeService.get('Atualizado com sucesso');
        var title = this.localeService.get('screen.commons.message.success.title');
        this.router.navigate(['/company/user']);
        this.message = new UserMessage('success', title.toString(), message.toString());
        this.messageService.showMessage(this.message);
      });
    } else {
      var message = this.localeService.get('screen.commons.message.error.invalidInput');
      var title = this.localeService.get('screen.commons.message.success.title');
      this.message = new UserMessage('error',  title.toString(), message.toString());
      this.messageService.showMessage(this.message);
    }
  }
  
  public ngOnInit() {

    this.route.params.subscribe((objeto:any) => {
      this.userToken = objeto.token;
      this.companyUserService.getDealerUser(this.userToken).subscribe(
        response => {
         let user = new User();
         user = response.user;
         this.userRestRequest = this.companyUserService.parseUserToRequest(user);
        });
    });

    };


}
