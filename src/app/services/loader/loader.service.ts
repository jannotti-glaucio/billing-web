import { Injectable} from '@angular/core';


@Injectable()
export class LoaderService {

    private buttonLoading = '';

    constructor() {
       
    }

    public startLoader(buttonName: string) {
        if(this.buttonLoading != buttonName) this.buttonLoading = buttonName;
    }

    public endLoader() {
        this.buttonLoading = '';
    }

    public isLoading(buttonName: string) {
        let isLoading = false;
        if(this.buttonLoading == buttonName) isLoading = true; 
        return isLoading;
    }



}