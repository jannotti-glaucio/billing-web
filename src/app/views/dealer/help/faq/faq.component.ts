import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  templateUrl: 'faq.component.html'
})
export class FaqComponent {
 
  public url;
  constructor(private sanitizer: DomSanitizer){
    this.url = this.urlSanitizer('https://wiki.billing.jannotti.tech.br/shelves/faq');
  
  }

  public urlSanitizer(url: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  

}
