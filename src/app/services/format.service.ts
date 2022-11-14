import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";


@Injectable()
export class FormatService{

    constructor(private translate: TranslateService){    }

    public getCurrencyFormat(): String{
        var currency;
        this.translate.get('screen.commons.format.currency', {value: 'value'}).subscribe(response => {
            currency = response;
            
        });
        return currency;
    }

    public getCurrencyThousandsFormat(): String{
        var currencyThousands;
        this.translate.get('screen.commons.format.thousands', {value: 'value'}).subscribe(response => {
            currencyThousands = response;
            
        });
        return currencyThousands;
    }

    public getCurrencyDecimalFormat(): String{
        var currencyDecimal;
        this.translate.get('screen.commons.format.decimals', {value: 'value'}).subscribe(response => {
            currencyDecimal = response;
            
        });
        return currencyDecimal;
    }

    public  getDateFormat(): String{
        var date;
        this.translate.get('screen.commons.format.date', {value: 'value'}).subscribe(response => {
            date = response;   
        });
        return date;
    }

    public  getDatepickerFormat(): String{
        var date;
        this.translate.get('screen.commons.format.datepicker', {value: 'value'}).subscribe(response => {
            date = response;   
        });
        return date;
    }

    public amountFromApi(amount): Number{
        return amount/100;
    }

    public amountToApi(amount): Number{
       return  Math.round(amount*100);
    }

    public dateFromApi(date: Date){
        var newDate = date.toString().substring(0,10);
        var char = /-/gi;
        newDate = newDate.replace(char,'/');
        return new Date(newDate);
    }

    public dateToApi(date: Date){
    
        return date.toISOString().substring(0,10);
    }

}