import { Result } from "../../../classes/result";
import { Page } from "../../../classes/page";
import { Dealer } from "../../../classes/dealer";

export class DealerRestResponse {
   
    result:         Result;
    currentBalance: Number;
    dealer:       Dealer;
    dealers:      Dealer[];
    page:           Page;
    
}