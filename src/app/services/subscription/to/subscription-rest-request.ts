export class SubscriptionRestRequest {

    customer: String;
    description: String;
    documentNumber: String;
    frequencyType: String;
    startDate: String;
    endDate: String;
    amount: String;
    paymentMethod: String;

    expirationDay: String;

    constructor(customer?:String,
        description?: String,
        documentNumber?: String,
        startDate?: String,
        endDate?: String,
        amount?: String,
        frequencyType?: String,
        paymentMethod?: String,
        expirationDay?: String){

        this.customer = customer
        this.description = description;
        this.documentNumber = documentNumber;
        this.frequencyType = frequencyType;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
        this.expirationDay = expirationDay;
    }
}