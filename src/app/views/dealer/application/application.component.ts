import { Component, ViewChild, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from '../../../classes/application';
import { ApplicationService } from '../../../services/application/application.service';
import { UserMessage } from '../../../classes/user-message';
import { MessageService } from '../../../services/message/message.service';
import { StatusConverterService } from '../../../services/status/status-converter.service';
import { LocaleService } from '../../../services/message/locale.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';


@Component({
  templateUrl: 'application.component.html',
  styleUrls: ['../../../../../node_modules/ladda/dist/ladda-themeless.min.css'],
  encapsulation: ViewEncapsulation.None
})

export class ApplicationComponent implements OnInit{

  private message: UserMessage;
  
  public applicationList;
  public applicationToRemove: Application;
  public searchKeyword = '';
  public pageSize = 10;

  public applicationToShow: Application = new Application();

  @ViewChild('secretModal') secretModal: TemplateRef<any>;

  modalRef: BsModalRef;

  constructor(private router: Router, 
              private applicationService: ApplicationService,
              private messageService: MessageService,
              private statusConverterService: StatusConverterService,
              private userMessageService: LocaleService,
              private modalService: BsModalService) {
  }
  
  public deleteApplication(token:String): void {
    this.applicationService.deleteApplication(token).subscribe((response) => {
      var message = this.userMessageService.get('screen.application.message.success.successDelete');
      var title = this.userMessageService.get('screen.commons.message.success.title');
      this.message = new UserMessage('success', title.toString(), message.toString());
      this.messageService.showMessage(this.message);
      this.searchApplication();
    });   
  }
  
  public loadApplicationToRemove(application): void {
    this.applicationToRemove = application;
  }
  
  public updateApplication(token:string): void {
    this.router.navigate(['/dealer/application/update-application', token]);
  }

  public searchApplication(): void {
    this.applicationService.findApplications().subscribe(response => {
      this.applicationList = [];
      this.applicationList = response.applications;
    });
  }

  public generateNewSecret(token: String){
    this.applicationService.generateApplicationSecret(token).subscribe(response => {
      this.applicationToShow.clientId = response.clientId;
      this.applicationToShow.clientSecret = response.clientSecret;
      this.openModal(this.secretModal);
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
        
  closeModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }

  public ngOnInit(){
    this.searchApplication();
  }
}
