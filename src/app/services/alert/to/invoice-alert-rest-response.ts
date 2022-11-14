import { Result } from "app/classes/result";
import { InvoiceAlert } from "app/classes/invoice-alert";

export class InvoiceAlertRestResponse {
    result: Result;
    invoiceAlerts: InvoiceAlert[];
}