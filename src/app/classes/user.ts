import { Dealer } from "./dealer";
import { Company } from "./company";
import { Customer } from "./customer";
import { Role } from "./role";

export class User {
    token: String;
    email: String;
    realName: String;
    username: String;
    password: String;
    role: Role;
    status: String;
    dealer: Dealer;
    company: Company;
    customer: Customer;

}