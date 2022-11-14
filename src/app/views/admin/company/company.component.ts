import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../../../classes/company';
import { Address } from '../../../classes/address';
import { City } from '../../../classes/city';

@Component({
  templateUrl: 'company.component.html'
})
export class CompanyComponent{

  public smallModal;

  public companyList: Company[] = [];

  public city: City;
  
  private endereco = new Address();
  private company  = new Company(1, 'j','Lingerie BR', 'lingeriebr@mail.com', 'CNPJ','53.660.523/0001-20', '981741109');
  private company1 = new Company(2, 'f','Amlix', 'amlix@mail.com','CNPJ', '27.374.896/0001-25', '986587455');
  private company2 = new Company(3, 'f','Fitness Br', 'fitnessbr@mail.com', 'CNPJ', '34.976.778/0001-52', '986587455');
  
  public companyToRemove: Company;
  public idToRemove;
  
  constructor(private router: Router){

    this.city.name = 'Niterói';
    this.city.state = 'RJ';
    this.endereco.city = "Niterói"
    this.company.endereco = this.endereco;
    this.company.status = "Ativo";
    this.company1.endereco = this.endereco;
    this.company1.status = "Ativo";
    this.company2.endereco = this.endereco;
    this.company2.status = "Ativo";
    this.companyList.push(this.company, this.company1, this.company2);
  }

  updateCompany(id:number){
    this.router.navigate(['/admin/company/update-company', id]);
  }

  modalExcluir(company, i){
   this.companyToRemove = company;
   this.idToRemove = i;
  }

  public remove(){
    this.companyList.splice(this.idToRemove, 1);
  }
}
