import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  templateUrl: './new-company.component.html'
})
export class NewCompanyComponent implements OnInit{
  
  public tipoPessoa;
  
  constructor(private sanitizer: DomSanitizer) { }

  public endereco = this.sanitizer.bypassSecurityTrustHtml('<br/>'+
  '<h5 class="text-muted"><i class="fa fa-address-card-o mr-2"></i>Endereço</h5>'+
  '<hr/>'+
  '<div class="row">'+
    '<div class="col-sm-6">'+
      '<div class="form-group">'+
        '<label for="tipoEndereco">Tipo de endereço</label>'+
        '<select class="form-control form-control-sm" id="tipoEndereco{{$index}}">'+
          '<option></option>'+
          '<option>Residencial</option>'+
          '<option>Comercial</option>'+
          '<option>Cobrança</option>'+
        '</select> '+
      '</div>'+
    '</div>'+
    '<div class="col-sm-6">'+
      '<div class="form-group">'+
        '<label for="cep">Cep</label>'+
        '<input type="text" id="cep" class="form-control form-control-sm" placeholder="CEP"/>'+
      '</div>'+
    '</div>'+
  '</div>'+
  '<div class="row">'+
    '<div class="col-sm-6">'+
        '<div class="form-group">'+
          '<label for="logradouro">Logradouro</label>'+
          '<input type="text" id="logradouro" class="form-control form-control-sm" placeholder="Logradouro"/>'+
        '</div>'+
    '</div>'+
    '<div class="col-sm-3">'+
        '<div class="form-group">'+
          '<label for="numero">Número</label>'+
          '<input type="text" id="numero" class="form-control form-control-sm" placeholder="Número"/>'+
        '</div>'+
    '</div>'+
    '<div class="col-sm-3">'+
        '<div class="form-group">'+
          '<label for="complemento">Complemento</label>'+
          '<input type="text" id="complemento" class="form-control form-control-sm" placeholder="Complemento"/>'+
        '</div>'+
    '</div>'+
  '</div>'+

  '<div class="row">'+
    '<div class="col-sm-6">'+
      '<div class="form-group">'+
        '<label for="bairro">Bairro</label>'+
        '<input type="text" id="bairro" class="form-control form-control-sm" placeholder="Bairro"/>'+
      '</div>'+
    '</div>'+
    '<div class="col-sm-3">'+
        '<div class="form-group">'+
          '<label for="estado">Estado</label>'+
          '<select class="form-control form-control-sm" id="estado">'+
            '<option></option>'+
            '<option>Rio de Janeiro</option>'+
          '</select> '+
        '</div>'+
    '</div>'+
    '<div class="col-sm-3">'+
        '<div class="form-group">'+
          '<label for="cidade">Cidade</label>'+
          '<select class="form-control form-control-sm" id="cidade">'+
            '<option></option>'+
            '<option>Niterói</option>'+
            '<option>Nova Friburgo</option>'+
          '</select> '+
        '</div>'+
    '</div>'+
  '</div>');

  public listaEnderecos: SafeHtml[] = [];

  public addEndereco(){
    this.listaEnderecos.push(this.endereco);
  }

  public removeEndereco(index:any){
    this.listaEnderecos.splice(index);
  }

  ngOnInit() {
    this.addEndereco();
  }


}
