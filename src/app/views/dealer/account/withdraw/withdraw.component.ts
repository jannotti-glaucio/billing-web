import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { Withdraw } from '../../../../classes/withdraw';
import { DealerService } from '../../../../services/dealer/dealer.service';
import { LocaleService } from '../../../../services/message/locale.service';
import { MessageService } from '../../../../services/message/message.service';
import { FormatService } from '../../../../services/format.service';
import { StatusConverterService } from '../../../../services/status/status-converter.service';
import { BsLocaleService } from 'ngx-bootstrap';
import { SettingsService } from '../../../../services/settings/settings.service';
import { WithdrawRestRequest } from '../../../../services/to/request/withdraw-rest-request';
import { UserMessage } from '../../../../classes/user-message';
import { PagingService } from '../../../../services/paging/paging.service';
import { DealerWithdrawService } from '../../../../services/dealer-withdraw/dealer-withdraw.service';
import { LoaderService } from 'app/services/loader/loader.service';
import { InvoiceService } from 'app/services/invoice/invoice.service';
import { BankAccount } from 'app/classes/bank-account';
import { Form } from '@angular/forms';

@Component({
  templateUrl: 'withdraw.component.html',
  styleUrls: [
    '../../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../../../../node_modules/ladda/dist/ladda-themeless.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class WithdrawComponent implements OnInit{

  public message;
  public bsStartDate = new Date();
  public bsEndDate = new Date();
  public pageSize = 10;
  public withdrawAmount;
  public withdrawBankAccount = new BankAccount();

  public currentBalance;
  public withdrawList = [];
  public withdrawToCancel;
  public withdrawToShow;

  public paidBankBilletFee;
  public netAmount;
  public request = false;

  public bankAccounts;

  public disableConfirm = true;

  constructor(private dealerService: DealerService,
    private withdrawService: DealerWithdrawService,
    private localeService: LocaleService,
    private messageService: MessageService,
    public formatService: FormatService,
    private invoiceService: InvoiceService,
    public pagingService: PagingService,
    public statusConverterService: StatusConverterService,
    private bsLocaleService: BsLocaleService,
    private settingsService: SettingsService,
    public loaderService: LoaderService){
    
    //Locale exclusivo para tradução do bootstrap datepicker
    this.bsLocaleService.use(this.settingsService.getLocale());
    this.bsEndDate.setDate(this.bsEndDate.getDate() + 30);

  }

  public loadWithdrawToCancel(withdraw: Withdraw){
    this.withdrawToCancel = withdraw;
  }

  public loadWithdrawToShow(withdraw: Withdraw){
    this.withdrawToShow = withdraw;
  }

  public searchWithdraws(page?:Number){
    this.loaderService.startLoader('withdrawSearchButton');
    this.withdrawService.getWithdraws(this.bsStartDate, this.bsEndDate, page, this.pageSize ).subscribe( response => {
      response.withdraws.forEach(response => {
        response.amount = this.formatService.amountFromApi(response.amount);
        response.fees = this.formatService.amountFromApi(response.fees);
        response.netAmount = this.formatService.amountFromApi(response.netAmount);

        response.requestDate = this.formatService.dateFromApi(response.requestDate);
      })
      this.withdrawList = response.withdraws;
      this.currentBalance = this.formatService.amountFromApi(response.currentBalance);
      this.pagingService.setPaging(response.page);
    })
  }

  public getBankAccounts(){
    this.dealerService.getBankAccounts().subscribe(response => {
      this.bankAccounts = response.bankAccounts;
    });
  }

  public getWithdrawFees(amount: Number, bankAccountToken: String){
    amount = this.formatService.amountToApi(amount);
    let withdrawRestRequest = new WithdrawRestRequest();
    withdrawRestRequest.amount = amount;
    withdrawRestRequest.bankAccount = bankAccountToken;
    this.withdrawService.getWithdrawFees(withdrawRestRequest).subscribe(response => {
      this.paidBankBilletFee = this.formatService.amountFromApi(response.fees);
      this.netAmount = this.formatService.amountFromApi(response.netAmount);
      this.request = true;
    })
  }

  public deleteWithdraw(token: String){
    this.withdrawService.deleteWithdraw(token).subscribe(response => {
      var message = this.localeService.get('Solicitação de saque excluída!');
      var title = this.localeService.get('screen.commons.message.success.title');
      this.message = new UserMessage('success', title.toString(), message.toString());
      this.messageService.showMessage(this.message);
      this.searchWithdraws(0);
    });
  }

  public addWithdraw(addForm){
    if(addForm.valid){
      let withdrawRestRequest = new WithdrawRestRequest();
      withdrawRestRequest.amount = this.formatService.amountToApi(this.withdrawAmount);
      withdrawRestRequest.bankAccount = this.withdrawBankAccount.token;
      this.withdrawService.addWithdraw(withdrawRestRequest).subscribe(response => {
        var message = this.localeService.get('Solicitação de saque enviada!');
        var title = this.localeService.get('screen.commons.message.success.title');
        this.message = new UserMessage('success', title.toString(), message.toString());
        this.messageService.showMessage(this.message);
        this.searchWithdraws(0);
        this.modalClean();
      });
    }else {
      var message = this.localeService.get('screen.commons.message.error.invalidInput');
      var title = this.localeService.get('screen.commons.message.error.title');
      this.message = new UserMessage('error', title.toString(), message.toString());
      this.messageService.showMessage(this.message);
    }
  }

  public withdrawResponse(withdraw: Withdraw){
    if((withdraw.reviewDate)||(withdraw.cancelationDate)){
      return false;
    } else {
      return true;
    }
  }

  public modalClean(){
    this.withdrawAmount = null;
    this.withdrawBankAccount = new BankAccount();
    this.netAmount = null;
    this.paidBankBilletFee = null;
  }

  public confirmation(){
    if((this.withdrawAmount != null) && (this.withdrawBankAccount.token != null)){
      this.disableConfirm = false;
    }else{
      this.disableConfirm = true;
    }
  }


  ngOnInit(){
    this.searchWithdraws(0);
    this.getBankAccounts();
  }


}
