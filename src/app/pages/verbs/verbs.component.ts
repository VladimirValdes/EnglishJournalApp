import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Verb } from 'src/app/interfaces/verbs.interface';
import { VerbsService } from 'src/app/services/verbs.service';

@Component({
  selector: 'app-verbs',
  templateUrl: './verbs.component.html',
  styleUrls: ['./verbs.component.scss'],
})
export class VerbsComponent implements OnInit {

  // private readonly destroy$ = new Subject();

  verbs$!:Observable<Verb[]>;
 
  constructor( private verbService: VerbsService) { }
 

  ngOnInit(): void {
    this.verbs$ = this.verbService.getVerbs();
  }

}
