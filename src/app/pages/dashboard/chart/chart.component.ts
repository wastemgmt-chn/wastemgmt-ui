import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { DashboardService } from "../dashboard.service";

@Component({
  selector: "ngx-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"],
})
export class ChartComponent implements OnInit {
  cardArray: any[] = [];
  myCustomOptions: any = {};
  chart: any[] = [];

  constructor(private dashboardService: DashboardService) {}
  @ViewChild("charts") public chartEl: ElementRef;
  ngOnInit() {
    this.getChart();
  }
 getChart=()=>{
 this.dashboardService.getDashBoardChart().toPromise().then((data: any)=>{
   this.chart = data;
   this.chart.forEach(chartData => {
     this.myCustomOptions = chartData?.data;
     this.myCustomOptions["plotOptions"] = { column: {stacking: 'normal',dataLabels: {enabled: true}}}
       this.createCustomChart(this.myCustomOptions,chartData?.csscharts);
 });
 })
}
 createCustomChart(myOpts: any,className?:string) {
  this.dashboardService.createChart(this.chartEl.nativeElement,myOpts,className);

}

}
