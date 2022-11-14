import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../../../../classes/company';
import { Address } from '../../../../classes/address';

@Component({
  templateUrl: './update-company.component.html'
})
export class UpdateCompanyComponent implements OnInit{

  public companyList: Company[];
  public addressList: Address[];
  public companyToUpdate: Company;
  public companyId; 
  

  public endereco = new Address();
  public company  = new Company(1, 'j','Lingerie BR', 'lingeriebr@mail.com', 'CNPJ','53.660.523/0001-20', '981741109');
  public company1 = new Company(2, 'f','Amlix', 'amlix@mail.com','CNPJ', '27.374.896/0001-25', '986587455');
  public company2 = new Company(3, 'f','Fitness Br', 'fitnessbr@mail.com', 'CNPJ', '34.976.778/0001-52', '986587455');
  
 
  constructor(private route: ActivatedRoute) {

    this.endereco.city = "Niterói";

    this.company.endereco = this.endereco;
    this.company1.endereco = this.endereco;
    this.company2.endereco = this.endereco;

    this.companyList = [];
    this.companyList.push(this.company, this.company1, this.company2);
  }
  
  ngOnInit() {
    this.route.params.subscribe((objeto:any) => {
    this.companyId = objeto.id;
    this.updateCompany(this.companyId);
  })
  }

  updateCompany(id){
    for (let i = 0; i < this.companyList.length; i++){
      if(this.companyList[i].id == id){
        this.companyToUpdate = this.companyList[i];
      }
    }
  }


}
