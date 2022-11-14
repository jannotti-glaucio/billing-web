import { Injectable} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class LocaleService {

    constructor(private translateService: TranslateService, 
                ) {
       
    }

    public get(messagePath: string): String {
        var message;
        this.translateService.get(messagePath).subscribe(response => {
            message = response;
        })

        return message;
    }
}