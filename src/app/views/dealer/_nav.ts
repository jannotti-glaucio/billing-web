import { environment } from '../../../environments/environment'

var dealerNavigationMenu = [];

if(environment.menu.dealer.painel == true){
  dealerNavigationMenu.push({
    name: 'screen.sidebarNav.dealer.panel',
    url: '/dealer/dashboard',
    icon: 'icon-speedometer',
  })
}
if(environment.menu.dealer.clientes == true){
  dealerNavigationMenu.push({
    name: 'screen.sidebarNav.dealer.customers',
    url: '/dealer/customer',
    icon: 'icon-people'
  })
}
if(environment.menu.dealer.billing.default == true){
  dealerNavigationMenu.push({
    name: 'screen.sidebarNav.dealer.billing',
    url: '/dealer/billing',
    icon: 'icon-calculator',
    children: [
      {
        name: 'screen.sidebarNav.dealer.billingPending',
        url: '/dealer/billing/invoice-expiration',
        icon: 'fa fa-hourglass-3'
      },
      {
        name: 'screen.sidebarNav.dealer.billingInvoices',
        url: '/dealer/billing/invoice',
        icon: 'fa fa-file-text-o'
      },
      {
        name: 'screen.sidebarNav.dealer.billingCollections',
        url: '/dealer/billing/collection',
        icon: 'fa fa-files-o'
      },
      {
        name: 'screen.sidebarNav.dealer.billingSubscriptions',
        url: '/dealer/billing/subscription',
        icon: 'icon-people'
      }
    ]
  })
}
if(environment.menu.dealer.conta == true){
  dealerNavigationMenu.push({
    name: 'screen.sidebarNav.dealer.bankAccount',
    url: '/dealer/account',
    icon: 'icon-wallet',
    children: [
      {
        name: 'screen.sidebarNav.dealer.bankAccountStatement',
        url: '/dealer/account/statement',
        icon: 'fa fa-percent'
      },
      {
        name: 'screen.sidebarNav.dealer.bankAccountWithdrawal',
        url: '/dealer/account/withdraw',
        icon: 'fa fa-money'
      }
    ]
  })
}
if(environment.menu.dealer.application == true){
  dealerNavigationMenu.push({
    name: 'screen.sidebarNav.dealer.applications',
    url: '/dealer/application',
    icon: 'icon-people'
  })
}
if(environment.menu.dealer.relatorios == true){
  dealerNavigationMenu.push({
    name: 'screen.sidebarNav.dealer.report',
    url: '/dealer/report',
    icon: 'icon-chart',
    children: [
      {
        name: 'screen.sidebarNav.dealer.reportInvoices',
        url: '/dealer/report/invoice-report',
        icon: 'fa fa-file-text-o'
      },
      {
        name: 'screen.sidebarNav.dealer.reportCollections',
        url: '/dealer/report/collection-report',
        icon: 'fa fa-files-o'
      },
      {
        name: 'screen.sidebarNav.dealer.reportSubscriptions',
        url: '/dealer/report/subscription-report',
        icon: 'icon-people'
      }
    ]
  })
}
if(environment.menu.dealer.administracao == true){
  dealerNavigationMenu.push({
    name: 'screen.sidebarNav.dealer.administration',
    url: '/dealer/administration',
    icon: 'icon-settings',
    children: [
      {
        name: 'screen.sidebarNav.dealer.administrationRegistrationInfo',
        url: '/dealer/administration/registration',
        icon: 'icon-doc'
      },
      {
        name: 'screen.sidebarNav.dealer.administrationBankBillets',
        url: '/dealer/administration/bank-billet',
        icon: 'icon-doc'
      },
      {
        name: 'screen.sidebarNav.dealer.administrationBankAccounts',
        url: '/dealer/administration/bank-account',
        icon: 'icon-doc'
      }
    ]
  })
}

dealerNavigationMenu.push({
  name: 'screen.sidebarNav.dealer.help',
  url: '/dealer/help',
  icon: 'icon-bubbles',
  class: 'bottom-item',
  children: [
    {
      name: 'screen.sidebarNav.dealer.helpFAQ',
      url: 'https://wiki.billing.jannotti.tech.br/shelves/faq',
      icon: 'fa fa-question',
      target: '_Blank'
    },
    {
      name: 'screen.sidebarNav.dealer.helpVideos',
      url: '/dealer/help/videos',
      icon: 'fa fa-eye'
    }
  ]
})


export const dealerNavigation = dealerNavigationMenu;
