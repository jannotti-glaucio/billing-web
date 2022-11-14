import { Result } from "../../../classes/result";
import { BankAccount } from "../../../classes/bank-account";

export class BankAccountRestResponse {
    result: Result;
    bankAccounts: BankAccount;
}