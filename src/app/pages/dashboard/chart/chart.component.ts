import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { DashboardService } from "../dashboard.service";
import * as Highcharts from "highcharts";

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

  jsonData: any = [
    {
      type: "column",
      title: "Order Detail",
      xaxis: "x-name",
      yaxis: "y-name",
      series: [
        { name: "Plastic", data: [21] },
        { name: "Rubber", data: [32] },
        { name: "Paper", data: [19] },
      ],
    },
    {
      type: "column",
      title: "Buyer Detail",
      xaxis: "x-name",
      yaxis: "y-name",
      series: [
        { name: "Plastic", data: [2] },
        { name: "Rubber", data: [3] },
        { name: "Paper", data: [9] },
      ],
    },
    {
      type: "column",
      title: "Seller Detail",
      xaxis: "x-name",
      yaxis: "y-name",
      series: [
        { name: "Plastic", data: [23] },
        { name: "Rubber", data: [2] },
        { name: "Paper", data: [11] },
      ],
    },
  ];

  constructor(private dashboardService: DashboardService) {}
  ngOnInit() {
    this.prepareChart();
    this.getChart();
  }
  prepareChart = () => {
    this.jsonData.forEach((data: any) => {
      let defaultOptions: any = {
        chart: {
          type: "",
        },
        csscharts: "col-lg-6",
        title: {
          text: "",
        },
        xAxis: {
          min: 0,
          title: {
            text: "",
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: "",
          },
        },
        tackLabels: {
          enabled: true,
          style: {
            fontWeight: "bold",
            color:
              (Highcharts.defaultOptions.title.style &&
                Highcharts.defaultOptions.title.style.color) ||
              "gray",
            textOutline: "none",
          },
        },
        series: [],
      };
        (defaultOptions.title.text = data?.title),
        (defaultOptions.chart.type = data?.type),
        (defaultOptions.series = data?.series);
      this.chartArray.push(defaultOptions);
    });
  };

  getChart = () => {
    console.log(this.chartArray);
    //  this.dashboardService.getDashBoardChart().toPromise().then((data: any)=>{
    this.chart = this.chartArray;
    this.chart.forEach((chartData) => {
      this.myCustomOptions = chartData;
      this.myCustomOptions["plotOptions"] = {
        column: { stacking: "", dataLabels: { enabled: true } },
      };
      this.createCustomChart(this.myCustomOptions, chartData?.csscharts);
      //  });
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
