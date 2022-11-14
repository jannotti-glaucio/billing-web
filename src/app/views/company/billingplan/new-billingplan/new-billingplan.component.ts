import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService } from '../../../../services/message/message.service';
import { LocaleService } from '../../../../services/message/locale.service';
import { UserMessage } from '../../../../classes/user-message';
import { Router } from '@angular/router';
import { CompanyCurrentService } from '../../../../services/company-current/company-current.service';
import { LoaderService } from 'app/services/loader/loader.service';
import { CompanyBillingPlanService } from 'app/services/billing-plan/company-billing-plan.service';
import { CompanyBillingPlanRestRequest } from 'app/services/billing-plan/to/company-billing-plan-rest-request';
import { FormatService } from 'app/services/format.service';

@Component({
  templateUrl: './new-billingplan.component.html',
  styleUrls: [
    '../../../../../../node_modules/ladda/dist/ladda-themeless.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class NewBillingPlanComponent implements OnInit{
  
  public billingPlanRestRequest = new CompanyBillingPlanRestRequest();

  private message: UserMessage;
   
  constructor(private router: Router,
              private companyBillingPlanService: CompanyBillingPlanService,
              private messageService: MessageService,
              public formatService: FormatService,
              private localeService: LocaleService,
              public currentService: CompanyCurrentService,
              public loaderService: LoaderService) { 


  }

  public onSubmit(insertForm){
    if(insertForm.valid){
      this.loaderService.startLoader('newBillingPlanButton');
      this.billingPlanRestRequest.marketWithdrawFee = this.formatService.amountToApi(this.billingPlanRestRequest.marketWithdrawFee);
      this.billingPlanRestRequest.paidBankBilletFee = this.formatService.amountToApi(this.billingPlanRestRequest.paidBankBilletFee);
      this.companyBillingPlanService.add(this.billingPlanRestRequest).subscribe(response => {
        var message = this.localeService.get('Plano inserido com sucesso!');
        var title = this.localeService.get('screen.commons.message.success.title');
        this.router.navigate(['/company/billingplan']);
        this.message = new UserMessage('success', title.toString(), message.toString());
        this.messageService.showMessage(this.message);
      });
    } else {
      var message = this.localeService.get('screen.commons.message.error.invalidInput');
      var title = this.localeService.get('screen.commons.message.error.title');
      this.message = new UserMessage('error', title.toString(), message.toString());
      this.messageService.showMessage(this.message);
    }
  }

  public ngOnInit() {

  }


}
