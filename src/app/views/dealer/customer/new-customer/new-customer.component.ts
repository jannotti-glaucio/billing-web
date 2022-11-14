import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Customer } from '../../../../classes/customer';
import { CustomerService } from '../../../../services/customer/customer.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../../services/message/message.service';
import { UserMessage } from '../../../../classes/user-message';
import { State } from '../../../../classes/state';
import { StateService } from '../../../../services/address/state/state.service';
import { Address } from '../../../../classes/address';
import { CityService } from '../../../../services/address/city/city.service';
import { DocumentService } from '../../../../services/document/document.service';
import { CustomerRestRequest } from '../../../../services/customer/to/customer.rest.request';
import { LocaleService } from '../../../../services/message/locale.service';
import { LoaderService } from 'app/services/loader/loader.service';


@Component({
  templateUrl: './new-customer.component.html',
  styleUrls: ['../../../../../../node_modules/ladda/dist/ladda-themeless.min.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewCustomerComponent implements OnInit{
  
  public customer: Customer = new Customer();

  private message: UserMessage;
  private states: State[];
  private cities = [];
  public documentMask;
  public phoneNumberMask = '(00) 0000-0000';
  public mobileNumberMask = '(00) 00000-0000';
  public zipCodeMask = '00.000-000';


  constructor(private router: Router, 
              private customerService: CustomerService,
              private stateService: StateService,
              private cityService: CityService,
              private documentService: DocumentService,
              private messageService: MessageService,
              private localeService: LocaleService,
              public loaderService: LoaderService) { 
                this.customer.addresses = [];
              }

  public documentTypeComboConfig(){
    if(this.customer.personType){
      this.documentService.getDocumentType(this.customer.personType).subscribe( response => {
        this.customer.documentType = response.documentType;
        this.documentMask = response.documentType.webMask;
      });
    }
  }

  public addAddress(){
    if(this.customer.addresses.length < 5){
      let address = new Address()
      if(this.customer.addresses.length < 1)
        address.billingAddress = true;
      else
        address.billingAddress = false;
      this.customer.addresses.push(address);
    } else {
      var message = this.localeService.get('screen.commons.message.info.maxAddressExceeded');
      var title = this.localeService.get('screen.commons.message.info.title');
      this.message = new UserMessage('info', title.toString(), message.toString());
      this.messageService.showMessage(this.message);
    }  
  }

  public removeAddress(index:any){
    this.customer.addresses.splice(index, 1);
  }

  public getStates(){
    this.stateService.getStates().subscribe(response => {
      this.states = response.states;
    });
  }

  public getCities(comboNumber: number, state: String){
    this.cities[comboNumber] = [];
    this.cityService.getCities(state).subscribe(response => {
      this.cities[comboNumber] = response.cities;
    });
  }

  public onSubmit(insertForm){
    if(insertForm.valid){
      this.loaderService.startLoader('newCustomerSaveButton');
      var customerRequest = new CustomerRestRequest();
      customerRequest = this.customerService.parseToRequest(this.customer);
      this.customerService.insertCustomer(customerRequest).subscribe(response => {
        var message = this.localeService.get('screen.customer.message.success.successInsert');
        var title = this.localeService.get('screen.commons.message.success.title');
        this.router.navigate(['/dealer/customer']);
        this.message = new UserMessage('success', title.toString(), message.toString());
        this.messageService.showMessage(this.message);
      });
    } else {
      var message = this.localeService.get('screen.commons.message.error.invalidInput');
      var title = this.localeService.get('screen.commons.message.error.title');
      this.message = new UserMessage('error', title.toString(), message.toString());
      this.messageService.showMessage(this.message);
    }
  }
  
  public ngOnInit() {
    this.getStates();
    this.addAddress();

  }

}
