
export class InvoiceRestRequest {
    customer:           String;
    documentNumber:     Number;
    description:        String;
    expirationDate:     String;
    amount:             Number;
    paymentMethod:      String;

    constructor(customer?:String, documentNumber?:Number, description?: String, expirationDate?: String, 
                amount?:Number, paymentMethod?: String){

        this.customer = customer;
        this.documentNumber = documentNumber;
        this.description = description;
        this.expirationDate = expirationDate;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
    }
}