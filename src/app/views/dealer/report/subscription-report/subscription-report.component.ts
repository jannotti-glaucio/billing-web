import { ConverterService } from './../../../../services/converter.service';
import { SubscriptionStatus } from './../../../../constants/subscription-status.const';
import { Component, OnInit, ViewEncapsulation,  } from '@angular/core';
import { SubscriptionService } from '../../../../services/subscription/subscription.service';
import { FormatService } from '../../../../services/format.service';
import { PagingService } from '../../../../services/paging/paging.service';
import { BsLocaleService } from 'ngx-bootstrap';
import { SettingsService } from '../../../../services/settings/settings.service';
import { StatusConverterService } from '../../../../services/status/status-converter.service';
import { LoaderService } from 'app/services/loader/loader.service';

@Component({
  templateUrl: './subscription-report.component.html',
  styleUrls: [
    '../../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../../../../node_modules/ladda/dist/ladda-themeless.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class SubscriptionReportComponent implements OnInit{

  public bsStartDate = new Date();
  public bsEndDate = new Date();
  public dateToFilter = 'EXPIRATION';

  public status='';
  public searchKeyword = '';

  public user;
  public today;

  public subscriptionStatus = SubscriptionStatus;

  public subscriptionList = [];

  constructor(private subscriptionService: SubscriptionService,
              public formatService: FormatService,
              private bsLocaleService: BsLocaleService,
              private settingsService: SettingsService,
              public converterService: ConverterService,
              public statusConverterService: StatusConverterService,
              public loaderService: LoaderService) { 
                //Locale exclusivo para tradução do bootstrap datepicker
                this.bsLocaleService.use(this.settingsService.getLocale());
                this.bsEndDate.setDate(this.bsEndDate.getDate() + 30);

                this.user = sessionStorage.getItem("userName");
                this.today= new Date().toLocaleString(this.settingsService.getLocale());
              }


  public searchSubscription(page?:Number): void {
    this.loaderService.startLoader('subscriptionSearchButton');
    this.subscriptionService.searchSubscriptionReport(this.bsStartDate, this.bsEndDate, this.status, this.searchKeyword, this.dateToFilter).subscribe(
      response => {
        this.subscriptionList = [];
        this.subscriptionList = response.subscriptions;
        this.subscriptionList.forEach(subscription => {
          subscription.amount = this.formatService.amountFromApi(subscription.amount);
          
        })
      }
    );
  }

  public printReport(){
    window.print();
  }

  ngOnInit(){
    this.searchSubscription(0);
  }


}
