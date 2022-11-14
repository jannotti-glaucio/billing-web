import { Customer } from "./customer";
import { Invoice } from "./invoice";

export class Collection{
    id:                     Number;
    customer:               Customer;
    description:            String;
    token:                  String;
    creationDate:           Date;
    status:                 String;
    cancelationDate:        Date;
    instalments:           Number;
    invoiceAmount:          Number;
    totalAmount:            Number;
    paidAmount:             Number;
    pendingAmount:          Number;
    documentNumber:         Number;
    paidInvoices:      Number;
    expiredInvoices:   Number;
    canceledInvoices:  Number;

    invoices:               Invoice[];

    constructor(id?:Number, customer?: Customer, description?:String, token?:String, 
        creationDate?:Date, status?:String, cancelationDate?:Date, instalments?: Number, invoiceAmount?: Number,
        totalAmount?:Number, paidAmount?:Number, pendingAmount?:Number, paidInvoices?: Number, expiredInvoices?: Number,
        canceledInvoices?: Number, invoices?: Invoice[]){

    this.id =                     id;
    this.customer =               customer;
    this.description =            description;
    this.token =                  token;
    this.creationDate =           creationDate;
    this.status =                 status;
    this.cancelationDate =        cancelationDate;
    this.instalments =          instalments;
    this.invoiceAmount =          invoiceAmount;
    this.totalAmount =            totalAmount;
    this.paidAmount =             paidAmount;
    this.pendingAmount =            pendingAmount;
    this.paidInvoices =      paidInvoices;
    this.expiredInvoices =   expiredInvoices;
    this.canceledInvoices = canceledInvoices;
    this.invoices =               invoices;

    }
}