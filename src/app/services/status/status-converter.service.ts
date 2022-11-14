import { Injectable} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class StatusConverterService {

    constructor(private translateService: TranslateService){

    }

    public convertInvoiceStatus(status : String) : String{
        var statusName : String;
        if(status === 'OPEN'){
            this.translateService.get('screen.invoice.label.statusType.open', {value: 'value'}).subscribe(response => {
                statusName = response;
            });
        } else if(status === 'CANCELED'){
            this.translateService.get('screen.invoice.label.statusType.canceled', {value: 'value'}).subscribe(response => {
                statusName = response;
            });
        } else if(status === 'PAID'){
            this.translateService.get('screen.invoice.label.statusType.paid', {value: 'value'}).subscribe(response => {
                statusName = response;
            });
        } else if(status === 'EXPIRED'){
            this.translateService.get('screen.invoice.label.statusType.expired', {value: 'value'}).subscribe(response => {
                statusName = response;
            });
        } else if(status === 'PENDING'){
            this.translateService.get('screen.invoice.label.statusType.pending', {value: 'value'}).subscribe(response => {
                statusName = response;
            });
        }
        return statusName;
    }

    public convertCollectionStatus(status : String) : String{
        var statusName : String;
        if(status === 'OPEN'){
            this.translateService.get('screen.collection.label.statusType.open', {value: 'value'}).subscribe(response => {
                statusName = response;
            });
        } else if(status === 'CANCELED'){
            this.translateService.get('screen.collection.label.statusType.canceled', {value: 'value'}).subscribe(response => {
                statusName = response;
            });
        } else if(status === 'FINISHED'){
            this.translateService.get('screen.collection.label.statusType.finished', {value: 'value'}).subscribe(response => {
                statusName = response;
            });
        }
        return statusName;
    }

    public convertSubscriptionStatus(status : String) : String{
        var statusName : String;
        if(status === 'OPEN'){
            this.translateService.get('screen.subscription.label.statusType.open', {value: 'value'}).subscribe(response => {
                statusName = response;
            });
        } else if(status === 'CANCELED'){
            this.translateService.get('screen.subscription.label.statusType.canceled', {value: 'value'}).subscribe(response => {
                statusName = response;
            });
        } else if(status === 'SUSPENDED'){
            this.translateService.get('screen.subscription.label.statusType.suspended', {value: 'value'}).subscribe(response => {
                statusName = response;
            });
        }
        return statusName;
    }


    public convertEntityStatus(status : String) : String{
        var statusName : String;
        if(status === 'ACTIVE'){
            this.translateService.get('screen.customer.label.statusType.active', {value: 'value'}).subscribe(response => {
                statusName = response;
            });
        } else if(status === 'BLOCKED'){
            this.translateService.get('screen.customer.label.statusType.blocked', {value: 'value'}).subscribe(response => {
                statusName = response;
            });
        }
        return statusName;
    }

    public convertDealerStatus(status : String) : String{
        var statusName : String;
        if(status === 'ACTIVE'){
            this.translateService.get('screen.dealer.label.statusType.active', {value: 'value'}).subscribe(response => {
                statusName = response;
            });
        } else if(status === 'BLOCKED'){
            this.translateService.get('screen.dealer.label.statusType.blocked', {value: 'value'}).subscribe(response => {
                statusName = response;
            });
        }
        return statusName;
    }

    public convertWithdrawStatus(status : String) : String{
        var statusName : String;
        if(status === 'REQUESTED'){
            this.translateService.get('screen.withdraw.label.statusType.requested', {value: 'value'}).subscribe(response => {
                statusName = response;
            });
        } else if(status === 'APPROVED'){
            this.translateService.get('screen.withdraw.label.statusType.approved', {value: 'value'}).subscribe(response => {
                statusName = response;
            });
        } else if(status === 'DENIED'){
            this.translateService.get('screen.withdraw.label.statusType.denied', {value: 'value'}).subscribe(response => {
                statusName = response;
            });
        } else if(status === 'CANCELED'){
            this.translateService.get('screen.withdraw.label.statusType.canceled', {value: 'value'}).subscribe(response => {
                statusName = response;
            });
        } else if(status === 'RELEASED'){
            this.translateService.get('screen.withdraw.label.statusType.released', {value: 'value'}).subscribe(response => {
                statusName = response;
            });
        }
        return statusName;
    }


}