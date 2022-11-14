import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[onlyNumbers]'
})
export class OnlyNumberDirective {

  constructor(public elementRef: ElementRef) {  }


  @HostListener('keyup')
  setConfig() {
    this.elementRef.nativeElement.value = 
    this.elementRef.nativeElement.value.replace(new RegExp('[^\\d]', 'g'), '');
  }

}
