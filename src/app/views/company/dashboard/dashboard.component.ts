import { Component } from '@angular/core';
import { Dealer } from '../../../classes/dealer';
import { BankAccount } from '../../../classes/bank-account';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent{

  public dealer = new Dealer();
  public bankAccount = new BankAccount();
  
  public transferList = [];

  constructor() {   

    this.transferList.push();
  }

  ngOnInit() {
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
    {data: [35, 40, 60, 25, 35, 30, 0], label: 'Negadas'},
    {data: [150, 148, 140, 119, 186, 127, 170], label: 'Realizadas'},
    {data: [115, 108, 80,94,151,97, 15], label: 'Pendentes'}
  ];

}
