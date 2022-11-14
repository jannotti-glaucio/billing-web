import { Component, ViewEncapsulation } from '@angular/core';
import { Customer } from '../../../../../classes/customer';
import { BsLocaleService } from 'ngx-bootstrap';
import { SettingsService } from '../../../../../services/settings/settings.service';
import { FormatService } from '../../../../../services/format.service';
import { LocaleService } from '../../../../../services/message/locale.service';
import { MessageService } from '../../../../../services/message/message.service';
import { PagingService } from '../../../../../services/paging/paging.service';
import { CustomerService } from '../../../../../services/customer/customer.service';
import { UserMessage } from '../../../../../classes/user-message';
import { DocumentService } from '../../../../../services/document/document.service';
import { CollectionRestRequest } from '../../../../../services/collection/to/collection.rest.request';
import { CollectionService } from '../../../../../services/collection/collection.service';
import { Router } from '@angular/router';
import { LoaderService } from 'app/services/loader/loader.service';

@Component({
  templateUrl: './new-collection.component.html',
  styleUrls: [
    '../../../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../../../../../node_modules/ladda/dist/ladda-themeless.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class NewCollectionComponent{
  
  public minDate;
  
  private message: UserMessage;
  public searchKeyword = '';
  public pageSize = 10;

  public customerList = [];
  public customerSelectedList;
  public customerTempSelectedList;
  public faturaList = [];
  public invoiceDescription;
  
  public customerToRemove: Customer;
  public idToRemove;
  public amount;
  public amountType = 'INVOICE';
  public instalments = 1;
  public paymentMethod = 'BANK_BILLET';
  public expirationDate: Date;
  public collectionDocumentNumber;

  public showInstalments = false;
  public instalmentList;

  constructor(private customerService: CustomerService,
              private collectionService: CollectionService,
              private messageService: MessageService,
              public pagingService: PagingService,
              private documentService: DocumentService,
              private bsLocaleService: BsLocaleService,
              private settingsService: SettingsService,
              public formatService: FormatService,
              private localeService: LocaleService,
              public router: Router,
              public loaderService: LoaderService){
      //Locale exclusivo para tradução do bootstrap datepicker
      this.bsLocaleService.use(this.settingsService.getLocale());

  }

  public verifyMinDate(){
      this.minDate = new Date();
  }

  public modalExcluir(customer, i){
    this.customerToRemove = customer;
    this.idToRemove = i;
  }
 
  public remove(){
    this.customerSelectedList.splice(this.idToRemove, 1);
    this.customerSelectedList = null;

  }

  public removeTempCustomer(i){
    this.customerTempSelectedList.splice(i, 1);
  }

  public customerSelectedListAdd(){
    if(this.customerSelectedList == null){
      this.customerSelectedList = [];
    }
    this.customerSelectedList = this.customerTempSelectedList;
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

  public onSubmit(insertForm){
    if(this.customerSelectedList == null){
      var message = this.localeService.get('Você precisa selecionar 1 Cliente.');
      var title = this.localeService.get('screen.commons.message.error.title');
      this.message = new UserMessage('error', title.toString(), message.toString());
      this.messageService.showMessage(this.message);
    
    } else {

      if(insertForm.valid){
        this.loaderService.startLoader('newCollectionSaveButton');
        var amount = this.formatService.amountToApi(this.amount);
        var expirationDate = this.formatService.dateToApi(this.expirationDate);
        var customerToken = this.customerSelectedList[0].token;
        let collectionRestRequest = new CollectionRestRequest(
          customerToken, this.invoiceDescription, this.collectionDocumentNumber, this.instalments.toString(),
          expirationDate, amount.toString(), this.amountType,this.paymentMethod);
        this.collectionService.insertCollection(collectionRestRequest).subscribe(response => {
          var message = this.localeService.get('screen.invoice.message.success.successInsert');
          var title = this.localeService.get('screen.commons.message.success.title');
          this.router.navigate(['/dealer/billing/collection']);
          this.message = new UserMessage('success', title.toString(), message.toString());
          this.messageService.showMessage(this.message);
          /*if(this.sendMethod == 'email'){
            this.sendInvoice(response.token);
          } else if(this.sendMethod == 'print'){
            this.printInvoice(response.token);
          }*/
        });
      } else {
        var message = this.localeService.get('screen.commons.message.error.invalidInput');
        var title = this.localeService.get('screen.commons.message.error.title');
        this.message = new UserMessage('error', title.toString(), message.toString());
        this.messageService.showMessage(this.message);
      }
    }

  }

  public getInstalments(insertForm){
    if(insertForm.valid){
      var amount = this.formatService.amountToApi(this.amount);
      var expirationDate = this.formatService.dateToApi(this.expirationDate);
      let collectionRestRequest = new CollectionRestRequest(
        null, null, null, this.instalments.toString(),
        expirationDate, amount.toString(), this.amountType,this.paymentMethod);
      this.collectionService.getInstalments(collectionRestRequest).subscribe(response => {
        this.instalmentList = response.instalments;
        response.instalments.forEach(element => {
          element.expirationDate = this.formatService.dateFromApi(element.expirationDate);
          element.amount = this.formatService.amountFromApi(element.amount);
          element.fees = this.formatService.amountFromApi(element.fees);
          element.netAmount = this.formatService.amountFromApi(element.netAmount);
        });
        this.showInstalments = true;
      })
    }
    insertForm.submitted = true;

  }

  public ngOnInit(){
    this.searchCustomer();
    this.verifyMinDate();
  }

}
