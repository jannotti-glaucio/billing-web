import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dealer } from '../../../../classes/dealer';
import { Address } from '../../../../classes/address';
import { UserMessage } from '../../../../classes/user-message';
import { State } from '../../../../classes/state';
import { DealerService } from '../../../../services/dealer/dealer.service';
import { StateService } from '../../../../services/address/state/state.service';
import { DocumentService } from '../../../../services/document/document.service';
import { CityService } from '../../../../services/address/city/city.service';
import { MessageService } from '../../../../services/message/message.service';
import { LocaleService } from '../../../../services/message/locale.service';
import { Operation } from '../../../../constants/address-operation.const';
import { DealerRestRequest } from '../../../../services/dealer/to/dealer.rest.request';
import { CompanyBillingPlan } from '../../../../classes/company-billing-plan';
import { BankAccount } from '../../../../classes/bank-account';
import { CompanyCurrentService } from '../../../../services/company-current/company-current.service';
import { Bank } from '../../../../classes/bank';
import { FormatService } from '../../../../services/format.service';
import { BankService } from '../../../../services/bank/bank.service';
import { LoaderService } from 'app/services/loader/loader.service';
import { CompanyBillingPlanService } from 'app/services/billing-plan/company-billing-plan.service';

@Component({
  templateUrl: './update-dealer.component.html',
  styleUrls: [
    '../../../../../../node_modules/ladda/dist/ladda-themeless.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class UpdateDealerComponent implements OnInit{

  public dealerToUpdate: Dealer;

  public banks;

  public dealer: Dealer = new Dealer();
  public dealerAddresses = [];
  public dealerAccounts = [];
  private addressToRemoveList = [];
  private accountsToRemoveList = [];


  private message: UserMessage;
  private dealerToken; 

  public currentBalance;

  private states: State[];
  private cities = [];
  public billingPlansList;
  public companyBankAccountsList;
  public documentMask;
  public phoneNumberMask = '(00) 0000-0000';
  public mobileNumberMask = '(00) 00000-0000';
  public zipCodeMask = '00.000-000';

  public paidBankBilletFee;
  public marketWithdrawFee;

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private dealerService: DealerService,
    private stateService: StateService,
    private documentTypeService: DocumentService,
    private cityService: CityService,
    private messageService: MessageService,
    private localeService : LocaleService,
    public formatService: FormatService,
    private bankService: BankService,
    private currentService: CompanyCurrentService,
    private companyBillingPlanService: CompanyBillingPlanService,
    public loaderService: LoaderService) {

      this.dealer.companyBankAccount = new BankAccount();
      this.dealer.billingPlan = new CompanyBillingPlan();
  }
  
  public documentTypeComboConfig(){
    if(this.dealer.personType){
      this.documentTypeService.getDocumentType(this.dealer.personType).subscribe( response => {
        this.dealer.documentType = response.documentType;
        this.documentMask = response.documentType.webMask;
      });
    }
  }
  
  public addAddress(){
    if(this.dealerAddresses.length < 5){
      let address = new Address()
      address.operation = Operation.add;
      address.billingAddress = false;
      this.dealerAddresses.push(address);
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

      let account = new BankAccount();
      account.bank = new Bank();
      account.operation = Operation.add;

      this.dealerAccounts.push(account);
    
  }

  public removeAddress(address:Address, index: number){
    if(address.token){
      this.dealerAddresses[index].operation = Operation.delete;
      this.addressToRemoveList.push(this.dealerAddresses[index]);
      this.dealerAddresses.splice(index, 1);
    }else {
      this.dealerAddresses.splice(index, 1);
    }
  }

  public removeAccount(account:BankAccount, index: number){
    if(account.token){
      this.dealerAccounts[index].operation = Operation.delete;
      this.accountsToRemoveList.push(this.dealerAccounts[index]);
      this.dealerAccounts.splice(index, 1);
    }else {
      this.dealerAccounts.splice(index, 1);
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

  public findBanks(){
    this.bankService.findBanks().subscribe(response =>{
      this.banks = response.banks;
    })
  }
  
  public onSubmit(updateForm){
    if(updateForm.valid){

      this.loaderService.startLoader('updateDealerSaveButton');      
      for(var i = 0; i < this.dealerAddresses.length; i++){
        if(this.dealerAddresses[i].hasOwnProperty('operation')){
          this.dealer.addresses.push(this.dealerAddresses[i]);
        }
      }
      for(var i = 0; i < this.addressToRemoveList.length; i++){
          this.dealer.addresses.push(this.addressToRemoveList[i]);
      }

      for(var i = 0; i < this.dealerAccounts.length; i++){
        if(this.dealerAccounts[i].hasOwnProperty('operation')){
          this.dealer.bankAccounts.push(this.dealerAccounts[i]);
        }
      }
      for(var i = 0; i < this.accountsToRemoveList.length; i++){
          this.dealer.bankAccounts.push(this.accountsToRemoveList[i]);
      }

      var dealerRequest = new DealerRestRequest();
      dealerRequest = this.dealerService.parseToRequest(this.dealer);
      if(dealerRequest.bankBilletExpiredPayment == true){
        dealerRequest.bankBilletInterestPercent = this.formatService.amountToApi(dealerRequest.bankBilletInterestPercent);
        dealerRequest.bankBilletPenaltyPercent = this.formatService.amountToApi(dealerRequest.bankBilletPenaltyPercent);
      }

      this.dealerService.updateDealer(dealerRequest).subscribe(resposta => {
        var message = this.localeService.get('screen.dealer.message.success.successUpdate');
        var title = this.localeService.get('screen.commons.message.success.title');
        this.router.navigate(['/company/dealer']);
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

  public resetJurosMulta(){
    this.dealer.bankBilletInterestPercent = null;
    this.dealer.bankBilletPenaltyPercent = null;
  }
  
  public ngOnInit() {
    this.getStates();
    this.findBanks();
    this.getBankAccounts();
    this.getBillingPlans();
    this.route.params.subscribe((objeto:any) => {
      this.dealerToken = objeto.token;
      this.dealerService.getDealer(this.dealerToken).subscribe(
        response => {
          this.currentBalance = this.formatService.amountFromApi(response.currentBalance);
          this.dealer.billingPlan = new CompanyBillingPlan();
          this.dealer.companyBankAccount = new BankAccount();
          this.dealer = response.dealer;
          this.dealerAccounts = response.dealer.bankAccounts;
          this.dealerAddresses = response.dealer.addresses;
          this.dealer.addresses = [];
          this.dealer.bankAccounts = [];

          if(this.dealer.bankBilletExpiredPayment == true){
            this.dealer.bankBilletInterestPercent = this.formatService.amountFromApi(this.dealer.bankBilletInterestPercent)
            this.dealer.bankBilletPenaltyPercent = this.formatService.amountFromApi(this.dealer.bankBilletPenaltyPercent)
          } else {
            this.dealer.bankBilletInterestPercent = null;
            this.dealer.bankBilletPenaltyPercent = null;
          }

          this.dealer.bankBilletExpiredPayment = this.dealer.bankBilletExpiredPayment
          
          for(let i = 0; i < this.dealerAddresses.length; i++){
            this.getCities(i, this.dealerAddresses[i].state);
          }
          this.documentTypeComboConfig();
          this.getBillingPlan(this.dealer.billingPlan.token);
        });  
      });
    };


}
