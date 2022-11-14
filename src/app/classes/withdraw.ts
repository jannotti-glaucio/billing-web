import { User } from "./user";
import { BankAccount } from "./bank-account";
import { MarketAccount } from "./market-account";

export class Withdraw {
    token: String;
    amount: Number;	
    bankAccount: BankAccount;
    requestDate: Date;
    requesterUser: User;
    cancelationDate: Date;
    releaseDate: Date;
    reviewDate: Date;
    reviewerUser: User;
    status: String;	
    denyReason: String;
    marketAccount: MarketAccount;
    fees: Number;
    netAmount: Number;



    constructor(token?: String, amount?: Number, requestDate?: Date, requesterUser?: User, status?: String){
        
        this.token = token;
        this.amount = amount;
        this.requestDate = requestDate;
        this.requesterUser = requesterUser;
        this.status = status;
    }
}

