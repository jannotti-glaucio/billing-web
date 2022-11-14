import { Component, OnInit, ViewChild, ElementRef, Renderer, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../classes/user';
import { PagingService } from '../../../services/paging/paging.service';
import { StatusConverterService } from '../../../services/status/status-converter.service';
import { UserMessage } from '../../../classes/user-message';
import { MessageService } from '../../../services/message/message.service';
import { LocaleService } from '../../../services/message/locale.service';
import { CompanyUserService } from '../../../services/company-user/company-user.service';
import { DealerService } from '../../../services/dealer/dealer.service';
import { DealerUserRestRequest } from '../../../services/company-user/to/dealer-user-rest-request';
import { ModalDirective } from 'ngx-bootstrap';
import { LoaderService } from 'app/services/loader/loader.service';


@Component({
  templateUrl: 'user.component.html',
  styleUrls: [
    '../../../../../node_modules/ladda/dist/ladda-themeless.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit{

  public userList;
  public dealerList;
  public dealerToken;
  public newPassword;
  public passwordConfirmation;

  private message: UserMessage;
  
  public userToRemove: User;
  public userToChangePassword: User;

  @ViewChild('inputPassword') inputPassword: ElementRef;
  @ViewChild('inputPasswordConfirmation') inputPasswordConfirmation: ElementRef;
  @ViewChild('passwordModal') passwordModal: ModalDirective;

  
  constructor(private router: Router, 
              private companyUserService: CompanyUserService,
              public dealerService: DealerService,
              private messageService: MessageService,
              public pagingService: PagingService,
              private statusConverterService: StatusConverterService,
              private userMessageService: LocaleService,
              private renderer: Renderer,
              public loaderService: LoaderService){

  }

  public searchDealer(){
      this.dealerService.searchDealerNotPagging().subscribe(response => {
          this.dealerList = [];
          
          response.dealers.forEach(dealer => {
            let dealerOption = {label:'', value:''};
            dealerOption.value = dealer.token.toString();
            dealerOption.label = dealer.name.toString();
            this.dealerList.push(dealerOption);
          });
      });
  }

  public searchUsers(): void {
    this.loaderService.startLoader('userSearchDealersButton');
    this.companyUserService.searchDealerUsers(this.dealerToken).subscribe(
      response => {
        this.userList = [];
        this.userList = response.users;
      });
  }

  updateUser(token: String){
    this.router.navigate(['/company/user/update-user', token]);
  }

  loadUserToRemove(user: User){
   this.userToRemove = user;
  }

  loadUserToChangePassword(user: User){
    this.userToChangePassword = user;
  }

  public deleteUser(token:String): void {
   this.companyUserService.deleteDealerUser(token).subscribe((response) => {
      var message = this.userMessageService.get('screen.user.message.success.delete');
      var title = this.userMessageService.get('screen.commons.message.success.title');
      this.message = new UserMessage('success', title.toString(), message.toString());
      this.messageService.showMessage(this.message);
      this.searchUsers();
    });  
  }

  public blockUser(token: String){
    this.companyUserService.blockDealerUser(token).subscribe((response) => {
      var message = this.userMessageService.get('screen.user.message.success.blocked');
      var title = this.userMessageService.get('screen.commons.message.success.title');
      this.message = new UserMessage('success', title.toString(), message.toString());
      this.messageService.showMessage(this.message);
      this.searchUsers();
    });
  }

  public unblockUser(token: String){
    this.companyUserService.unBlockDealerUser(token).subscribe((response) => {
      var message = this.userMessageService.get('screen.user.message.success.unblocked');
      var title = this.userMessageService.get('screen.commons.message.success.title');
      this.message = new UserMessage('success', title.toString(), message.toString());
      this.messageService.showMessage(this.message);
      this.searchUsers();
    });
  }

  public updateUserPassword(token: String){
    if(this.newPassword == this.passwordConfirmation){
      this.renderer.setElementClass(this.inputPassword.nativeElement, 'ng-invalid', false);
      this.renderer.setElementClass(this.inputPasswordConfirmation.nativeElement, 'ng-invalid', false);
    
      let userRequest = new DealerUserRestRequest();
      userRequest.password = this.newPassword;
      this.companyUserService.updateDealerUserPassword(token, userRequest).subscribe((response) => {
        var message = this.userMessageService.get('screen.user.message.success.passwordChanged');
        var title = this.userMessageService.get('screen.commons.message.success.title');
        this.message = new UserMessage('success', title.toString(), message.toString());
        this.messageService.showMessage(this.message);
        this.searchUsers();
        this.newPassword = '';
        this.passwordConfirmation = '';
        this.passwordModal.hide();
      });
    } else {
      this.inputPassword.nativeElement.setCustomValidity('Erro');
      this.inputPasswordConfirmation.nativeElement.setCustomValidity('Erro');
      this.renderer.setElementClass(this.inputPassword.nativeElement, 'ng-invalid', true);
      this.renderer.setElementClass(this.inputPassword.nativeElement, 'ng-touched', true);
      this.renderer.setElementClass(this.inputPasswordConfirmation.nativeElement, 'ng-invalid', true);
      this.renderer.setElementClass(this.inputPasswordConfirmation.nativeElement, 'ng-touched', true);
      this.message = new UserMessage('error', 'Falha', 'As senhas não conferem!');
      this.messageService.showMessage(this.message);
    }
  }

  public ngOnInit(){
    this.searchDealer();
  }


}
