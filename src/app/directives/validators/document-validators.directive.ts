import { Directive, ElementRef, Input, HostListener, Renderer } from '@angular/core';
import { UserMessage } from '../../classes/user-message';
import { MessageService } from '../../services/message/message.service';
import { DocumentService } from '../../services/document/document.service';

@Directive({
  selector: '[documentValidator]'
})
export class DocumentValidatorsDirective {

  private message;

  constructor(public elementRef: ElementRef, 
              private renderer: Renderer, 
              private messageService: MessageService,
              private documentTypeService:DocumentService) {  }

  @Input() documentType: string;

  @HostListener('focusout')
  setConfig() {
    var numero = this.elementRef.nativeElement.value.replace(new RegExp('[\.]|[-]|[_]|[/]', 'g'), '');
    if(numero != ''){
      this.documentTypeService.validateDocumentNumber(this.documentType, numero).subscribe(res => {
        if(res.result.code === '000'){
          this.renderer.setElementClass(this.elementRef.nativeElement, 'ng-invalid', false);
          this.renderer.setElementClass(this.elementRef.nativeElement, 'ng-touched', false);
          return true;
        } else {
          this.elementRef.nativeElement.setCustomValidity(res.result.message);
          this.renderer.setElementClass(this.elementRef.nativeElement, 'ng-invalid', true);
          this.renderer.setElementClass(this.elementRef.nativeElement, 'ng-touched', true);
          this.message = new UserMessage('error', 'Falha', res.result.message);
          this.messageService.showMessage(this.message);
        }
      });
    }

  }

}
