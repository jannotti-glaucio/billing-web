import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../../../classes/customer';
import { Address } from '../../../../classes/address';
import { CustomerService } from '../../../../services/customer/customer.service';
import { MessageService } from '../../../../services/message/message.service';
import { UserMessage } from '../../../../classes/user-message';
import { State } from '../../../../classes/state';
import { StateService } from '../../../../services/address/state/state.service';
import { CityService } from '../../../../services/address/city/city.service';
import { DocumentService } from '../../../../services/document/document.service';
import { Operation } from '../../../../constants/address-operation.const';
import { CustomerRestRequest } from '../../../../services/customer/to/customer.rest.request';
import { LocaleService } from 'app/services/message/locale.service';
import { LoaderService } from 'app/services/loader/loader.service';

@Component({
  templateUrl: './update-customer.component.html',
  styleUrls: ['../../../../../../node_modules/ladda/dist/ladda-themeless.min.css'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateCustomerComponent implements OnInit{

  public customer: Customer = new Customer();
  public customerAddresses = [];
  private message: UserMessage;
  private customerToken; 

  private states: State[];
  private cities = [];
  private addressToRemoveList = []
  public documentMask;
  public phoneNumberMask = '(00) 0000-0000';
  public mobileNumberMask = '(00) 00000-0000';
  public zipCodeMask = '00.000-000';

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private customerService: CustomerService,
              private stateService: StateService,
              private documentTypeService: DocumentService,
              private cityService: CityService,
              private messageService: MessageService,
              private localeService : LocaleService,
              public loaderService: LoaderService) {
  }
  public documentTypeComboConfig(){
    if(this.customer.personType){
      this.documentTypeService.getDocumentType(this.customer.personType).subscribe( response => {
        this.customer.documentType = response.documentType;
        this.documentMask = response.documentType.webMask;
      });
    }
  }
  
  public addAddress(){
    if(this.customerAddresses.length < 5){
      let address = new Address()
      address.operation = Operation.add;
      address.billingAddress = false;
      this.customerAddresses.push(address);
    } else {
      var message = this.localeService.get('screen.commons.message.info.maxAddressExceeded');
      var title = this.localeService.get('screen.commons.message.info.title');
      this.message = new UserMessage('info', title.toString(), message.toString());
      this.messageService.showMessage(this.message);
    }  
  }

  public removeAddress(address:Address, index: number){
    if(address.token){
      this.customerAddresses[index].operation = Operation.delete;
      this.addressToRemoveList.push(this.customerAddresses[index]);
      this.customerAddresses.splice(index, 1);
    }else {
      this.customerAddresses.splice(index, 1);
    }
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
  
  public onSubmit(updateForm){
    if(updateForm.valid){
      this.loaderService.startLoader('updateUserSaveButton');
      for(var i = 0; i < this.customerAddresses.length; i++){
        if(this.customerAddresses[i].hasOwnProperty('operation')){
          this.customer.addresses.push(this.customerAddresses[i]);
        }
      }
      for(var i = 0; i < this.addressToRemoveList.length; i++){
          this.customer.addresses.push(this.addressToRemoveList[i]);
      }
      var customerRequest = new CustomerRestRequest();
      customerRequest = this.customerService.parseToRequest(this.customer);
      this.customerService.updateCustomer(customerRequest).subscribe(response => {
        var message = this.localeService.get('screen.customer.message.success.successUpdate');
        var title = this.localeService.get('screen.commons.message.success.title');
        this.router.navigate(['/dealer/customer']);
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
    this.getStates();
    this.route.params.subscribe((objeto:any) => {
      this.customerToken = objeto.token;
      this.customerService.getCustomer(this.customerToken).subscribe(
        response => {
          this.customer = response.customer;
          this.customerAddresses = response.customer.addresses;
          this.customer.addresses = [];
          for(let i = 0; i < this.customerAddresses.length; i++){
            this.getCities(i, this.customerAddresses[i].state);
          }
          this.documentTypeComboConfig();
        });
        });
        this.documentTypeComboConfig();
    };
  
}
