import { Component, ViewEncapsulation } from '@angular/core';
import { CompanyInvoiceService } from '../../../../services/company-invoice/company-invoice.service';
import { FormatService } from '../../../../services/format.service';
import { BsLocaleService } from 'ngx-bootstrap';
import { SettingsService } from '../../../../services/settings/settings.service';
import { PagingService } from '../../../../services/paging/paging.service';
import { StatusConverterService } from '../../../../services/status/status-converter.service';
import { DealerService } from '../../../../services/dealer/dealer.service';
import { UserMessage } from '../../../../classes/user-message';
import { LocaleService } from '../../../../services/message/locale.service';
import { MessageService } from '../../../../services/message/message.service';
import { InvoiceStatus } from '../../../../constants/invoice.status.const';
import { LoaderService } from 'app/services/loader/loader.service';
import { Invoice } from 'app/classes/invoice';

@Component({
  templateUrl: 'company-invoice-report.component.html',
  styleUrls: [
    '../../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../../../../node_modules/ladda/dist/ladda-themeless.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class CompanyInvoiceReportComponent{

  private message;
  public startDate = new Date();
  public endDate = new Date();
  public dateToFilter = 'EXPIRATION';
  public dealerToken;

  public dealerList;

  public status='';
  public searchKeyword = '';
  public pageSize = 10;

  public invoiceList = [];
  public user;
  public today;
  
  public totalPaidAmount;
  public totalFees;
  public totalNetAmount;

  public invoiceStatus = InvoiceStatus;

  constructor(private companyInvoiceService: CompanyInvoiceService,
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

  public searchInvoices(searchForm, page?:Number): void {
    if(searchForm.valid){
      this.loaderService.startLoader('companyInvoiceReportSearchButton');
      this.companyInvoiceService.searchInvoice(this.dealerToken, this.startDate, this.endDate, this.status, page, this.pageSize, this.dateToFilter).subscribe(
        response => {
            this.invoiceList = [];
            response.invoices.forEach(invoice => {
            
                invoice.amount = this.formatService.amountFromApi(invoice.amount);
                invoice.paidAmount = this.formatService.amountFromApi(invoice.paidAmount);
                invoice.fees = this.formatService.amountFromApi(invoice.fees);
                invoice.netAmount = this.formatService.amountFromApi(invoice.netAmount);

                this.invoiceList.push(invoice);
            
            });
            
            this.totalPaidAmount = this.formatService.amountFromApi(response.totalPaidAmount);
            this.totalFees = this.formatService.amountFromApi(response.totalFees);
            this.totalNetAmount = this.formatService.amountFromApi(response.totalNetAmount);            

            this.pagingService.setPaging(response.page);
        }
      );
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
