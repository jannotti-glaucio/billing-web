import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
@Injectable()
export class ConverterService {

    constructor(private translateService: TranslateService){

    }

    public orderTypeConvert(order : String) : String{
        var orderType : String;
        if(order === 'SUBSCRIPTION'){
            this.translateService.get('screen.commons.label.orderType.subscription', {value: 'value'}).subscribe(response => {
                orderType = response;
            });
        } else if(order === 'COLLECTION'){
            this.translateService.get('screen.commons.label.orderType.collection', {value: 'value'}).subscribe(response => {
                orderType = response;
            });
        }
        return orderType;
    }

    public frequencyTypeConvert(order : String) : String{
        var orderType : String;
        if(order === 'MONTHLY'){
            this.translateService.get('screen.commons.label.frequencyType.monthly', {value: 'value'}).subscribe(response => {
                orderType = response;
            });
        }
        return orderType;
    }

}