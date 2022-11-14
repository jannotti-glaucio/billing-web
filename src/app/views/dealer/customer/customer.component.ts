import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../../classes/customer';

import { CustomerService } from '../../../services/customer/customer.service';
import { UserMessage } from '../../../classes/user-message';
import { MessageService } from '../../../services/message/message.service';
import { PagingService } from '../../../services/paging/paging.service';
import { DocumentService } from '../../../services/document/document.service';
import { StatusConverterService } from '../../../services/status/status-converter.service';
import { LocaleService } from '../../../services/message/locale.service';
import { LoaderService } from 'app/services/loader/loader.service';


@Component({
  templateUrl: 'customer.component.html',
  styleUrls: ['../../../../../node_modules/ladda/dist/ladda-themeless.min.css'],
  encapsulation: ViewEncapsulation.None
})

export class CustomerComponent implements OnInit{

  private message: UserMessage;
  
  public customerList;
  public customerToRemove: Customer;
  public searchKeyword = '';
  public pageSize = 10;

  constructor(private router: Router, 
              private customerService: CustomerService,
              private messageService: MessageService,
              public pagingService: PagingService,
              private statusConverterService: StatusConverterService,
              private userMessageService: LocaleService,
              private documentService: DocumentService,
              public loaderService: LoaderService) {
  }
  
  public deleteCustomer(token:String): void {
    this.customerService.deleteCustomer(token).subscribe((response) => {
      var message = this.userMessageService.get('screen.customer.message.success.successDelete');
      var title = this.userMessageService.get('screen.commons.message.success.title');
      this.message = new UserMessage('success', title.toString(), message.toString());
      this.messageService.showMessage(this.message);
      this.searchCustomer();
    });    
  }
  
  public loadCustomerToRemove(customer): void {
    this.customerToRemove = customer;
  }
  
  public updateCustomer(token:string): void {
    this.router.navigate(['/dealer/customer/update-customer', token]);
  }

  public searchCustomer(page?:Number): void {
    this.loaderService.startLoader('customerSearchButton')
    this.customerService.searchCustomer(this.searchKeyword, page, this.pageSize).subscribe(response => {
      this.customerList = [];
      this.customerList = response.customers;
      if(response.customers != []){
        this.customerList.forEach(customer => {
          this.documentService.getDocumentType(customer.personType).subscribe(res => {
            customer.documentType = res.documentType;
          });
        });
        this.pagingService.setPaging(response.page);
      }
    });
  }

  public ngOnInit(){
    this.searchCustomer();
  }
}
