import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { PagingService } from '../../../services/paging/paging.service';
import { StatusConverterService } from '../../../services/status/status-converter.service';
import { UserMessage } from '../../../classes/user-message';
import { MessageService } from '../../../services/message/message.service';
import { LocaleService } from '../../../services/message/locale.service';
import { LoaderService } from 'app/services/loader/loader.service';
import { CompanyBillingPlanService } from 'app/services/billing-plan/company-billing-plan.service';
import { CompanyBillingPlan } from 'app/classes/company-billing-plan';
import { FormatService } from 'app/services/format.service';


@Component({
  templateUrl: 'billingplan.component.html',
  styleUrls: [
    '../../../../../node_modules/ladda/dist/ladda-themeless.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class BillingPlanComponent implements OnInit{

  public billingPlanList;

  private message: UserMessage;
  
  public billingPlanToRemove: CompanyBillingPlan;

 
  constructor(private router: Router, 
              private companyBillingPlanService: CompanyBillingPlanService,
              public formatService: FormatService,
              private messageService: MessageService,
              public pagingService: PagingService,
              private statusConverterService: StatusConverterService,
              private userMessageService: LocaleService,
              public loaderService: LoaderService){
  }

  public searchBillingPlans(): void {
    this.companyBillingPlanService.find().subscribe(
      response => {
        this.billingPlanList = [];
        response.billingPlans.forEach(response => {
          response.marketWithdrawFee = this.formatService.amountFromApi(response.marketWithdrawFee);  
          response.paidBankBilletFee = this.formatService.amountFromApi(response.paidBankBilletFee);
        })
        this.billingPlanList = response.billingPlans;
      });
  }

  updateBillingPlan(token: String){
    this.router.navigate(['/company/billingplan/update-billingplan', token]);
  }

  loadBillingPlanToRemove(billingPlan: CompanyBillingPlan){
   this.billingPlanToRemove = billingPlan;
  }

  public deleteBillingPlan(token:String): void {
   this.companyBillingPlanService.delete(token).subscribe((response) => {
      var message = this.userMessageService.get('Usuário excluído!');
      var title = this.userMessageService.get('screen.commons.message.success.title');
      this.message = new UserMessage('success', title.toString(), message.toString());
      this.messageService.showMessage(this.message);
      this.searchBillingPlans();
    });  
  }

  public ngOnInit(){
    this.searchBillingPlans();

  }


}
