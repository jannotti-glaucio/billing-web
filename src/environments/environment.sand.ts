export const environment = {
  production: false,
  baseUrl:"https://api.web.sandbox.billing.jannotti.tech.br/",
  menu : {
    dealer : {
      painel: false,
      clientes: true,
      application: true,
      billing: {
        default : true,
        invoice: true,
        carnet: true
      },
      relatorios: true,
      conta: true,
      administracao: false
    },
    company : {
      painel : false,
      dealers : true,
      users: true,
      transfer : true,
      conciliation : false,
      report : true,
      billingplan: true
    }
  }
};
