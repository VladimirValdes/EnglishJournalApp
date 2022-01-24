import { Component, OnInit } from '@angular/core';
import { VerbsService } from 'src/app/services/verbs.service';

@Component({
  selector: 'app-verbs',
  templateUrl: './verbs.component.html',
  styleUrls: ['./verbs.component.scss'],
})
export class VerbsComponent implements OnInit {

  constructor( private verbService: VerbsService) { }

  ngOnInit(): void {
    this.verbService.getVerbs().subscribe( verbs => {
      console.log({ verbs });
    });
  }

}
