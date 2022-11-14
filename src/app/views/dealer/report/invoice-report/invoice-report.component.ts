import { Component, ViewEncapsulation,  } from '@angular/core';
import { FormatService } from '../../../../services/format.service';
import { BsLocaleService } from 'ngx-bootstrap';
import { SettingsService } from '../../../../services/settings/settings.service';
import { PagingService } from '../../../../services/paging/paging.service';
import { StatusConverterService } from '../../../../services/status/status-converter.service';
import { InvoiceService } from '../../../../services/invoice/invoice.service';
import { InvoiceStatus } from '../../../../constants/invoice.status.const';
import { LoaderService } from 'app/services/loader/loader.service';

@Component({
  templateUrl: './invoice-report.component.html',
  styleUrls: [
    '../../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../../../../node_modules/ladda/dist/ladda-themeless.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class InvoiceReportComponent {

  public startDate = new Date();
  public endDate = new Date();
  public dateToFilter = 'EXPIRATION';

  public status='';
  public searchKeyword = '';
  public pageSize = 10;

  public invoiceList = [];
  public totalNetAmount;
  public user;
  public today;

  public invoiceStatus = InvoiceStatus;

  constructor(private  invoiceService: InvoiceService,
              public formatService: FormatService,
              private bsLocaleService: BsLocaleService,
              private settingsService: SettingsService,
              public pagingService: PagingService,
              public statusConverterService: StatusConverterService,
              public loaderService: LoaderService
              ) { 
                //Locale exclusivo para tradução do bootstrap datepicker
                this.bsLocaleService.use(this.settingsService.getLocale());
                this.endDate.setDate(this.endDate.getDate() + 30);

                this.user = sessionStorage.getItem("userName");
                this.today= new Date().toLocaleString(this.settingsService.getLocale());
              }
        
  public searchInvoices(): void {
    this.loaderService.startLoader('dealerInvoiceReportSearchButton');
    this.invoiceService.searchInvoiceToReport(this.startDate, this.endDate, this.status, this.searchKeyword, this.dateToFilter).subscribe(
      response => {

          this.invoiceList = [];
          response.invoices.forEach(invoice => {
              invoice.amount = this.formatService.amountFromApi(invoice.amount);
              invoice.paidAmount = this.formatService.amountFromApi(invoice.paidAmount);
              invoice.fees = this.formatService.amountFromApi(invoice.fees);
              invoice.netAmount = this.formatService.amountFromApi(invoice.netAmount);
            });
          this.invoiceList = response.invoices;
          this.totalNetAmount = this.formatService.amountFromApi(response.totalNetAmount);
      }
    );
  }

  public printReport(){
    window.print();
  }

  ngOnInit(){
    this.searchInvoices();
  }

}
