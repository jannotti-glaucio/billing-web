import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Dealer } from '../../../classes/dealer';
import { DealerService } from '../../../services/dealer/dealer.service';
import { PagingService } from '../../../services/paging/paging.service';
import { StatusConverterService } from '../../../services/status/status-converter.service';
import { UserMessage } from '../../../classes/user-message';
import { MessageService } from '../../../services/message/message.service';
import { LocaleService } from '../../../services/message/locale.service';
import { LoaderService } from 'app/services/loader/loader.service';


@Component({
  templateUrl: 'dealer.component.html',
  styleUrls: [
    '../../../../../node_modules/ladda/dist/ladda-themeless.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class DealerComponent implements OnInit{

  public dealerList = [];

  private message: UserMessage;
  
  public dealerToRemove: Dealer;
  public idToRemove;

  public searchKeyword = '';
  public pageSize = 10;

  constructor(private router: Router, 
              private dealerService: DealerService,
              private messageService: MessageService,
              public pagingService: PagingService,
              private statusConverterService: StatusConverterService,
              private userMessageService: LocaleService,
              public loaderService: LoaderService){

  }

  public searchDealer(page?:Number): void {
    this.loaderService.startLoader('dealerSearchButton');
    const size = this.pageSize;
    this.dealerService.searchDealer(this.searchKeyword, page, size).subscribe(response => {
        this.dealerList = [];
        this.dealerList = response.dealers;
        
        this.pagingService.setPaging(response.page);
      }
    );
  }

  updateDealer(token: String){
    this.router.navigate(['/company/dealer/update-dealer', token]);
  }

  modalExcluir(dealer, i){
   this.dealerToRemove = dealer;
   this.idToRemove = i;
  }

  public deleteDealer(token:String): void {
    this.dealerService.deleteDealer(token).subscribe((response) => {
      var message = this.userMessageService.get('screen.dealer.message.success.successDelete');
      var title = this.userMessageService.get('screen.commons.message.success.title');
      this.message = new UserMessage('success', title.toString(), message.toString());
      this.messageService.showMessage(this.message);
      this.searchDealer();
    });    
  }

  public ngOnInit(){
    this.searchDealer();
  }


}
