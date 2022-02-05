import { Component, ViewChild } from '@angular/core';
import {  ChartDataset, ChartType } from 'chart.js';
import { format } from 'date-fns';
import { BaseChartDirective } from 'ng2-charts';
import { CountRegister, DateFilter } from 'src/app/interfaces/countRegister.interface';
import { DatesService } from 'src/app/services/dates.service';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss'],
})
export class BarchartComponent  {

  today = new Date();

  dates: DateFilter = {
    startDate: '',
    endDate: '',
  };

  labels: string[] = [];
  
  constructor( private statisticsService: StatisticsService,
    private datesService: DatesService) {}

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  barChartData: ChartDataset[] = [
    { data: [ 65 ], label: 'Verbs', backgroundColor: '#3b82f6', hoverBackgroundColor: '#3b82f6' },
    { data: [ 58 ], label: 'Phrasal Verbs', backgroundColor: '#ef4444', hoverBackgroundColor: '#ef4444' },
    { data: [ 78 ], label: 'Adjectives', backgroundColor: '#f59e0b', hoverBackgroundColor: '#f59e0b' },
    { data: [ 48 ], label: 'Prepositons', backgroundColor: '#22c55e', hoverBackgroundColor: '#22c55e' },
    { data: [ 18 ], label: 'Connectors', backgroundColor: '#3730a3', hoverBackgroundColor: '#3730a3' },

  ];

  barChartLabels: String[] = ['Monday'];


  barChartOptions = {
    responsive: true,
    scale: {
      ticks: {
        precision: 0,
      },
    },
  };



  barChartLegend = true;

  barChartPlugins = [
  ];

  barChartType: ChartType = 'bar';

  barChartTitle = 'Number of register by collections';

  getTodayRegisters() {
    const { startAt, endAt } = this.datesService.getDay(this.today);

    console.log('click inside registers');
    
    this.dates.startDate = startAt;
    this.dates.endDate = endAt;
    const day = format(this.today, 'EEEE');

    if ( this.labels.length > 0 ){ this.labels.pop( );}

    this.labels.push(day);

    this.statisticsService.getNumberStatistic( this.dates ).subscribe( data => {
      this.setRegisters(data, this.labels);   
    });

    

  }

  getRegistersByCurrentMonth() {
    const { startAt, endAt } = this.datesService.currentMonth(0);
    this.dates.startDate = startAt;
    this.dates.endDate = endAt;

    const month = format(this.today, 'MMMM');

    if ( this.labels.length > 0 ){ this.labels.pop( );}

    this.labels.push(month);

    this.statisticsService.getNumberStatistic( this.dates ).subscribe( data => {
      this.setRegisters(data, this.labels);   
    });

  }

  setRegisters( collections: CountRegister, labels: string[] ) {
    this.barChartData[0].data = [collections.verbsTotal];
    this.barChartData[1].data = [collections.phrasalverbsTotal];
    this.barChartData[2].data = [collections.adjectivesTotal];
    this.barChartData[3].data = [collections.prepositionsTotal];
    this.barChartData[4].data = [collections.connectorsTotal];


    this.barChartLabels = labels;

    this.chart?.update();

  }




}
