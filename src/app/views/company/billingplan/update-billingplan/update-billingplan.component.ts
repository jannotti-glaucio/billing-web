import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyBillingPlan } from 'app/classes/company-billing-plan';
import { CompanyBillingPlanService } from 'app/services/billing-plan/company-billing-plan.service';
import { LoaderService } from 'app/services/loader/loader.service';
import { UserMessage } from '../../../../classes/user-message';
import { LocaleService } from '../../../../services/message/locale.service';
import { MessageService } from '../../../../services/message/message.service';
import { CompanyBillingPlanRestRequest } from 'app/services/billing-plan/to/company-billing-plan-rest-request';
import { FormatService } from 'app/services/format.service';
import { PagingService } from 'app/services/paging/paging.service';
import { DealerService } from 'app/services/dealer/dealer.service';

@Component({
  templateUrl: './update-billingplan.component.html',
  styleUrls: [
    '../../../../../../node_modules/ladda/dist/ladda-themeless.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class UpdateBillingPlanComponent implements OnInit{

  public billingPlanToUpdate: CompanyBillingPlan;

  public billingPlanRestRequest = new CompanyBillingPlanRestRequest();

  private billingPlanToken;

  public dealerList;

  private message: UserMessage;

  public pageSize = 10;

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private companyBillingPlanService: CompanyBillingPlanService,
    private messageService: MessageService,
    private localeService : LocaleService,
    private dealerService: DealerService,
    public pagingService: PagingService,
    public formatService: FormatService,
    public loaderService: LoaderService) {

  }
  
  public onSubmit(updateForm){
   if(updateForm.valid){
      this.loaderService.startLoader('updateBillingPlanButton');
      this.billingPlanRestRequest.marketWithdrawFee = this.formatService.amountToApi(this.billingPlanRestRequest.marketWithdrawFee);
      this.billingPlanRestRequest.paidBankBilletFee = this.formatService.amountToApi(this.billingPlanRestRequest.paidBankBilletFee);
      this.companyBillingPlanService.update(this.billingPlanToken, this.billingPlanRestRequest).subscribe(resposta => {
        var message = this.localeService.get('Atualizado com sucesso');
        var title = this.localeService.get('screen.commons.message.success.title');
        this.router.navigate(['/company/billingplan']);
        this.message = new UserMessage('success', title.toString(), message.toString());
        this.messageService.showMessage(this.message);
      });
    } else {
      var message = this.localeService.get('screen.commons.message.error.invalidInput');
      var title = this.localeService.get('screen.commons.message.success.title');
      this.message = new UserMessage('error',  title.toString(), message.toString());
      this.messageService.showMessage(this.message);
    }
  }

  public searchDealer(page?:Number): void {
    this.loaderService.startLoader('dealerSearchButton');
    const size = this.pageSize;
    this.dealerService.findByBillingPlan(this.billingPlanToken, page, size).subscribe(response => {
        this.dealerList = [];
        this.dealerList = response.dealers;
        
        this.pagingService.setPaging(response.page);
      }
    );
  }
  
  public ngOnInit() {
    
    this.route.params.subscribe((objeto:any) => {
      this.companyBillingPlanService.get(objeto.token).subscribe(
        response => {
          this.billingPlanToken = response.billingPlan.token;
          response.billingPlan.marketWithdrawFee = this.formatService.amountFromApi(response.billingPlan.marketWithdrawFee);
          response.billingPlan.paidBankBilletFee = this.formatService.amountFromApi(response.billingPlan.paidBankBilletFee);
          this.billingPlanRestRequest = this.companyBillingPlanService.parseBillingPlanToRequest(response.billingPlan);
          this.searchDealer();
        });
    });

    };


}
