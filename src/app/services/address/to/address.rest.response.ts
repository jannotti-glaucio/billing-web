import { Result } from "../../../classes/result";
import { Page } from "../../../classes/page";
import { Address } from "../../../classes/address";

export class AddressRestResponse {
   
    result:         Result;
    addresses:      Address[];
    page:           Page;
}