import { Address } from "../../../classes/address";
import { BankAccountRestRequest } from "../../to/request/bank-account-rest-request";

export class DealerRestRequest {
    name:           String;
    token:          String;
    personType:     String;
    documentType:   String;
    documentNumber: String;
    phoneNumber:    String;
    mobileNumber:   String;
    email:          String;
    comments:       String;
    status:         String;
    companyBankAccount: String;
    billingPlan: String;
    bankBilletInstructions: String;
    addresses:      Address[];
    bankAccounts: BankAccountRestRequest[];

    bankBilletExpiredPayment: Boolean;
    bankBilletPenaltyPercent: Number;
    bankBilletInterestPercent: Number;
}
