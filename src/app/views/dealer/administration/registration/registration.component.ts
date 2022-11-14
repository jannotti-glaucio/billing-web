import { Component } from '@angular/core';
import { Address } from '../../../../classes/address';
import { Company } from '../../../../classes/company';

@Component({
  templateUrl: 'registration.component.html'
})
export class RegistrationComponent{
  public tipoPessoa;

  public endereco = new Address();
  public company  = new Company(1, 'j','Billing LTDA', 'contato@jannotti.tech.br', 'CNPJ','74.595.534/0001-44', '981741109');

  constructor(){
    this.tipoPessoa = this.company.tipo;
    this.company.endereco = this.endereco;
  }
}
