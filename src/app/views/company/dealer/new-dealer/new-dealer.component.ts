import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Dealer } from '../../../../classes/dealer';
import { DocumentService } from '../../../../services/document/document.service';
import { StateService } from '../../../../services/address/state/state.service';
import { CityService } from '../../../../services/address/city/city.service';
import { MessageService } from '../../../../services/message/message.service';
import { LocaleService } from '../../../../services/message/locale.service';
import { State } from '../../../../classes/state';
import { UserMessage } from '../../../../classes/user-message';
import { Address } from '../../../../classes/address';
import { Router } from '@angular/router';
import { DealerService } from '../../../../services/dealer/dealer.service';
import { DealerRestRequest } from '../../../../services/dealer/to/dealer.rest.request';
import { BankAccount } from '../../../../classes/bank-account';
import { CompanyCurrentService } from '../../../../services/company-current/company-current.service';
import { CompanyBillingPlan } from '../../../../classes/company-billing-plan';
import { Bank } from '../../../../classes/bank';
import { BankService } from '../../../../services/bank/bank.service';
import { LoaderService } from 'app/services/loader/loader.service';
import { CompanyBillingPlanService } from 'app/services/billing-plan/company-billing-plan.service';
import { FormatService } from 'app/services/format.service';

@Component({
  templateUrl: './new-dealer.component.html',
  styleUrls: [
    '../../../../../../node_modules/ladda/dist/ladda-themeless.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class NewDealerComponent implements OnInit{
  
  public dealer = new Dealer();
  private message: UserMessage;
  public banks;
  public states: State[];
  public cities = [];
  public billingPlansList;
  public companyBankAccountsList;
  public documentMask;
  public phoneNumberMask = '(00) 0000-0000';
  public mobileNumberMask = '(00) 00000-0000';
  public zipCodeMask = '00.000-000';

  public paidBankBilletFee;
  public marketWithdrawFee;




  constructor(private router: Router,
              private dealerService: DealerService,
              private stateService: StateService,
              private cityService: CityService,
              private documentService: DocumentService,
              public formatService: FormatService,
              private messageService: MessageService,
              private localeService: LocaleService,
              private bankService: BankService,
              public currentService: CompanyCurrentService,
              private companyBillingPlanService: CompanyBillingPlanService,
              public loaderService: LoaderService) { 

    this.dealer.addresses = [];
    this.dealer.bankAccounts = [];
    this.dealer.billingPlan = new CompanyBillingPlan();
    this.dealer.companyBankAccount = new BankAccount();
   
  }

  public documentTypeComboConfig(){
    if(this.dealer.personType){
      this.documentService.getDocumentType(this.dealer.personType).subscribe( response => {
        this.dealer.documentType = response.documentType;
        this.documentMask = response.documentType.webMask;
      });
    }
  }

  public addAddress(){
    if(this.dealer.addresses.length < 5){
      let address = new Address()
      if(this.dealer.addresses.length < 1)
        address.billingAddress = true;
      else
        address.billingAddress = false;
      this.dealer.addresses.push(address);
    } else {
      var message = this.localeService.get('screen.commons.message.info.maxAddressExceeded');
      var title = this.localeService.get('screen.commons.message.info.title');
      this.message = new UserMessage('info', title.toString(), message.toString());
      this.messageService.showMessage(this.message);
    }  
  }

  public getBillingPlan(token: String){
    this.companyBillingPlanService.get(token).subscribe(response =>{
      this.paidBankBilletFee = this.formatService.amountFromApi(response.billingPlan.paidBankBilletFee);
      this.marketWithdrawFee = this.formatService.amountFromApi(response.billingPlan.marketWithdrawFee);
    })
  }

  public addAccount(){
    if(this.dealer.bankAccounts.length < 3){
      let bankAccount = new BankAccount();
      let bank = new Bank();
      bankAccount.bank = bank;
      this.dealer.bankAccounts.push(bankAccount);
    } else {
      var message = this.localeService.get('Máximo 3 contas.');
      var title = this.localeService.get('screen.commons.message.info.title');
      this.message = new UserMessage('info', title.toString(), message.toString());
      this.messageService.showMessage(this.message);
    }  
  }

  public removeAddress(index:any){
    this.dealer.addresses.splice(index, 1);
  }

  public removeAccount(index:any){
    this.dealer.bankAccounts.splice(index, 1);
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

  public getBillingPlans(){
    this.companyBillingPlanService.find().subscribe( response => {
      this.billingPlansList = [];
      this.billingPlansList = response.billingPlans;
    });
  }

  public getBankAccounts(){
    this.currentService.getCurrentBankAccounts().subscribe( response => {
      this.companyBankAccountsList = [];
      this.companyBankAccountsList = response.bankAccounts;
    });
  }

  public getBanks(){
    this.bankService.findBanks().subscribe(response =>{
      this.banks = response.banks;
    })
  }

  public resetJurosMulta(){
    this.dealer.bankBilletExpiredPayment = false;
    this.dealer.bankBilletInterestPercent = null;
    this.dealer.bankBilletPenaltyPercent = null;
  }

  public onSubmit(insertForm){
    if(insertForm.valid){

      this.loaderService.startLoader('newDealerSaveButton');
      var dealerRequest = new DealerRestRequest();
      dealerRequest = this.dealerService.parseToRequest(this.dealer);
      dealerRequest.bankBilletInterestPercent = this.formatService.amountToApi(dealerRequest.bankBilletInterestPercent);
      dealerRequest.bankBilletPenaltyPercent = this.formatService.amountToApi(dealerRequest.bankBilletPenaltyPercent);
      this.dealerService.insertDealer(dealerRequest).subscribe(resposta => {
        var message = this.localeService.get('screen.dealer.message.success.successInsert');
        var title = this.localeService.get('screen.commons.message.success.title');
        this.router.navigate(['/company/dealer']);
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
    this.addAccount();
    this.getBanks();
    this.getBankAccounts();
    this.getBillingPlans();
    this.resetJurosMulta();
  }


}
