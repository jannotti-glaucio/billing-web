import { AlertType } from "./alert-type";
import { Invoice } from "./invoice";

export class InvoiceAlert {
    invoice: Invoice;
    mediaType: String;
    alertType: AlertType;
    status: String;
    creationDate: Date;
}