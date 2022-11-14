import { Result } from "../../../classes/result";
import { CompanyBillingPlan } from "app/classes/company-billing-plan";

export class CompanyBillingPlanRestResponse{
    result: Result;
    billingPlan: CompanyBillingPlan;
    billingPlans: CompanyBillingPlan[];
}