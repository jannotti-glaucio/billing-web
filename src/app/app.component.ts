import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { UserIdleService } from 'angular-user-idle';
import { AuthService } from './services/auth.service';
import { MessageService } from './services/message/message.service';
import { UserMessage } from './classes/user-message';
import { ToasterConfig, BodyOutputType } from 'angular2-toaster';


@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet><toaster-container [toasterconfig]="config"></toaster-container></router-outlet>'
})
export class AppComponent implements OnInit {
  
  public config : ToasterConfig =
      new ToasterConfig({
        tapToDismiss: true,
        timeout: 5000,
        positionClass: 'toast-top-center' ,
        bodyOutputType: BodyOutputType.TrustedHtml
      });


  private message: UserMessage;
  constructor(
    private router: Router, 
    private translate: TranslateService,
    private userIdle: UserIdleService,
    private authService: AuthService,
    private messageService: MessageService) {

      //this.translate.addLangs(['en', 'pt']);
      this.translate.addLangs(['pt']);
      this.translate.setDefaultLang('pt');
  
      const browserLang = this.translate.getBrowserLang();
      //this.translate.use(browserLang.match(/en|pt/) ? browserLang : 'pt');
      this.translate.use(browserLang.match(/pt/) ? browserLang : 'pt');
  }

  ngOnInit() {

  this.userIdle.startWatching();

  // Start watching when user idle is starting.
  this.userIdle.onTimerStart().subscribe((count) => console.log(count));

  this.userIdle.onTimeout().subscribe(
    ()=> {
      this.authService.logout();
      this.message = new UserMessage('info','', 'Você está muito tempo oscioso. Favor efetuar login.')
      this.messageService.showMessage(this.message);
    });

  this.userIdle.ping$.subscribe(() => this.restart());


    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

  startWatching() {
    this.userIdle.startWatching();
  }
 
  restart() {
    this.userIdle.resetTimer();
  }

  stop() {
    this.userIdle.stopTimer();
  }
 
  stopWatching() {
    this.userIdle.stopWatching();
  }
}
