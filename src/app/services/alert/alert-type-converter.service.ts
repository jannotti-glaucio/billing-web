import { Injectable} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AlertTypeConverterService {

    constructor(private translateService: TranslateService){

    }

    public convert(alertTypeCode : String) : String{
        var alertTypeName : String;
        if(alertTypeCode === 'IS'){
            this.translateService.get('screen.invoice.label.alertType.invoiceSend', {value: 'value'}).subscribe(response => {
                alertTypeName = response;
            });
        } else if(alertTypeCode === 'CIE'){
            this.translateService.get('screen.invoice.label.alertType.collectionInvoiceExpiring', {value: 'value'}).subscribe(response => {
                alertTypeName = response;
            });
        }
        return alertTypeName;
    }
}
