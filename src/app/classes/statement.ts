import { Dealer } from "./dealer";
import { BankAccount } from "./bank-account";
import { Payment } from "./payment";
import { StatementType } from "./statement-type";
import { Withdraw } from "./withdraw";

export class Statement {

    id: Number;
    dealer: Dealer;
    bankAccount: BankAccount;
    token: String;
    requestDate: Date;
    amount: Number;
    balance: Number;
    payment: Payment;
    withdraw: Withdraw;
    status: String;
    statementDate: Date;
    type: StatementType;

    constructor(){}
}