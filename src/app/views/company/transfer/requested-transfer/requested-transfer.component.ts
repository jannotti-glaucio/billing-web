import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { BankAccount } from '../../../../classes/bank-account';
import { DealerService } from '../../../../services/dealer/dealer.service';
import { Withdraw } from '../../../../classes/withdraw';
import { CompanyWithdrawService } from '../../../../services/company-withdraw/company-withdraw.service';
import { PagingService } from '../../../../services/paging/paging.service';
import { FormatService } from '../../../../services/format.service';
import { StatusConverterService } from '../../../../services/status/status-converter.service';
import { WithdrawRestRequest } from '../../../../services/to/request/withdraw-rest-request';
import { LocaleService } from '../../../../services/message/locale.service';
import { UserMessage } from '../../../../classes/user-message';
import { MessageService } from '../../../../services/message/message.service';
import {IOption} from 'ng-select';
import { WithdrawDenyRestRequest } from '../../../../services/to/request/withdraw-deny-rest-request';
import { LoaderService } from 'app/services/loader/loader.service';


@Component({
  templateUrl: 'requested-transfer.component.html',
  styleUrls: [
    '../../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../../../../node_modules/ladda/dist/ladda-themeless.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class RequestedTransferComponent implements OnInit{

  public message;
  public bsStartDate = new Date();
  public bsEndDate = new Date();
  public dealerToken;
  public pageSize = 10;

  public withdrawToDeny;
  public withdrawToApprove;
  public withdrawToProvide;

  public bankAccount = new BankAccount();

  public withdrawList = [];
  public dealerList: Array<IOption>;

  constructor(private localeService: LocaleService,
              private dealerService: DealerService,
              private whithdrawService: CompanyWithdrawService,
              public pagingService: PagingService,
              public formatService: FormatService,
              public messageService: MessageService,
              public statusConverterService: StatusConverterService,
              public loaderService: LoaderService) { 
   
  }

  public searchDealer(){
    this.dealerService.searchDealerNotPagging().subscribe(
      response => {
        this.dealerList = [];
        response.dealers.forEach(dealer => {
          let dealerOption = {label:'', value:''};
          dealerOption.value = dealer.token.toString();
          dealerOption.label = dealer.name.toString();
          this.dealerList.push(dealerOption);
        });
    });
  }

  public loadWithdrawToDeny(withdraw: Withdraw){
    this.withdrawToDeny = withdraw;
  }

  public loadWithdrawToApprove(withdraw: Withdraw){
    this.withdrawToApprove = withdraw;
  }

  public loadWithdrawToProvide(withdraw: Withdraw){
    this.withdrawToProvide = withdraw;
  }

  public searchWithdraws(page?: Number){
    this.loaderService.startLoader('requestedTransferSearchButton');
    this.whithdrawService.getPendingsWithdraws(this.dealerToken, page, this.pageSize).subscribe(response => {
      this.withdrawList = [];
      this.withdrawList = response.withdraws;
      if(this.withdrawList != []){
        this.withdrawList.forEach(withdraw => {
          withdraw.amount = this.formatService.amountFromApi(withdraw.amount);
          withdraw.fees = this.formatService.amountFromApi(withdraw.fees);
          withdraw.netAmount = this.formatService.amountFromApi(withdraw.netAmount);
        });
      }
      this.pagingService.setPaging(response.page);
    });
  }

  public denyWithdraw(withdraw: Withdraw){
    let withdrawDenyRequest = new WithdrawDenyRestRequest();
    withdrawDenyRequest.denyReason = withdraw.denyReason;
    this.whithdrawService.denyWithdraw(withdraw.token, withdrawDenyRequest).subscribe(response => {
      var message = this.localeService.get('screen.manageTransfer.message.success.successDenied');
      var title = this.localeService.get('screen.commons.message.success.title');
      this.message = new UserMessage('success', title.toString(), message.toString());
      this.messageService.showMessage(this.message);
      this.searchWithdraws()
    });
  }

  public approveWithdraw(withdraw: Withdraw){
    let withdrawRestRequest = new WithdrawRestRequest();
    withdrawRestRequest.amount = this.formatService.amountToApi(withdraw.amount);
    withdrawRestRequest.bankAccount = withdraw.bankAccount.token;

    this.whithdrawService.approveWithdraw(withdraw.token, withdrawRestRequest).subscribe(response => {
      var message = this.localeService.get('screen.manageTransfer.message.success.successApproved');
      var title = this.localeService.get('screen.commons.message.success.title');
      this.message = new UserMessage('success', title.toString(), message.toString());
      this.messageService.showMessage(this.message);
      this.searchWithdraws()
    });
  }

  public provideWithdraw(withdraw: Withdraw){
    let withdrawRestRequest = new WithdrawRestRequest();
    withdrawRestRequest.amount = this.formatService.amountToApi(withdraw.amount);
    withdrawRestRequest.bankAccount = withdraw.bankAccount.token;

    this.whithdrawService.releaseWithdraw(withdraw.token, withdrawRestRequest).subscribe(response => {
      var message = this.localeService.get('screen.manageTransfer.message.success.successReleased');
      var title = this.localeService.get('screen.commons.message.success.title');
      this.message = new UserMessage('success', title.toString(), message.toString());
      this.messageService.showMessage(this.message);
      this.searchWithdraws()
    });
  }

  ngOnInit() {
    this.searchWithdraws();
    this.searchDealer();
  }
}
