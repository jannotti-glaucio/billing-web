import { Result } from "../../../classes/result";
import { Bank } from "../../../classes/bank";

export class BankRestResponse {
    result: Result;
    bank: Bank;
    banks: Bank[];
}