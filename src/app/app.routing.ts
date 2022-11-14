import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';
import { DealerAuthGuard } from './guards/dealer.auth.guard';
import { CompanyAuthGuard } from './guards/company.auth.guard';
import { AdminAuthGuard } from './guards/admin.auth.guard';
import { LoginAuthGuard } from './guards/login.auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dealer/dashboard',
        loadChildren: './views/dealer/dashboard/dashboard.module#DashboardModule',
        canActivate: [DealerAuthGuard],
        canLoad: [DealerAuthGuard]
      },
      {
        path: 'dealer/application',
        loadChildren: './views/dealer/application/application.module#ApplicationModule',
        canActivate: [DealerAuthGuard],
        canLoad: [DealerAuthGuard]
      },
      {
        path: 'dealer/customer',
        loadChildren: './views/dealer/customer/customer.module#CustomerModule',
        canActivate: [DealerAuthGuard],
        canLoad: [DealerAuthGuard]
      },
      {
        path: 'dealer/billing',
        loadChildren: './views/dealer/billing/billing.module#BillingModule',
        canActivate: [DealerAuthGuard],
        canLoad: [DealerAuthGuard]
      },
      {
        path: 'dealer/report',
        loadChildren: './views/dealer/report/report.module#ReportModule',
        canActivate: [DealerAuthGuard],
        canLoad: [DealerAuthGuard]
      },
      {
        path: 'dealer/account',
        loadChildren: './views/dealer/account/account.module#AccountModule',
        canActivate: [DealerAuthGuard],
        canLoad: [DealerAuthGuard]
      },
      {
        path: 'dealer/administration',
        loadChildren: './views/dealer/administration/administration.module#AdministrationModule',
        canActivate: [DealerAuthGuard],
        canLoad: [DealerAuthGuard]
      },
      {
        path: 'dealer/help/faq',
        loadChildren: './views/dealer/help/faq/faq.module#FaqModule',
      },
      {
        path: 'dealer/help/videos',
        loadChildren: './views/dealer/help/videos/videos.module#VideosModule',
      },
      {
        path: 'dealer/change-password',
        loadChildren: './views/dealer/change-password/change-password.module#ChangePasswordModule',
      },
      {
        path: 'company/dashboard',
        loadChildren: './views/company/dashboard/dashboard.module#DashboardModule',
        canActivate: [CompanyAuthGuard],
        canLoad: [CompanyAuthGuard]
      },
      {
        path: 'company/dealer',
        loadChildren: './views/company/dealer/dealer.module#DealerModule',
        canActivate: [CompanyAuthGuard],
        canLoad: [CompanyAuthGuard]
      },
      {
        path: 'company/billingplan',
        loadChildren: './views/company/billingplan/billingplan.module#BillingPlanModule',
        canActivate: [CompanyAuthGuard],
        canLoad: [CompanyAuthGuard]
      },
      {
        path: 'company/user',
        loadChildren: './views/company/user/user.module#UserModule',
        canActivate: [CompanyAuthGuard],
        canLoad: [CompanyAuthGuard]
      },
      {
        path: 'company/transfer',
        loadChildren: './views/company/transfer/transfer.module#TransferModule',
        canActivate: [CompanyAuthGuard],
        canLoad: [CompanyAuthGuard]
      },
      {
        path: 'company/conciliation',
        loadChildren: './views/company/conciliation/conciliation.module#ConciliationModule',
        canActivate: [CompanyAuthGuard],
        canLoad: [CompanyAuthGuard]
      },
      {
        path: 'company/report',
        loadChildren: './views/company/report/report.module#ReportModule',
        canActivate: [CompanyAuthGuard],
        canLoad: [CompanyAuthGuard]
      },
      {
        path: 'company/change-password',
        loadChildren: './views/company/change-password/change-password.module#ChangePasswordModule',
       
      },
      {
        path: 'admin/dashboard',
        loadChildren: './views/admin/dashboard/dashboard.module#DashboardModule',
        canActivate: [AdminAuthGuard],
        canLoad: [AdminAuthGuard]
      },
      {
        path: 'admin/company',
        loadChildren: './views/admin/company/company.module#CompanyModule',
        canActivate: [AdminAuthGuard],
        canLoad: [AdminAuthGuard]
      },
      {
        path: 'admin/operator',
        loadChildren: './views/admin/operator/operator.module#OperatorModule',
        canActivate: [AdminAuthGuard],
        canLoad: [AdminAuthGuard]
      }
    ]
  },
  {
    path: '',
    component: SimpleLayoutComponent,
    data: {
      title: 'Login'
    },
    children: [
      {
        path: 'login',
        loadChildren: './views/login/login.module#LoginModule',
        canActivate: [LoginAuthGuard],
        canLoad: [LoginAuthGuard]
      }
    ]
  },
  {
    path: '',
    component: SimpleLayoutComponent,
    data: {
      title: '404'
    },
    children: [
      {
        path: '404',
        loadChildren: './views/404/P404.module#P404Module',
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
