import { Address } from './address';
import { DocumentType } from './document-type';
import { Company } from './company';
import { BankAccount } from './bank-account';
import { CompanyBillingPlan } from './company-billing-plan';

export class Dealer {
    
    name: String;
    company: Company;
    token: String;
    personType: String;
    documentType:   DocumentType;
    documentNumber: String;
    phoneNumber: String;
    mobileNumber: String;
    email: String;
    comments: String;
    status: String;
    addresses: Address[];
    billingPlan: CompanyBillingPlan;
    bankBilletInstructions: String;
    companyBankAccount: BankAccount;
    bankAccounts: BankAccount[];

    bankBilletExpiredPayment: Boolean;
    bankBilletPenaltyPercent: Number;
    bankBilletInterestPercent: Number;
}