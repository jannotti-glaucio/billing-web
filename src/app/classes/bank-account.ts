import { Bank } from "./bank";

export class BankAccount {
    token: String;
    bank : Bank;
    agencyNumber: String;
    agencyCheckDigit: String;
    accountNumber: String;
    accountCheckDigit: String;
    description: String;
    operation: String;    
}