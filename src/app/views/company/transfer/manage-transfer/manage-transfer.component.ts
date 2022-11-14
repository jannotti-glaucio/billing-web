import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Dealer } from '../../../../classes/dealer';
import { BankAccount } from '../../../../classes/bank-account';
import { BsLocaleService } from 'ngx-bootstrap';
import { DealerService } from '../../../../services/dealer/dealer.service';
import { Withdraw } from '../../../../classes/withdraw';
import { PagingService } from '../../../../services/paging/paging.service';
import { FormatService } from '../../../../services/format.service';
import { StatusConverterService } from '../../../../services/status/status-converter.service';
import { WithdrawRestRequest } from '../../../../services/to/request/withdraw-rest-request';
import { LocaleService } from '../../../../services/message/locale.service';
import { UserMessage } from '../../../../classes/user-message';
import { MessageService } from '../../../../services/message/message.service';
import { SettingsService } from '../../../../services/settings/settings.service';
import { CompanyWithdrawService } from '../../../../services/company-withdraw/company-withdraw.service';
import { WithdrawDenyRestRequest } from '../../../../services/to/request/withdraw-deny-rest-request';
import { WithdrawStatus } from '../../../../constants/withdraw.status.const';
import { LoaderService } from 'app/services/loader/loader.service';

@Component({
  templateUrl: 'manage-transfer.component.html',
  styleUrls: [
    '../../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../../../../node_modules/ladda/dist/ladda-themeless.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ManageTransferComponent implements OnInit{

  public message;
  public bsStartDate = new Date();
  public bsEndDate = new Date();
  public dealerToken;
  public pageSize = 10;

  public withdrawToDeny;
  public withdrawToApprove;
  public withdrawToProvide;

  public dealer = new Dealer();
  public status = '';
  public bankAccount = new BankAccount();

  public withdrawList = [];
  public dealerList;

  public withdrawStatus = WithdrawStatus;

  constructor(private localeService: LocaleService,
              private dealerService: DealerService,
              private withdrawService: CompanyWithdrawService,
              public pagingService: PagingService,
              public formatService: FormatService,
              public messageService: MessageService,
              private bsLocaleService: BsLocaleService,
              private settingsService: SettingsService,
              public statusConverterService: StatusConverterService,
              public loaderService: LoaderService) { 

              //Locale exclusivo para tradução do bootstrap datepicker
              this.bsLocaleService.use(this.settingsService.getLocale());
              this.bsEndDate.setDate(this.bsEndDate.getDate() + 30);

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
 
  public searchWithdraws(page?: Number){
    this.loaderService.startLoader('manageTransferSearchButton');
    this.withdrawService.getWithdraws(this.bsStartDate, this.bsEndDate, this.dealerToken, this.status, page, this.pageSize).subscribe(response => {
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

  public loadWithdrawToDeny(withdraw: Withdraw){
    this.withdrawToDeny = withdraw;
  }

  public loadWithdrawToApprove(withdraw: Withdraw){
    this.withdrawToApprove = withdraw;
  }

  public loadWithdrawToProvide(withdraw: Withdraw){
    this.withdrawToProvide = withdraw;
  }

  public denyWithdraw(withdraw: Withdraw){
    let withdrawDenyRequest = new WithdrawDenyRestRequest();
    withdrawDenyRequest.denyReason = withdraw.denyReason;
    this.withdrawService.denyWithdraw(withdraw.token, withdrawDenyRequest).subscribe(response => {
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

    this.withdrawService.approveWithdraw(withdraw.token, withdrawRestRequest).subscribe(response => {
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

    this.withdrawService.releaseWithdraw(withdraw.token, withdrawRestRequest).subscribe(response => {
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
