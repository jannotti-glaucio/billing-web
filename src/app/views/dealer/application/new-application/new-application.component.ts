import { Component, OnInit, ViewEncapsulation, TemplateRef, ViewChild } from '@angular/core';
import { Application } from '../../../../classes/application';
import { ApplicationService } from '../../../../services/application/application.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../../services/message/message.service';
import { UserMessage } from '../../../../classes/user-message';
import { ApplicationRestRequest } from '../../../../services/application/to/application-rest-request';
import { LocaleService } from '../../../../services/message/locale.service';
import { LoaderService } from 'app/services/loader/loader.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';


@Component({
  templateUrl: './new-application.component.html',
  styleUrls: ['../../../../../../node_modules/ladda/dist/ladda-themeless.min.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewApplicationComponent implements OnInit{
  
  public application: Application = new Application();

  private message: UserMessage;

  private bankBilleExpiredPayment;


  @ViewChild('secretModal') secretModal: TemplateRef<any>;

  modalRef: BsModalRef;

  constructor(private router: Router, 
              private applicationService: ApplicationService,
              private messageService: MessageService,
              private localeService: LocaleService,
              public loaderService: LoaderService,
              private modalService: BsModalService) { 
              }

 

  public onSubmit(insertForm){
    if(insertForm.valid){
      this.loaderService.startLoader('newApplicationSaveButton');
      var applicationRequest = new ApplicationRestRequest();
      applicationRequest = this.applicationService.parseToRequest(this.application);
      this.applicationService.addApplication(applicationRequest).subscribe(response => {
        this.application.clientId = response.clientId;
        this.application.clientSecret = response.clientSecret;
        this.openModal(this.secretModal);
      });
    } else {
      var message = this.localeService.get('screen.commons.message.error.invalidInput');
      var title = this.localeService.get('screen.commons.message.error.title');
      this.message = new UserMessage('error', title.toString(), message.toString());
      this.messageService.showMessage(this.message);
    }
  }

  public finishNewApplication(){
    var message = this.localeService.get('screen.application.message.success.successInsert');
    var title = this.localeService.get('screen.commons.message.success.title');
    this.router.navigate(['/dealer/application']);
    this.closeModal();
    this.message = new UserMessage('success', title.toString(), message.toString());
    this.messageService.showMessage(this.message);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  closeModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }
  
  public ngOnInit() {
   

  }

}
