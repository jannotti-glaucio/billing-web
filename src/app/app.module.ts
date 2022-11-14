import { ConverterService } from './services/converter.service';
import { SubscriptionService } from './services/subscription/subscription.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  LOCALE_ID, NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';


// Import containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

const APP_CONTAINERS = [
  FullLayoutComponent,
  SimpleLayoutComponent
]

// Import components
import {
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
  
} from './components';

const APP_COMPONENTS = [
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
]

// Import directives
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
]

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ModalModule } from 'ngx-bootstrap';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AuthService } from './services/auth.service';
import { DealerAuthGuard } from './guards/dealer.auth.guard';
import { AdminAuthGuard } from './guards/admin.auth.guard';
import { CompanyAuthGuard } from './guards/company.auth.guard';
import { FormatService } from './services/format.service';
import { UserIdleModule } from 'angular-user-idle';
import { LoginAuthGuard } from './guards/login.auth.guard';
import { CustomerService } from './services/customer/customer.service';
import { RequestInterceptor } from './interceptor/request.interceptor';
import { MessageService } from './services/message/message.service';
import { PagingService } from './services/paging/paging.service';
import { StateService } from './services/address/state/state.service';
import { CityService } from './services/address/city/city.service';
import { DocumentService } from './services/document/document.service';
import { LoginService } from './services/login/login.service';
import { InvoiceService } from './services/invoice/invoice.service';

import { SettingsService } from './services/settings/settings.service';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

// the second parameter 'pt' is optional
registerLocaleData(localePt, 'pt');

import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { StatusConverterService } from './services/status/status-converter.service';
import { LocaleService } from './services/message/locale.service';
import { UserService } from './services/user/user.service';
import { CollectionService } from './services/collection/collection.service';
import { DealerService } from './services/dealer/dealer.service';
import { StatementService } from './services/statement/statement.service';
import { DealerWithdrawService } from './services/dealer-withdraw/dealer-withdraw.service';
import { CompanyWithdrawService } from './services/company-withdraw/company-withdraw.service';
import { CompanyCurrentService } from './services/company-current/company-current.service';
import { CompanyInvoiceService } from './services/company-invoice/company-invoice.service';
import { CompanyUserService } from './services/company-user/company-user.service';
import { BankService } from './services/bank/bank.service';
import { VideoService } from './services/help/video.service';
import { LoaderService } from './services/loader/loader.service';
import { ApplicationService } from './services/application/application.service';
import { AlertService } from './services/alert/alert.service';
import { AlertTypeConverterService } from './services/alert/alert-type-converter.service';
import { CompanyBillingPlanService } from './services/billing-plan/company-billing-plan.service';
import { CompanyStatementService } from './services/company-statement/company-statement.service';


defineLocale('pt', ptBrLocale); 

export function tokenGetter() {
  return sessionStorage.getItem('access_token');
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    ToasterModule,
    ChartsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
    }),
    UserIdleModule.forRoot({idle: 10000, timeout: 1, ping: 10005})
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES
  ],
  providers: [
    AdminAuthGuard, 
    CompanyAuthGuard, 
    DealerAuthGuard, 
    LoginAuthGuard, 
    AuthService,
    AlertService,
    AlertTypeConverterService,
    ApplicationService,
    BankService,
    CompanyBillingPlanService,
    CityService,
    CollectionService,
    CustomerService,
    CompanyWithdrawService,
    CompanyCurrentService,
    CompanyInvoiceService,
    CompanyUserService,
    CompanyStatementService,
    ConverterService,
    DealerWithdrawService,
    DealerService,
    DocumentService,
    FormatService,
    InvoiceService,
    LoginService,
    LocaleService, 
    MessageService,
    PagingService,
    StatementService,
    StatusConverterService,
    SubscriptionService,
    StateService,
    VideoService,
    ToasterService,
    UserService,
    LoaderService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    SettingsService,
    {
      provide: LOCALE_ID,
      deps: [SettingsService],
      useFactory: (settingsService) => settingsService.getLocale()
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    }],
  bootstrap: [ AppComponent ]
})


export class AppModule { }
