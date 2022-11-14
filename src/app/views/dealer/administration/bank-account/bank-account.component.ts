import { Component} from '@angular/core';
import { BankAccount } from '../../../../classes/bank-account';

@Component({
  templateUrl: 'bank-account.component.html'
})
export class BankAccountComponent{

  private bankaccount1: BankAccount = new BankAccount();
  private bankaccount2: BankAccount = new BankAccount();

  public newBankAccount: BankAccount = new BankAccount();
  public bankAccountToRemove: BankAccount;
  private idToRemove;

  public bankAccountList = [];

  constructor(){
    this.bankAccountList.push(this.bankaccount1, this.bankaccount2);
  }

  modalExcluir(bankAccount, i){
    this.bankAccountToRemove = bankAccount;
    this.idToRemove = i;
   }
 
   public remove(){
     this.bankAccountList.splice(this.idToRemove, 1);
   }
}
