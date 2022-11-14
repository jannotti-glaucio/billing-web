import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Application } from '../../../../classes/application';
import { MessageService } from '../../../../services/message/message.service';
import { UserMessage } from '../../../../classes/user-message';
import { ApplicationRestRequest } from '../../../../services/application/to/application-rest-request';
import { LocaleService } from 'app/services/message/locale.service';
import { LoaderService } from 'app/services/loader/loader.service';
import { ApplicationService } from 'app/services/application/application.service';

@Component({
  templateUrl: './update-application.component.html',
  styleUrls: ['../../../../../../node_modules/ladda/dist/ladda-themeless.min.css'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateApplicationComponent implements OnInit{

  public application: Application = new Application();
  private message: UserMessage;
  private applicationToken; 

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private applicationService: ApplicationService,
    private messageService: MessageService,
    private localeService: LocaleService,
    public loaderService: LoaderService) {
  }
   
  public onSubmit(updateForm){
    if(updateForm.valid){
      this.loaderService.startLoader('updateUserSaveButton');
      
      var applicationRequest = new ApplicationRestRequest();
      applicationRequest = this.applicationService.parseToRequest(this.application);
      this.applicationService.updateApplication(this.applicationToken, applicationRequest).subscribe(response => {
        var message = this.localeService.get('screen.application.message.success.successUpdate');
        var title = this.localeService.get('screen.commons.message.success.title');
        this.router.navigate(['/dealer/application']);
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
      this.applicationToken = objeto.token;
      this.applicationService.getApplication(this.applicationToken).subscribe(
        response => {
          this.application = response.application;
        });
    });
  };
  
}
