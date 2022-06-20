import { Injectable } from '@angular/core';
import { AppConfiguration } from '../shared/AppConfiguration';
import { CommonHttpClientService } from '../shared/commonHttpService';
import * as Highcharts from "highcharts";
import Exporting from "highcharts/modules/exporting";
Exporting(Highcharts);
import Data from "highcharts/modules/data";
Data(Highcharts);
import ExportData from "highcharts/modules/export-data";
ExportData(Highcharts);








@Injectable({
  providedIn: 'root'
})
export class DashboardService {

constructor(   private commonHttpClientService: CommonHttpClientService,
  private appConfiguration: AppConfiguration) { }

  getDashBoardChart = () => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.getDashBoardCharts
    );
  };

  charts = [];
  createChart(container, options?: any, className?: string) {
    let opts = options;
    let e = document.createElement("div");
    e.style.marginBottom = "15px";
    e.style.marginTop = "15px";
    if (!!className) e.className = className;
    container.appendChild(e);
    if (!!opts.chart) {
      opts.chart["renderTo"] = e;
    } else {
      opts.chart = {
        renderTo: e,
      };
    }
    this.charts.push(new Highcharts.Chart(opts));
  }

}
