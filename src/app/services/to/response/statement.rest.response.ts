import { Result } from "../../../classes/result";
import { Page } from "../../../classes/page";
import { Statement } from "../../../classes/statement";

export class StatementRestResponse {
   
    result:             Result;
    statement:          Statement;
    statements:         Statement[];
    currentBalance:     Number;
    page:               Page;
    
}