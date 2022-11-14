import { Result } from "../../../classes/result";
import { Page } from "../../../classes/page";
import { DocumentType } from "../../../classes/document-type";

export class DocumentTypeRestResponse {
   
    result:         Result;
    documentTypes:  DocumentType[];
    documentType:   DocumentType;
    page:           Page;
    
}