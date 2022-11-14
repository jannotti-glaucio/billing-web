import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MessageService } from '../../../../services/message/message.service';
import { PagingService } from '../../../../services/paging/paging.service';
import { InvoiceService } from '../../../../services/invoice/invoice.service';
import { FormatService } from '../../../../services/format.service';
import { UserMessage } from '../../../../classes/user-message';
import { BsLocaleService } from 'ngx-bootstrap';
import { SettingsService } from '../../../../services/settings/settings.service';
import { Invoice } from '../../../../classes/invoice';
import { StatusConverterService } from '../../../../services/status/status-converter.service';
import { LocaleService } from '../../../../services/message/locale.service';
import { InvoiceStatus } from '../../../../constants/invoice.status.const';
import { Customer } from '../../../../classes/customer';
import { BankBillet } from '../../../../classes/bank-billet';
import { InvoiceRestRequest } from '../../../../services/invoice/to/invoice.rest.request';
import { LoaderService } from 'app/services/loader/loader.service';



@Component({
  templateUrl: 'invoice-expiration.component.html',
  styleUrls: [
    '../../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../../../../node_modules/ladda/dist/ladda-themeless.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class InvoiceExpirationComponent implements OnInit{

  public minDate;
  private message;

  public bsStartDate = new Date();
  public bsEndDate = new Date();
  public dateToFilter = "EXPIRATION";
  public invoiceToCancel;
  public invoiceToResend;
  public invoiceToShow: Invoice = new Invoice();
  public customerToShow: Customer = new Customer();
  public bankBilletToShow: BankBillet = new BankBillet();
  
  public update = false;
  
  public searchKeyword = '';
  public pageSize = 10;
  public status='EXPIRED';
  public invoiceList = [];
  public idToRemove;

  constructor(private invoiceService: InvoiceService,
              private messageService: MessageService,
              public pagingService: PagingService,
              public formatService: FormatService,
              public statusConverterService: StatusConverterService,
              private bsLocaleService: BsLocaleService,
              private settingsService: SettingsService,
              private localeService: LocaleService,
              public loaderService: LoaderService){
              //Locale exclusivo para tradução do bootstrap datepicker
              this.bsLocaleService.use(this.settingsService.getLocale());
              this.invoiceToShow.customer = this.customerToShow;
              this.invoiceToShow.bankBillet = this.bankBilletToShow;
              this.bsEndDate.setDate(this.bsEndDate.getDate() + 30);
  }

  public verifyMinDate(){
      this.minDate = new Date();
  }

  public canUpdate(){
    if((this.update == true) || (this.invoiceToShow.status == 'CANCELED') || (this.invoiceToShow.status == 'PAID')){
      return false;
    }
    return true;
  }

  public updateInvoice(){
     
     let expirationDate = this.formatService.dateToApi(this.invoiceToShow.expirationDate);
     let amount = this.formatService.amountToApi(this.invoiceToShow.amount);
     let invoiceRestRequest = new InvoiceRestRequest(this.invoiceToShow.customer.token,this.invoiceToShow.documentNumber,
       this.invoiceToShow.description, expirationDate, amount, this.invoiceToShow.paymentMethod);
     this.invoiceService.updateInvoice(invoiceRestRequest, this.invoiceToShow.token).subscribe(response => {
       var message = this.localeService.get('screen.invoice.message.success.successUpdate');
       var title = this.localeService.get('screen.commons.message.success.title');
       this.message = new UserMessage('success', title.toString(), message.toString());
       this.messageService.showMessage(this.message);
       this.searchInvoice();
     });
     this.update = false;
   }
  

  public showButton(name, invoice){
    
    if(name == this.localeService.get('screen.invoice.button.resend')){
      if((invoice.customer.email != null) && (invoice.status == InvoiceStatus.open)){
        return true;
      }
    } else if(name == this.localeService.get('screen.invoice.button.print')){
      if(invoice.status == InvoiceStatus.open){
        return true;
      }
    } else if(name == this.localeService.get('screen.commons.button.cancel')){
      if((invoice.status == InvoiceStatus.open) || (invoice.status == InvoiceStatus.expired)){
        return true;
      }
    }
    return false;
  }

  public searchInvoice(page?:Number): void {
    if(this.status == 'EXPIRED'){
      this.getExpiredInvoices(page);
    } else if (this.status == 'TODAY'){
      this.getExpiringInvoices(page);
    }
  }

  public getExpiredInvoices(page?:Number): void {
    this.loaderService.startLoader('invoiceExpirationSearchButton');
    this.invoiceService.getExpiredInvoices(this.searchKeyword, page, this.pageSize).subscribe( response => {
        this.invoiceList = [];
        this.invoiceList = response.invoices;
        if(this.invoiceList != []){
          this.invoiceList.forEach(invoice => {
              invoice.amount = this.formatService.amountFromApi(invoice.amount);        
          });
          this.pagingService.setPaging(response.page);
        }
      }
    );
  }

  public getExpiringInvoices(page?:Number): void {
    this.loaderService.startLoader('invoiceExpirationSearchButton');
    this.invoiceService.getExpiringInvoices(this.searchKeyword, page, this.pageSize).subscribe( response => {
        this.invoiceList = [];
        this.invoiceList = response.invoices;
        if(this.invoiceList != []){
          this.invoiceList.forEach(invoice => {
              invoice.amount = this.formatService.amountFromApi(invoice.amount);        
          });
          this.pagingService.setPaging(response.page);
        }
      }
    );
  }

  public loadInvoiceToShow(token: String) {
    this.invoiceToShow = new Invoice();
    this.invoiceService.getInvoice(token).subscribe(response => {
      response.invoice.amount = this.formatService.amountFromApi(response.invoice.amount);
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

  public loadInvoiceToCancel(invoice: Invoice){
    this.invoiceToCancel = invoice;
  }
  
  public loadInvoiceToSend(invoice: Invoice){
    this.invoiceToResend = invoice;
  }
  
  public cancelInvoice(token: String){
    this.invoiceService.cancelInvoice(token).subscribe(response => {
      this.searchInvoice();
    });
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

  ngOnInit(){
    this.verifyMinDate();
    this.searchInvoice(0);

  }

}
