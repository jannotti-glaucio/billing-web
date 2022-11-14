export class CollectionRestRequest {
    
    customer: String;
    description: String;
    documentNumber: String;
    instalments: String;
    expirationDate: String;
    amount:     String;
    amountType: String;
    paymentMethod: String;

    constructor(customer?: String, description?: String, documentNumber?: String, instalments?: String, expirationDate?: String, 
        amount?: String, amountType?: String, paymentMethod?:String){

            this.customer = customer;
            this.description = description;
            this.documentNumber = documentNumber;
            this.instalments = instalments;
            this.expirationDate = expirationDate;
            this.amount = amount;
            this.amountType = amountType;
            this.paymentMethod = paymentMethod;

        }
}