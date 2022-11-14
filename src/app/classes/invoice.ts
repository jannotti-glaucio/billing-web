import { Order } from './order';
import { Customer } from './customer';
import { BankBillet } from './bank-billet';

export class Invoice {

    id:                 Number;
    customer:           Customer;
    instalment:        Number;
    documentNumber:     Number;
    expirationDate:     Date;
    amount:             Number;
    convertedAmount:    Number;
    description:        String;
    paymentMethod:      String;
    token:              String;
    status:             string;
    cancelationDate:    Date;
    bankBillet:         BankBillet;
    paymentDate:        Date;
    paidAmount:      Number;
    fees:               Number;
    netAmount:          Number;
    order:              Order;

    constructor( id?: Number, customer?: Customer, instalment?: Number, expirationDate?: Date,
        amount?: Number, description?: String, paymentMethod?: String, token?: String,
        status?: string, cancelationDate?: Date, bankBillet?: BankBillet, order?: Order) {
        this.id = id;
        this.customer = customer;
        this.instalment = instalment;
        this.expirationDate = expirationDate;
        this.amount = amount;
        this.description = description;
        this.paymentMethod = paymentMethod;
        this.token = token;
        this.status = status;
        this.cancelationDate = cancelationDate;
        this.bankBillet = bankBillet;
        this.order = order;
    };
}
