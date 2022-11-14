import { Invoice } from 'app/classes/invoice';
import { Customer } from './customer';

export class Subscription {
    token: String;
    customer: Customer;
    description: String;
    documentNumber: Number;
    frequencyType: String;
    startDate: Date;
    endDate: Date;
    amount: number;
    paymentMethod: String;
    status: String;
    createdInvoices: Number;
    expiredInvoices: Number;
    paidInvoices: Number;
    canceledInvoices: Number;
    expirationDay: Number;

    invoices:               Invoice[];
}