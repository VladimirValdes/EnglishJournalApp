import { Component, ViewChild } from '@angular/core';
import {  ChartDataset, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss'],
})
export class BarchartComponent  {




  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;




  barChartData: ChartDataset[] = [
    { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Verbs', backgroundColor: '#3b82f6', hoverBackgroundColor: '#3b82f6', indexAxis: 'x'  },
    { data: [ 58, 48, 50, 69, 86, 27, 10 ], label: 'Phrasal Verbs', backgroundColor: '#ef4444', hoverBackgroundColor: '#ef4444', indexAxis: 'x' },
    { data: [ 78, 18, 20, 9, 76, 23, 20 ], label: 'Adjectives', backgroundColor: '#f59e0b', hoverBackgroundColor: '#f59e0b', indexAxis: 'x' },
    { data: [ 18, 98, 10, 89, 46, 47, 30 ], label: 'Connectors', backgroundColor: '#3730a3', hoverBackgroundColor: '#3730a3', indexAxis: 'x' },
    { data: [ 48, 28, 5, 19, 56, 27, 40 ], label: 'Prepositons', backgroundColor: '#22c55e', hoverBackgroundColor: '#22c55e', indexAxis: 'x' },

  ];

  barChartLabels: String[] = [ 'Monday', 'Tuesday', 'Wendsday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


  barChartOptions = {
    responsive: true,
    plugins: {
      // indexAxis: 'x',
      title: {
        display: true,
        text: 'Number of register by collections',
      },
    },
  };



  barChartLegend = true;

  barChartPlugins = [
  ];

  barChartType: ChartType = 'bar';

  barChartTitle = 'Number of register by collections';




}
