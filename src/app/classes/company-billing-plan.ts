import { Company } from "./company";

export class CompanyBillingPlan {
    token: String;
    description: String;
    company: Company;
    paidBankBilletFee: Number;
    marketWithdrawFee: Number;
    status: String;
}