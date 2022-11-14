import { Component, OnInit, ViewEncapsulation,  } from '@angular/core';
import { CollectionService } from '../../../../services/collection/collection.service';
import { FormatService } from '../../../../services/format.service';
import { PagingService } from '../../../../services/paging/paging.service';
import { BsLocaleService } from 'ngx-bootstrap';
import { SettingsService } from '../../../../services/settings/settings.service';
import { StatusConverterService } from '../../../../services/status/status-converter.service';
import { CollectionStatus } from '../../../../constants/collection.status.const';
import { LoaderService } from 'app/services/loader/loader.service';

@Component({
  templateUrl: './collection-report.component.html',
  styleUrls: [
    '../../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../../../../node_modules/ladda/dist/ladda-themeless.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class CollectionReportComponent implements OnInit{

  public bsStartDate = new Date();
  public bsEndDate = new Date();
  public dateToFilter = 'EXPIRATION';

  public status='';
  public searchKeyword = '';

  public user;
  public today;

  public collectionStatus = CollectionStatus;

  public collectionList = [];

  constructor(private collectionService: CollectionService,
              public formatService: FormatService,
              private bsLocaleService: BsLocaleService,
              private settingsService: SettingsService,
              public pagingService: PagingService,
              public statusConverterService: StatusConverterService,
              public loaderService: LoaderService) { 
                //Locale exclusivo para tradução do bootstrap datepicker
                this.bsLocaleService.use(this.settingsService.getLocale());
                this.bsEndDate.setDate(this.bsEndDate.getDate() + 30);

                this.user = sessionStorage.getItem("userName");
                this.today= new Date().toLocaleString(this.settingsService.getLocale());
              }


  public searchCollection(): void {
    this.loaderService.startLoader('dealerCollectionReportSearchButton');
    this.collectionService.searchCollectionReport(this.bsStartDate, this.bsEndDate, this.status, this.searchKeyword, this.dateToFilter).subscribe(
      response => {
        this.collectionList = response.collections;
        this.collectionList.forEach(collection => {
          collection.totalAmount = this.formatService.amountFromApi(collection.totalAmount);
          collection.paidAmount = this.formatService.amountFromApi(collection.paidAmount);
          collection.pendingAmount = this.formatService.amountFromApi(collection.pendingAmount);
        })
      }
    );
  }

  public printReport(){
    window.print();
  }

  ngOnInit(){
    this.searchCollection();
  }


}
