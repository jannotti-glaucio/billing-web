import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Customer } from '../../../../classes/customer';
import { Collection } from '../../../../classes/collection';
import { CollectionStatus } from '../../../../constants/collection.status.const';
import { Invoice } from '../../../../classes/invoice';
import { InvoiceStatus } from '../../../../constants/invoice.status.const';
import { BsLocaleService } from 'ngx-bootstrap';
import { SettingsService } from '../../../../services/settings/settings.service';
import { CollectionService } from '../../../../services/collection/collection.service';
import { MessageService } from '../../../../services/message/message.service';
import { PagingService } from '../../../../services/paging/paging.service';
import { FormatService } from '../../../../services/format.service';
import { InvoiceService } from '../../../../services/invoice/invoice.service';
import { InvoiceRestRequest } from '../../../../services/invoice/to/invoice.rest.request';
import { LocaleService } from '../../../../services/message/locale.service';
import { UserMessage } from '../../../../classes/user-message';
import { StatusConverterService } from '../../../../services/status/status-converter.service';
import { LoaderService } from 'app/services/loader/loader.service';
import { AlertService } from 'app/services/alert/alert.service';
import { AlertTypeConverterService } from 'app/services/alert/alert-type-converter.service';

@Component({
  templateUrl: 'collection.component.html',
  styleUrls: [
    '../../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../../../../node_modules/ladda/dist/ladda-themeless.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class CollectionComponent implements OnInit{

  minDate = new Date(); 
  maxDate = new Date(); 

  private message;
  public bsStartDate = new Date();
  public bsEndDate = new Date();
  public dateToFilter = "EXPIRATION";

  public status='';
  public searchKeyword = '';
  public pageSize = 10;

  public collectionList = [];
  public collectionToShow: Collection = new Collection();
  public invoiceToShow = new Invoice();

  public invoiceUpdate = false;
  public invoiceToResend;
  public collectionToCancel;

  public update = false;

  public collectionStatus = CollectionStatus;
  public invoiceStatus = InvoiceStatus;

  public invoiceAlertList = [];

  constructor(private bsLocaleService: BsLocaleService,
              private alertService: AlertService,
              public alertTypeConverterService: AlertTypeConverterService,
              private settingsService: SettingsService,
              private messageService: MessageService,
              public pagingService: PagingService,
              public formatService: FormatService,
              private collectionService: CollectionService,
              private invoiceService: InvoiceService,
              private localeService:LocaleService,
              public statusConverterService: StatusConverterService,
              public loaderService: LoaderService
            ){

            //Locale exclusivo para tradução do bootstrap datepicker
             this.bsLocaleService.use(this.settingsService.getLocale());
            this.collectionToShow.customer = new Customer();
            this.invoiceToShow.customer = new Customer();
            this.bsEndDate.setDate(this.bsEndDate.getDate() + 30);

            }

public canUpdate(){
  if((this.invoiceUpdate == true) || (this.invoiceToShow.status == 'CANCELED') || (this.invoiceToShow.status == 'PAID')){
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

    this.loadCollectionToShow(this.collectionToShow.token);
    this.searchCollection(0);
  });
  this.invoiceUpdate = false;

}

public searchCollection(page?:Number): void {
  this.loaderService.startLoader('collectionSearchButton');
  this.collectionService.searchCollection(this.bsStartDate, this.bsEndDate, this.status, this.searchKeyword, page, this.pageSize, this.dateToFilter).subscribe(
    response => {
      this.collectionList = [];
      this.collectionList = response.collections;
      this.collectionList.forEach(collection => {
        collection.totalAmount = this.formatService.amountFromApi(collection.totalAmount);
        collection.paidAmount = this.formatService.amountFromApi(collection.paidAmount);
        collection.pendingAmount = this.formatService.amountFromApi(collection.pendingAmount);
      })
      this.pagingService.setPaging(response.page);
    }
  );
}

public cancelCollection(token: String){
  this.collectionService.cancelCollection(token).subscribe(response => {
    this.searchCollection();
  });
}

public loadCollectionToCancel(collection: Invoice){
  this.collectionToCancel = collection;
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

public loadCollectionToShow(token: String) {
  this.collectionService.getCollection(token).subscribe(response => {
    
     this.collectionToShow = response.collection;
     this.collectionToShow.invoices.forEach(invoice => {
       invoice.convertedAmount = this.formatService.amountFromApi(invoice.amount);
      });
      this.collectionToShow.totalAmount = this.formatService.amountFromApi(this.collectionToShow.totalAmount);
      this.collectionToShow.paidAmount = this.formatService.amountFromApi(this.collectionToShow.paidAmount);
      this.collectionToShow.pendingAmount = this.formatService.amountFromApi(this.collectionToShow.pendingAmount);
      
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

 public preencheModal(collection:Collection){
    this.loadCollectionToShow(collection.token);
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
  this.searchCollection(0);
 }


}
