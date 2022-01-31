import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  collections = [
    {
      name: 'Verbs',
      color: '#3b82f6',
      numbers: 0,
    },
    {
      name: 'Phrasal Verbs',
      color: '#ef4444',
      numbers: 0,

    },
    {
      name: 'Adjectives',
      color: '#f59e0b',
      numbers: 0,

    },
    {
      name: 'Prepositions',
      color: '#22c55e',
      numbers: 0,

    },
    {
      name: 'Connectors',
      color: '#3730a3',
      numbers: 0,

    },
  ];


  constructor( private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getCountRegisters().subscribe( registers => {

      this.collections[0].numbers = registers.verbsTotal;
      this.collections[1].numbers = registers.phrasalverbsTotal;
      this.collections[2].numbers = registers.adjectivesTotal;
      this.collections[3].numbers = registers.prepositionsTotal;
      this.collections[4].numbers = registers.connectorsTotal;

      
    });
  }

}
