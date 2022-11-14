import { Component } from '@angular/core';
import { Invoice } from '../../../classes/invoice';
import { Address } from '../../../classes/address';
import { Customer } from '../../../classes/customer';
import { Item } from '../../../classes/item';
import { BankBillet } from '../../../classes/bank-billet';
import { PaymentMethod } from '../../../constants/payment.method.const';
import { InvoiceStatus } from '../../../constants/invoice.status.const';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {
  public invoiceList = [];
  public invoiceItemList = [];

  public endereco = new Address();
  public endereco1 = new Address();
  public customer = new Customer(1, 'f', 'João das couves', 'joao.couves@mail.com', null, 89468380785, '981741109');
  public customer1 = new Customer(2, 'f', 'José Araribóia', 'jose.arariboia@mail.com', null, 31709038705, '986587455');
  public customer2 = new Customer(3, 'f', 'Joana das Camélias', 'joana.camelias@mail.com', null, 39467070766, '986587455');

  public item = new Item(1, 'Contrato de manutenção mensal', 1, 150.80);
  public bankBillet = new BankBillet;

  public invoice  = new Invoice(1, this.customer, 1, new Date(2018, 7, 4), 150.80,
  'Loren ipsun doren', PaymentMethod.bank_billet, null, InvoiceStatus.open);
  public invoice1 = new Invoice(2, this.customer1, null, new Date(2018, 7, 15), 55.55,
  'Loren ipsun doren', PaymentMethod.credit_card, null, InvoiceStatus.paid);
  public invoice2 = new Invoice(3, this.customer2, 1, new Date(2018, 7, 25), 89.90,
  'Loren ipsun doren', PaymentMethod.bank_billet, null, InvoiceStatus.expired);
  public invoice3 = new Invoice(4, this.customer, 1, new Date(2018, 7, 4), 60.80,
  'Loren ipsun doren', PaymentMethod.credit_card, null, InvoiceStatus.canceled);
  public invoice4 = new Invoice(4, this.customer, 2, new Date(2018, 7, 27), 150.80,
  'Loren ipsun doren', PaymentMethod.bank_billet, null, InvoiceStatus.canceled);

  public idToRemove;

  constructor(){

    this.bankBillet.lineCode = ' 99999.99999 99999.999999 99999.999999 9 99999999999999';

    this.customer.addresses = [this.endereco];
    this.customer.status = 'Ativo';
    this.customer1.addresses = [this.endereco, this.endereco1];
    this.customer1.status = 'Ativo';
    this.customer2.addresses = [this.endereco, this.endereco1];
    this.customer2.status = 'Ativo';

    this.invoice.bankBillet = this.bankBillet;
    this.invoice1.bankBillet = this.bankBillet;
    this.invoice2.bankBillet = this.bankBillet
    this.invoice3.bankBillet = this.bankBillet
    this.invoice4.bankBillet = this.bankBillet

    this.invoiceItemList.push({id: 1});

    this.invoiceList.push(this.invoice, this.invoice1, this.invoice2, this.invoice3, this.invoice4)
  }

   // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

 

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    {data: [35, 40, 60, 25, 35, 30, 0], label: 'Vencidos'},
    {data: [150, 148, 140, 119, 186, 127, 170], label: 'Emitidos'},
    {data: [115, 108, 80,94,151,97, 15], label: 'Pagos'}
  ];

}
