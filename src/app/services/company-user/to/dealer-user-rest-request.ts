import { Dealer } from "../../../classes/dealer";

export class DealerUserRestRequest {
    token: String;
    userName: String;
    email: String;
    realName: String;
    password: String;
    dealer: Dealer;
}