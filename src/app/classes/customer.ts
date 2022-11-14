import { Address } from './address'
import { DocumentType } from './document-type';

export class Customer {
    
    id:                 Number;
    token:              String;
    personType:         String;
    name:               String;
    email:              String;
    documentType:    DocumentType;
    documentNumber:     Number;
    phoneNumber:        String;
    mobileNumber:       String;
    comments:           String;
    status:             String; 
    addresses:          Address[];

    constructor( id?: Number, personType?: String, name?: String, email?: String, documentType?: DocumentType, 
        documentNumber?: Number, mobileNumber?: String, phoneNumber?: String, comments?:  String, 
        status?: String, addresses?: Address[]) {
        
        this.id = id;
        this.personType = personType;
        this.name = name;
        this.email = email;
        this.documentType = documentType;
        this.documentNumber = documentNumber;
        this.phoneNumber = phoneNumber;
        this.mobileNumber = mobileNumber;
        this.comments = comments;
        this.status = status;
        this.addresses = addresses;
      }
}