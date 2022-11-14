import { Component, ViewEncapsulation } from '@angular/core';
import { DealerService } from '../../../../services/dealer/dealer.service';
import { FormatService } from '../../../../services/format.service';
import { BsLocaleService } from 'ngx-bootstrap';
import { SettingsService } from '../../../../services/settings/settings.service';
import { PagingService } from '../../../../services/paging/paging.service';
import { StatusConverterService } from '../../../../services/status/status-converter.service';
import { CompanyWithdrawService } from '../../../../services/company-withdraw/company-withdraw.service';
import { UserMessage } from '../../../../classes/user-message';
import { MessageService } from '../../../../services/message/message.service';
import { LocaleService } from '../../../../services/message/locale.service';
import { WithdrawStatus } from '../../../../constants/withdraw.status.const';
import { LoaderService } from 'app/services/loader/loader.service';

@Component({
  templateUrl: 'company-withdraw-report.component.html',
  styleUrls: [
    '../../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../../../../node_modules/ladda/dist/ladda-themeless.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class CompanyWithdrawReportComponent{

  private message;
  public startDate = new Date();
  public endDate = new Date();
  public dateToFilter = 'EXPIRATION';
  public dealerToken;

  public dealerList;

  public status='';
  public pageSize = 10;

  public withdrawList = [];
  public user;
  public today;

  public totalAmount;
  public totalFees;
  public totalNetAmount;

  public withdrawStatus = WithdrawStatus;

  constructor(private withdrawService: CompanyWithdrawService,
              private dealerService: DealerService,
              public formatService: FormatService,
              private bsLocaleService: BsLocaleService,
              private settingsService: SettingsService,
              public pagingService: PagingService,
              private messageService: MessageService,
              private localeService: LocaleService,
              public statusConverterService: StatusConverterService,
              public loaderService: LoaderService) { 
                //Locale exclusivo para tradução do bootstrap datepicker
                this.bsLocaleService.use(this.settingsService.getLocale());
                this.endDate.setDate(this.endDate.getDate() + 30);

                this.user = sessionStorage.getItem("userName");
                this.today= new Date().toLocaleString(this.settingsService.getLocale());
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

  public searchWithdraws(searchForm, page?: Number){
    if(searchForm.valid){
      this.loaderService.startLoader('companyWithdrawReportSearchButton');
      this.withdrawService.getWithdrawsReport(this.startDate, this.endDate, this.dealerToken, this.status).subscribe(response => {
        this.withdrawList = [];
        this.withdrawList = response.withdraws;
        if(this.withdrawList != []){
          this.withdrawList.forEach(withdraw => {
            withdraw.amount = this.formatService.amountFromApi(withdraw.amount);
            withdraw.fees = this.formatService.amountFromApi(withdraw.fees);
            withdraw.netAmount = this.formatService.amountFromApi(withdraw.netAmount);
          });
          this.totalAmount = this.formatService.amountFromApi(response.totalAmount);
          this.totalFees = this.formatService.amountFromApi(response.totalFees);
          this.totalNetAmount = this.formatService.amountFromApi(response.totalNetAmount);
          this.pagingService.setPaging(response.page);
        }
      });
    } else {
      var message = this.localeService.get('screen.commons.message.error.invalidInput');
      var title = this.localeService.get('screen.commons.message.error.title');
      this.message = new UserMessage('error', title.toString(), message.toString());
      this.messageService.showMessage(this.message);
    }
  }


  public printReport(){
    window.print();
  }


  ngOnInit() {
    this.searchDealer();
  }

}
