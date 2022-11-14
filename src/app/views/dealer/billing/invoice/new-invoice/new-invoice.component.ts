import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Customer } from '../../../../../classes/customer';
import { CustomerService } from '../../../../../services/customer/customer.service';
import { MessageService } from '../../../../../services/message/message.service';
import { PagingService } from '../../../../../services/paging/paging.service';
import { DocumentService } from '../../../../../services/document/document.service';
import { UserMessage } from '../../../../../classes/user-message';
import { InvoiceService } from '../../../../../services/invoice/invoice.service';
import { InvoiceRestRequest } from '../../../../../services/invoice/to/invoice.rest.request';
import { Router } from '@angular/router';
import { FormatService } from '../../../../../services/format.service';
import { BsLocaleService } from 'ngx-bootstrap';
import { SettingsService } from '../../../../../services/settings/settings.service';
import { LocaleService } from '../../../../../services/message/locale.service';
import { LoaderService } from 'app/services/loader/loader.service';
import { UserService } from 'app/services/user/user.service';

@Component({
  templateUrl: './new-invoice.component.html',
  styleUrls: [
    '../../../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../../../../../node_modules/ladda/dist/ladda-themeless.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class NewInvoiceComponent implements OnInit{
  
  public minDate;
  bsValue: Date = new Date();
  
  private message: UserMessage;
  public searchKeyword = '';
  public pageSize = 10;
  public customerList = [];
  public customerSelected: Customer;
  public customerSelectedList;
  public customerTempSelectedList;
  
  public customerToRemove: Customer;
  public idToRemove;
  public invoiceDescription;
  public expirationDate;
  public amount;
  public paymentMethod = 'BANK_BILLET';
  public sendMethod;
  public invoiceDocumentNumber;
  public generatedInvoiceToken;
  public paidBankBilletFee;
  public netAmount;

  constructor(private router: Router,
              private customerService: CustomerService,
              private userService: UserService,
              private invoiceService: InvoiceService,
              private messageService: MessageService,
              public pagingService: PagingService,
              private documentService: DocumentService,
              public formatService: FormatService,
              private bsLocaleService: BsLocaleService,
              private settingsService: SettingsService,
              private localeService: LocaleService,
              public loaderService: LoaderService){
                
              //Locale exclusivo para tradução do bootstrap datepicker
              this.bsLocaleService.use(this.settingsService.getLocale());
  }

  public verifyMinDate(){
    this.minDate = new Date();
  }

  public getFees(amount: Number){
    if(amount > 0){
      amount = this.formatService.amountToApi(amount);
    let invoiceRestRequest = new InvoiceRestRequest();
    invoiceRestRequest.amount = amount;
    invoiceRestRequest.paymentMethod = this.paymentMethod;
      this.invoiceService.getInvoiceFees(invoiceRestRequest).subscribe(response => {
        this.paidBankBilletFee = this.formatService.amountFromApi(response.fees);
        this.netAmount = this.formatService.amountFromApi(response.netAmount);
      })
    }
  }

  public modalExcluir(customer, i){
    this.customerToRemove = customer;
    this.idToRemove = i;
  }
 
  public remove(){
    this.customerSelectedList.splice(this.idToRemove, 1);
  }

  public removeTempCustomer(i){
    this.customerTempSelectedList.splice(i, 1);
  }

  public customerSelectedListAdd(){
   
    if(this.customerTempSelectedList != null){
      if(this.customerSelectedList == null){
        this.customerSelectedList = [];
      }
      this.customerSelectedList = this.customerTempSelectedList;
      this.customerSelected = this.customerSelectedList[0];
    }
  }

  public customerTempSelectedListAdd(customer: Customer){
    if(this.customerTempSelectedList == null){
      this.customerTempSelectedList = [];
      this.customerTempSelectedList.push(customer);
    } else {
      if(this.customerTempSelectedList.length == 1){
        var message = this.localeService.get('screen.invoice.message.info.maxCustomerExceeded');
        var title = this.localeService.get('screen.commons.message.info.title');
        this.message = new UserMessage('info', title.toString(), message.toString());
        this.messageService.showMessage(this.message);
      } else {
        this.customerTempSelectedList.push(customer);
      }
    }
  }

  public searchCustomer(page?:Number): void {
    const size = this.pageSize;
    this.customerService.searchCustomer(this.searchKeyword, page, size).subscribe(
      response => {
        this.customerList = [];
        this.customerList = response.customers;
        this.customerList.forEach(customer => {
          this.documentService.getDocumentType(customer.personType).subscribe(res => {
            customer.documentType = res.documentType;
          });
        });
        this.pagingService.setPaging(response.page);
      }
    );
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


  public onSubmit(insertForm){
    if(this.customerSelectedList == null){
      var message = this.localeService.get('Você precisa selecionar 1 Cliente.');
      var title = this.localeService.get('screen.commons.message.error.title');
      this.message = new UserMessage('error', title.toString(), message.toString());
      this.messageService.showMessage(this.message);
    
    } else {
      
      if(insertForm.valid){
        this.loaderService.startLoader('newInvoiceSaveButton');
        var amount = this.formatService.amountToApi(this.amount);
        var expirationDate = this.formatService.dateToApi(this.expirationDate);
        var customerToken = this.customerSelectedList[0].token;
        
        let invoiceRestRequest = new InvoiceRestRequest(customerToken, this.invoiceDocumentNumber,
          this.invoiceDescription, expirationDate, amount, this.paymentMethod);
        this.invoiceService.insertInvoice(invoiceRestRequest).subscribe(response => {
          var message = this.localeService.get('screen.invoice.message.success.successInsert');
          var title = this.localeService.get('screen.commons.message.success.title');
          this.router.navigate(['/dealer/billing/invoice']);
          this.message = new UserMessage('success', title.toString(), message.toString());
          this.messageService.showMessage(this.message);
          if(this.sendMethod == 'email'){
            this.sendInvoice(response.token);
          } else if(this.sendMethod == 'print'){
            this.printInvoice(response.token);
          } else if(this.sendMethod == 'mailAndPrint'){
            this.printInvoice(response.token);
            this.sendInvoice(response.token);
          }
        });
      } else {
        var message = this.localeService.get('screen.commons.message.error.invalidInput');
        var title = this.localeService.get('screen.commons.message.error.title');
        this.message = new UserMessage('error', title.toString(), message.toString());
        this.messageService.showMessage(this.message);
      }
    }
  }

  public ngOnInit(){
    this.searchCustomer();
    this.verifyMinDate();
  }
}
