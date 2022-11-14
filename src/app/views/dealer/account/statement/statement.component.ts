import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Invoice } from '../../../../classes/invoice';
import { FormatService } from '../../../../services/format.service';
import { StatementService } from '../../../../services/statement/statement.service';
import { BsLocaleService } from 'ngx-bootstrap';
import { SettingsService } from '../../../../services/settings/settings.service';
import { DealerWithdrawService } from '../../../../services/dealer-withdraw/dealer-withdraw.service'
import { WithdrawRestRequest } from '../../../../services/to/request/withdraw-rest-request';
import { DealerService } from '../../../../services/dealer/dealer.service';
import { LocaleService } from '../../../../services/message/locale.service';
import { UserMessage } from '../../../../classes/user-message';
import { MessageService } from '../../../../services/message/message.service';
import { InvoiceService } from '../../../../services/invoice/invoice.service';
import { StatusConverterService } from '../../../../services/status/status-converter.service';
import { LoaderService } from 'app/services/loader/loader.service';
import { BankAccount } from 'app/classes/bank-account';

@Component({
  templateUrl: 'statement.component.html',
  styleUrls: [
    '../../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../../../../node_modules/ladda/dist/ladda-themeless.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class StatementComponent implements OnInit{

  public message;
  public bsStartDate = new Date();
  public bsEndDate = new Date();
  public withdrawAmount;
  public withdrawBankAccount = new BankAccount();
  public disableConfirm = true;

  public amountDetails;

  public currentBalance;
  public statementList;
  public update;
  public bankAccounts;
  public invoiceToShow: Invoice = new Invoice();
  public paidBankBilletFee;
  public netAmount;
  public request = false;

  public withdrawToShow;


  constructor(private statementService: StatementService,
              private dealerService: DealerService,
              private invoiceService: InvoiceService,
              private withdrawService: DealerWithdrawService,
              private localeService: LocaleService,
              private messageService: MessageService,
              public formatService: FormatService,
              public statusConverterService: StatusConverterService,
              private bsLocaleService: BsLocaleService,
              private settingsService: SettingsService,
              public loaderService: LoaderService){
              
              //Locale exclusivo para tradução do bootstrap datepicker
              this.bsLocaleService.use(this.settingsService.getLocale());
              this.bsEndDate.setDate(this.bsEndDate.getDate() + 30);

  }

  public searchStatements(){
    this.loaderService.startLoader('statementSeachButton');
    this.statementService.getStatements(this.bsStartDate, this.bsEndDate).subscribe( response => {
      response.statements.forEach(response => {
        response.amount = this.formatService.amountFromApi(response.amount);
        response.balance = this.formatService.amountFromApi(response.balance);
        if(response.payment){
          response.payment.amount = this.formatService.amountFromApi(response.payment.amount);
          response.payment.fees = this.formatService.amountFromApi(response.payment.fees);
          response.payment.netAmount = this.formatService.amountFromApi(response.payment.netAmount);
          response.payment.paidAmount = this.formatService.amountFromApi(response.payment.paidAmount);
        }
        if(response.withdraw){
          response.withdraw.amount = this.formatService.amountFromApi(response.withdraw.amount);
          response.withdraw.fees = this.formatService.amountFromApi(response.withdraw.fees);
          response.withdraw.netAmount = this.formatService.amountFromApi(response.withdraw.netAmount);
        }
      })
      this.statementList = response.statements;
      this.currentBalance = this.formatService.amountFromApi(response.currentBalance);
    })
  }

  public getWithdrawFees(amount: Number, bankAccountToken: String){
    amount = this.formatService.amountToApi(amount);
    let withdrawRestRequest = new WithdrawRestRequest();
    withdrawRestRequest.amount = amount;
    withdrawRestRequest.bankAccount = bankAccountToken;
    this.withdrawService.getWithdrawFees(withdrawRestRequest).subscribe(response => {
      this.paidBankBilletFee = this.formatService.amountFromApi(response.fees);
      this.netAmount = this.formatService.amountFromApi(response.netAmount);
      this.request = true;
    })
  }


  public getBankAccounts(){
    this.dealerService.getBankAccounts().subscribe(response => {
      this.bankAccounts = response.bankAccounts;
    });
  }

  public addWithdraw(addForm){
    if(addForm.valid){
      let withdrawRestRequest = new WithdrawRestRequest();
      withdrawRestRequest.amount = this.formatService.amountToApi(this.withdrawAmount);
      withdrawRestRequest.bankAccount = this.withdrawBankAccount.token;
      this.withdrawService.addWithdraw(withdrawRestRequest).subscribe(response => {
        var message = this.localeService.get('Solicitação de saque enviada!');
        var title = this.localeService.get('screen.commons.message.success.title');
        this.message = new UserMessage('success', title.toString(), message.toString());
        this.messageService.showMessage(this.message);
        this.searchStatements();
        this.modalClean();
      });
    }else {
      var message = this.localeService.get('screen.commons.message.error.invalidInput');
      var title = this.localeService.get('screen.commons.message.error.title');
      this.message = new UserMessage('error', title.toString(), message.toString());
      this.messageService.showMessage(this.message);
    }
  }


  public preencheModal(invoiceToken: String){
    this.invoiceService.getInvoice(invoiceToken).subscribe(response => {
      response.invoice.convertedAmount = this.formatService.amountFromApi(response.invoice.amount);
      if(response.invoice.status == 'PAID'){
        response.invoice.paidAmount = this.formatService.amountFromApi(response.invoice.paidAmount);
        response.invoice.fees = this.formatService.amountFromApi(response.invoice.fees);
        response.invoice.netAmount = this.formatService.amountFromApi(response.invoice.netAmount);
      }
      response.invoice.expirationDate = this.formatService.dateFromApi(response.invoice.expirationDate);
      if(response.invoice.paymentDate){
        response.invoice.paymentDate = this.formatService.dateFromApi(response.invoice.paymentDate);
      }
      this.invoiceToShow = response.invoice;
    })
  }

  public modalClean(){
    this.withdrawAmount = null;
    this.withdrawBankAccount = new BankAccount();
    this.netAmount = null;
    this.paidBankBilletFee = null;
  }

  public confirmation(){
    if((this.withdrawAmount != null) && (this.withdrawBankAccount.token != null)){
      this.disableConfirm = false;
    }else{
      this.disableConfirm = true;
    }
  }

  public loadWithdrawToShow(token: String){
    this.withdrawService.getWithdraw(token).subscribe(response => {
      response.withdraw.amount = this.formatService.amountFromApi(response.withdraw.amount);
      response.withdraw.fees = this.formatService.amountFromApi(response.withdraw.fees);
      response.withdraw.netAmount = this.formatService.amountFromApi(response.withdraw.netAmount);

      this.withdrawToShow = response.withdraw;
    })
  }

  ngOnInit(){
    this.searchStatements();
    this.getBankAccounts();
  }

}
