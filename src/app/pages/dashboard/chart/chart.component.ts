import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { DashboardService } from "../dashboard.service";

@Component({
  selector: "ngx-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"],
})
export class ChartComponent implements OnInit {
  @ViewChild("charts", { static: true }) public chartEl: ElementRef;
  cardArray: any[] = [];
  myCustomOptions: any = {};
  chart: any = [];
  chartArray: any = [];
  jsonData:any=[];

  constructor(private dashboardService: DashboardService) {

  }
  ngOnInit() {
    this.getChartData();

  }
  getChartData(){
    this.dashboardService.getDashBoardChart().toPromise().then((data:any[])=>{
        this.jsonData=data;
        this.prepareChart(this.jsonData);
    })
  }
  prepareChart = (jsonData) => {
    jsonData.forEach((chartData) => {
      let defaultOptions: any = {
        chart: {
          type: "column",
        },
        csscharts: "col-lg-6",
        title: {
          text: "",
        },
        xAxis: {
          min: 0,
          title: {
            text: "x-name",
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: "y-name",
          },
        },
        series: [],
      };
        defaultOptions.title.text = chartData?.title,
        defaultOptions.series = chartData?.series;
      this.chartArray.push(defaultOptions);
    });
    this.getChart();
  };

  getChart = () => {
    this.chart = this.chartArray;
    this.chart.forEach((chartData) => {
      this.myCustomOptions = chartData;
      this.myCustomOptions["plotOptions"] = {
        column: { stacking: "", dataLabels: { enabled: true } },
      };
      this.createCustomChart(this.myCustomOptions, chartData?.csscharts);
    });
  };
  createCustomChart(myOpts: any, className?: string) {
    this.dashboardService.createChart(
      this.chartEl.nativeElement,
      myOpts,
      className
    );
  }
}
