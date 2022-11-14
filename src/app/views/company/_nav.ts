import { environment } from '../../../environments/environment'

var companyNavigationMenu = [];

if(environment.menu.company.painel == true){
  companyNavigationMenu.push({
    name: 'screen.sidebarNav.company.panel',
    url: '/company/dashboard',
    icon: 'icon-speedometer',
  })
}

if(environment.menu.company.dealers == true){
  companyNavigationMenu.push({
    name: 'screen.sidebarNav.company.companies',
    url: '/company/dealer',
    icon: 'icon-share-alt',
  })
}

if(environment.menu.company.users == true){
  companyNavigationMenu.push({
    name: 'screen.sidebarNav.company.users',
    url: '/company/user',
    icon: 'fa fa-users',
  })
}

if(environment.menu.company.transfer == true){
  companyNavigationMenu.push({
    name: 'screen.sidebarNav.company.transfers',
    url: '/company/transfer',
    icon: 'icon-refresh',
    children: [
      {
        name: 'screen.sidebarNav.company.transfersPending',
        url: '/company/transfer/requested-transfer',
        icon: 'fa fa-hourglass-3'
      },
      {
        name: 'screen.sidebarNav.company.transferAll',
        url: '/company/transfer/manage-transfer',
        icon: 'icon-refresh'
      }
    ]
  })
}

if(environment.menu.company.conciliation == true){
  companyNavigationMenu.push({
    name: 'screen.sidebarNav.company.conciliation',
    url: '/company/conciliation',
    icon: 'icon-book-open',
  })
}

if(environment.menu.company.billingplan == true){
  companyNavigationMenu.push({
    name: 'screen.sidebarNav.company.plans',
    url: '/company/billingplan',
    icon: 'fa fa-users',
  })
}

if(environment.menu.company.report == true){
  companyNavigationMenu.push({
    name: 'screen.sidebarNav.company.report',
    url: '/company/report',
    icon: 'icon-chart',
    children: [
      {
        name: 'screen.sidebarNav.company.reportInvoices',
        url: '/company/report/company-invoice-report',
        icon: 'fa fa-file-text-o'
      },
      {
        name: 'screen.sidebarNav.company.reportTransfers',
        url: '/company/report/company-withdraw-report',
        icon: 'icon-refresh'
      },
      {
        name: 'screen.sidebarNav.company.reportStatement',
        url: '/company/report/dealer-statement-report',
        icon: 'fa fa-percent'
      }
    ]
  })
}

export const companyNavigation = companyNavigationMenu;
