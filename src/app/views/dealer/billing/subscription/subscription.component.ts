import { InvoiceModule } from './../invoice/invoice.module';
import { SubscriptionStatus } from './../../../../constants/subscription-status.const';
import { Subscription } from './../../../../classes/subscription';
import { SubscriptionService } from './../../../../services/subscription/subscription.service';
import { LoaderService } from './../../../../services/loader/loader.service';
import { AlertTypeConverterService } from './../../../../services/alert/alert-type-converter.service';
import { AlertService } from './../../../../services/alert/alert.service';
import { Component, ViewEncapsulation, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Customer } from '../../../../classes/customer';
import { Invoice } from '../../../../classes/invoice';
import { InvoiceStatus } from '../../../../constants/invoice.status.const';
import { BsLocaleService, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SettingsService } from '../../../../services/settings/settings.service';
import { MessageService } from '../../../../services/message/message.service';
import { PagingService } from '../../../../services/paging/paging.service';
import { FormatService } from '../../../../services/format.service';
import { InvoiceService } from '../../../../services/invoice/invoice.service';
import { InvoiceRestRequest } from '../../../../services/invoice/to/invoice.rest.request';
import { LocaleService } from '../../../../services/message/locale.service';
import { UserMessage } from '../../../../classes/user-message';
import { StatusConverterService } from '../../../../services/status/status-converter.service';
import { ConverterService } from '../../../../services/converter.service';
import { SubscriptionRestRequest } from 'app/services/subscription/to/subscription-rest-request';

@Component({
  templateUrl: 'subscription.component.html',
  styleUrls: [
    '../../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../../../../node_modules/ladda/dist/ladda-themeless.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class SubscriptionComponent implements OnInit{

  minDate = new Date(); 
  maxDate = new Date(); 

  private message;
  public bsStartDate = new Date();
  public bsEndDate = new Date();
  public dateToFilter = "EXPIRATION";

  public status='';
  public searchKeyword = '';
  public pageSize = 10;

  public subscriptionList = [];
  public subscriptionToShow: Subscription = new Subscription();
  public invoiceToShow = new Invoice();

  public invoiceUpdate = false;
  public subscriptionUpdate = false;
  public invoiceToResend;
  public subscriptionToCancel;

  public update = false;

  public subscriptionStatus = SubscriptionStatus;
  public invoiceStatus = InvoiceStatus;

  public invoiceAlertList = [];

  @ViewChild('subscriptionModal') subscriptionModal: TemplateRef<any>;
  @ViewChild('invoiceModal') invoiceModal: TemplateRef<any>;
  @ViewChild('alertsModal') alertsModal: TemplateRef<any>;
  @ViewChild('cancelationModal') cancelationModal: TemplateRef<any>;
  @ViewChild('resendModal') resendModal: TemplateRef<any>;

  modalSubscription: BsModalRef;
  modalInvoice: BsModalRef;
  modalAlerts: BsModalRef;
  modalCancelation: BsModalRef;
  modalResend: BsModalRef;

  constructor(private bsLocaleService: BsLocaleService,
              private alertService: AlertService,
              public alertTypeConverterService: AlertTypeConverterService,
              private settingsService: SettingsService,
              private messageService: MessageService,
              public pagingService: PagingService,
              public formatService: FormatService,
              private invoiceService: InvoiceService,
              private localeService:LocaleService,
              public statusConverterService: StatusConverterService,
              public converterService: ConverterService,
              private subscriptionService: SubscriptionService,
              public loaderService: LoaderService,
              private modalService: BsModalService
            ){

            //Locale exclusivo para tradução do bootstrap datepicker
             this.bsLocaleService.use(this.settingsService.getLocale());
            this.subscriptionToShow.customer = new Customer();
            this.invoiceToShow.customer = new Customer();
            this.bsEndDate.setDate(this.bsEndDate.getDate() + 30);

            }
abrirModal(modal){
  if(modal == 'subscriptionModal'){
    this.openModal(this.subscriptionModal);
  } else if(modal == 'invoiceModal'){
    this.openModal(this.invoiceModal);
  } else if(modal == 'alertsModal'){
    this.openModal(this.alertsModal);
  } else if(modal == 'resendModal'){
    this.openModal(this.resendModal);
  } else if(modal == 'cancelationModal'){
    this.openModal(this.cancelationModal);
  }
}

openModal(template: TemplateRef<any>) {
  if(template == this.subscriptionModal){
    this.modalSubscription = this.modalService.show(template, { class: 'modal-lg' });
  } else if(template == this.invoiceModal){
    this.modalInvoice = this.modalService.show(template, { class: 'modal-lg' });
  } else if(template == this.alertsModal){
    this.modalAlerts = this.modalService.show(template, { class: 'modal-md' });
  } else if(template == this.resendModal){
    this.modalResend = this.modalService.show(template, { class: 'modal-md' });
  } else if(template == this.cancelationModal){
    this.modalCancelation = this.modalService.show(template, { class: 'modal-md' });
  }
}
      
closeModal(modal) {
  if(modal == 'subscriptionModal'){
    this.modalSubscription.hide();
    this.modalSubscription = null;
  } else if(modal == 'invoiceModal'){
    this.modalInvoice.hide();
    this.modalInvoice = null;
  } else if(modal == 'alertsModal'){
    this.modalAlerts.hide();
    this.modalAlerts = null;
  } else if(modal == 'resendModal'){
    this.modalResend.hide();
    this.modalResend = null;
  } else if(modal == 'cancelationModal'){
    this.modalCancelation.hide();
    this.modalCancelation = null;
  }
}

public canUpdateInvoice(){
  if((this.invoiceUpdate == true) || (this.invoiceToShow.status == 'CANCELED') || (this.invoiceToShow.status == 'PAID')){
    return false;
  }

  return true;
}

public canUpdateSubscription(){
  if((this.subscriptionUpdate == true) || (this.subscriptionToShow.status == 'CANCELED')){
    return false;
  }

  return true;
}

public updateInvoice(){
  let expirationDate = this.formatService.dateToApi(this.invoiceToShow.expirationDate);
  let amount = this.formatService.amountToApi(this.invoiceToShow.amount);
  let invoiceRestRequest = new InvoiceRestRequest(this.invoiceToShow.customer.token, this.invoiceToShow.documentNumber,
    this.invoiceToShow.description, expirationDate, amount, this.invoiceToShow.paymentMethod);
  this.invoiceService.updateInvoice(invoiceRestRequest, this.invoiceToShow.token).subscribe(response => {
    var message = this.localeService.get('screen.invoice.message.success.successUpdate');
    var title = this.localeService.get('screen.commons.message.success.title');
    this.message = new UserMessage('success', title.toString(), message.toString());
    this.messageService.showMessage(this.message);

    this.loadSubscriptionToShow(this.subscriptionToShow.token);
    this.searchSubscription(0);
  });
  this.invoiceUpdate = false;

}

public updateSubscription(){
  if(this.subscriptionToShow.expirationDay > 31){
    var message = this.localeService.get('O dia de vencimento deve ser menor que 31.');
    var title = this.localeService.get('screen.commons.message.error.title');
    this.message = new UserMessage('error', title.toString(), message.toString());
    this.messageService.showMessage(this.message);
  } else {
    this.subscriptionToShow.amount = this.formatService.amountToApi(this.subscriptionToShow.amount).valueOf();
    
    var endDate;
    if(this.subscriptionToShow.endDate){
      endDate = this.formatService.dateToApi(this.subscriptionToShow.endDate);
    } else{
      endDate = null;
    }

    var documentNumber;
    if(this.subscriptionToShow.documentNumber != null){
      documentNumber = this.subscriptionToShow.documentNumber.toString();
    } else{
      documentNumber = null;
    }

    let subscriptionRestRequest = new SubscriptionRestRequest(null,this.subscriptionToShow.description, 
                                                              documentNumber, null, endDate,
                                                              this.subscriptionToShow.amount.toString(), null, null,
                                                              this.subscriptionToShow.expirationDay.toString() );
  
    this.subscriptionService.updateSubscription(subscriptionRestRequest, this.subscriptionToShow.token).subscribe(response => {
      var message = this.localeService.get('screen.subscription.message.success.successUpdate');
      var title = this.localeService.get('screen.commons.message.success.title');
      this.message = new UserMessage('success', title.toString(), message.toString());
      this.messageService.showMessage(this.message);
  
      this.loadSubscriptionToShow(this.subscriptionToShow.token);
      this.searchSubscription(0);
    });
    this.subscriptionUpdate = false;
    this.closeModal('subscriptionModal');
  }

}

public searchSubscription(page?:Number): void {
  this.loaderService.startLoader('subscriptionSearchButton');
  this.subscriptionService.searchSubscription(this.bsStartDate, this.bsEndDate, this.status, this.searchKeyword, page, this.pageSize, this.dateToFilter).subscribe(
    response => {
      this.subscriptionList = [];
      this.subscriptionList = response.subscriptions;
      this.subscriptionList.forEach(subscription => {
        subscription.amount = this.formatService.amountFromApi(subscription.amount);
        
      })
      this.pagingService.setPaging(response.page);
    }
  );
}

public cancelSubscription(token: String){
  this.subscriptionService.cancelSubscription(token).subscribe(response => {
    this.searchSubscription();
  });
}

public loadSubscriptionToCancel(subscription: Subscription){
  this.subscriptionToCancel = subscription;
}

public loadInvoiceToSend(invoice: Invoice){
  this.invoiceService.getInvoice(invoice.token).subscribe(response => {
    response.invoice.amount = this.formatService.amountFromApi(response.invoice.amount);
    response.invoice.expirationDate = this.formatService.dateFromApi(response.invoice.expirationDate);
    if(response.invoice.cancelationDate){
      response.invoice.cancelationDate = this.formatService.dateFromApi(response.invoice.cancelationDate);
    }
    if(response.invoice.paymentDate){
      response.invoice.paymentDate = this.formatService.dateFromApi(response.invoice.paymentDate);
    }
    this.invoiceToResend = response.invoice;
  })
}

public loadSubscriptionToShow(token: String) {
  this.subscriptionService.getSubscription(token).subscribe(response => {
    
     this.subscriptionToShow = response.subscription;
     
     this.subscriptionToShow.invoices.forEach(invoice => {
       invoice.amount = this.formatService.amountFromApi(invoice.amount);
      });
      this.subscriptionToShow.amount = this.formatService.amountFromApi(this.subscriptionToShow.amount).valueOf();
      if (this.subscriptionToShow.endDate != null)
        this.subscriptionToShow.endDate = this.formatService.dateFromApi(this.subscriptionToShow.endDate);
   })
 }

 public loadInvoiceAlerts(invoiceToken: String){
  this.alertService.getInvoiceAlerts(invoiceToken).subscribe( response => {
    this.invoiceAlertList = [];
    this.invoiceAlertList =  response.invoiceAlerts;
  })
}

public cleanInvoiceAlerts(){
  this.invoiceAlertList = [];
}

 public sendInvoice(token: String){
  this.invoiceService.sendInvoice(token).subscribe(response => {
    var message = this.localeService.get('screen.invoice.message.success.successResend');
    var title = this.localeService.get('screen.commons.message.success.title');
    this.message = new UserMessage('success', title.toString(), message.toString());
    this.messageService.showMessage(this.message);
  });
}


public printInvoice(token: String){
  this.invoiceService.printInvoice(token).subscribe(response => {
    const fileURL = URL.createObjectURL(response.body,);
    window.open(fileURL,'_Blank');
  })
}

 public preencheModal(subscription:Subscription){
    this.loadSubscriptionToShow(subscription.token);
 }

 suspendSubscription(token: String){
  this.subscriptionService.suspendSubscription(token).subscribe(response => {
    var message = this.localeService.get('screen.subscription.message.success.successSuspended');
    var title = this.localeService.get('screen.commons.message.success.title');
    this.message = new UserMessage('success', title.toString(), message.toString());
    this.messageService.showMessage(this.message);
    this.searchSubscription();
  });
 }

 reopenSubscription(token: String){
  this.subscriptionService.reopenSubscription(token).subscribe(response => {
    var message = this.localeService.get('screen.subscription.message.success.successReopen');
    var title = this.localeService.get('screen.commons.message.success.title');
    this.message = new UserMessage('success', title.toString(), message.toString());
    this.messageService.showMessage(this.message);
    this.searchSubscription();
  });
}

 public preencheInvoiceModal(invoice: Invoice){
  this.invoiceService.getInvoice(invoice.token).subscribe(response => {
    response.invoice.amount = this.formatService.amountFromApi(response.invoice.amount);
    if(response.invoice.status == 'PAID'){
      response.invoice.paidAmount = this.formatService.amountFromApi(response.invoice.paidAmount);
      response.invoice.fees = this.formatService.amountFromApi(response.invoice.fees);
      response.invoice.netAmount = this.formatService.amountFromApi(response.invoice.netAmount);
    }
    response.invoice.expirationDate = this.formatService.dateFromApi(response.invoice.expirationDate);
    if(response.invoice.cancelationDate){
      response.invoice.cancelationDate = this.formatService.dateFromApi(response.invoice.cancelationDate);
    }
    if(response.invoice.paymentDate){
      response.invoice.paymentDate = this.formatService.dateFromApi(response.invoice.paymentDate);
    }
    this.invoiceToShow = response.invoice;
  })
 }

 ngOnInit(){
  this.searchSubscription(0);
 }


}
