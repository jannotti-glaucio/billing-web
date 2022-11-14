import { Result } from "../../../classes/result";
import { Customer } from "../../../classes/customer";
import { Page } from "../../../classes/page";

export class CustomerRestResponse {
   
    result:         Result;
    customer:       Customer;
    customers:      Customer[];
    page:           Page;
    
}