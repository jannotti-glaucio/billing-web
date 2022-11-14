import { Address } from "../../../classes/address";

export class CustomerRestRequest {
       
    id:                 Number;
    token:              String;
    personType:         String;
    name:               String;
    email:              String;
    documentType:       String;
    documentNumber:     Number;
    phoneNumber:        String;
    mobileNumber:       String;
    comments:           String;
    status:             String; 
    addresses:          Address[];
}