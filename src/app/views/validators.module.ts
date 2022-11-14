import { NgModule } from '@angular/core';
import { OnlyNumberDirective, DocumentValidatorsDirective } from '../directives';

@NgModule({
    imports: [
     
    ],
    declarations: [ DocumentValidatorsDirective, OnlyNumberDirective ],
    exports: [DocumentValidatorsDirective, OnlyNumberDirective]
  })
  export class ValidatorsModule { }