import { Injectable} from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { UserMessage } from '../../classes/user-message';


@Injectable()
export class MessageService {

    public message: UserMessage;

    constructor(private toasterService: ToasterService, 
                ) {
       
    }

    public showMessage(message: UserMessage) {
        this.toasterService.clear();
        this.toasterService.pop(message.type, message.title, message.body);
    }



}