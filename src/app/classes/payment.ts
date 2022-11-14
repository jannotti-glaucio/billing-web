import { Invoice } from "./invoice";

export class Payment {
    token: String;
    invoice: Invoice;
    paymentMethod: String;
    amount: Number;
    paidAmount: Number;
    fees: Number;
    netAmount: Number;
}