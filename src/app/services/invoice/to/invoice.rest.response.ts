import { Result } from "../../../classes/result";
import { Page } from "../../../classes/page";
import { Invoice } from "../../../classes/invoice";

export class InvoiceRestResponse {
   
    result:          Result;
    token:           String;
    invoice:         Invoice;
    invoices:        Invoice[];
    page:            Page;    
    totalPaidAmount: Number;
    totalFees:       Number;
    totalNetAmount:  Number;
}