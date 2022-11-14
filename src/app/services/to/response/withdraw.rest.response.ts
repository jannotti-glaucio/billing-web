import { Result } from "../../../classes/result";
import { Page } from "../../../classes/page";
import { Withdraw } from "../../../classes/withdraw";

export class WithdrawRestResponse {
   
    result:             Result;
    withdraw:          Withdraw;
    withdraws:         Withdraw[];
    currentBalance:     Number;
    page:               Page;
    totalAmount: Number;
    totalFees: Number;
    totalNetAmount: Number;
}