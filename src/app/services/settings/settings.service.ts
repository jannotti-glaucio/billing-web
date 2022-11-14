import { Injectable} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class SettingsService {

    constructor(private translate: TranslateService){

    }

    switchLanguage(language: string) {
        this.translate.use(language);
    }
    
    getLocale(){
        return this.translate.getDefaultLang();
    }

    

}