import { Component } from '@angular/core';
import { User } from '../../../classes/user';
import { Company } from '../../../classes/company';
import { Dealer } from '../../../classes/dealer';
import { Role } from '../../../classes/role';

@Component({
  templateUrl: 'operator.component.html'
})
export class OperatorComponent{
  
  public company  = new Company(1, 'j','Lingerie BR', 'lingeriebr@mail.com', 'CNPJ','53.660.523/0001-20', '981741109');
  public dealer  = new Dealer();

  role = new Role();
  public user = new User();
  public user1 = new User();

  public userList = [];
  public userToRemove: User = new User();
  public userToEdit: User = new User();
  public idToRemove;

  constructor() { 
    this.userList.push(this.user, this.user1);
  }

  ngOnInit() {
  }

  modalExcluir(user, i){
   this.userToRemove = user;
   this.idToRemove = i;
  }
  modalEditar(user){
    this.userToEdit = user;
  }

  public remove(){
    this.userList.splice(this.idToRemove, 1);
  }

}
