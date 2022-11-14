import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { MessageService } from "app/services/message/message.service";
import { LocaleService } from "app/services/message/locale.service";
import { LoaderService } from "app/services/loader/loader.service";
import { DealerService } from "app/services/dealer/dealer.service";
import { FormatService } from "app/services/format.service";
import { BsLocaleService } from "ngx-bootstrap";
import { SettingsService } from "app/services/settings/settings.service";
import { CompanyStatementService } from "app/services/company-statement/company-statement.service";
import { UserMessage } from "app/classes/user-message";

@Component({
    templateUrl: 'dealer-statement-report.component.html',
    styleUrls: [
      '../../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
      '../../../../../../node_modules/ladda/dist/ladda-themeless.min.css'
    ],
    encapsulation: ViewEncapsulation.None
  })
  export class DealerStatementReportComponent implements OnInit{

    public message;

    public startDate = new Date();
    public endDate = new Date();
    public dealerList;
    public statementList = [];
    public currentBalance;

    public user;
    public today;
    public dealerToken;

    constructor(private dealerService: DealerService,
      private companyStatementService: CompanyStatementService,
      private messageService: MessageService,
      public formatService: FormatService,
      private settingsService: SettingsService,
      private bsLocaleService: BsLocaleService,
      private localeService: LocaleService,
      public loaderService: LoaderService){
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

    public searchStatements(searchForm){
      if(searchForm.valid){
        this.loaderService.startLoader('statementSeachButton');
        let startDate = this.formatService.dateToApi(this.startDate);
        let endDate = this.formatService.dateToApi(this.endDate);
        this.companyStatementService.getStatements(this.dealerToken, startDate, endDate).subscribe( response => {
          response.statements.forEach(response => {
            response.amount = this.formatService.amountFromApi(response.amount);
            response.balance = this.formatService.amountFromApi(response.balance);
            if(response.payment){
              response.payment.amount = this.formatService.amountFromApi(response.payment.amount);
              response.payment.fees = this.formatService.amountFromApi(response.payment.fees);
              response.payment.netAmount = this.formatService.amountFromApi(response.payment.netAmount);
              response.payment.paidAmount = this.formatService.amountFromApi(response.payment.paidAmount);
            }
          })
          this.statementList = response.statements;
          this.currentBalance = this.formatService.amountFromApi(response.currentBalance);
        })
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

    ngOnInit(){
      this.searchDealer();
    }

  }