import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { PhrasalVerb } from 'src/app/interfaces/phrasalVerb.interface';
import { AlertsService } from 'src/app/services/alerts.service';
import { PhrasalVerbService } from 'src/app/services/phrasalVerbs.service';

@Component({
  selector: 'app-phrasal-verbs',
  templateUrl: './phrasal-verbs.component.html',
  styleUrls: ['./phrasal-verbs.component.scss'],
})
export class PhrasalVerbsComponent implements OnInit {

  @ViewChild('closebtn') closebtn!: ElementRef;

  @ViewChild('openModal') openModal!:ElementRef;

  sumitted = false;

  updateFv = false;

  idPhrasalVerb = '';


  phrasalVerbs$!:Observable<PhrasalVerb[]>;


  public phrasalVerbForm = this.fb.group({
    phrasalVerb: ['', [ Validators.required, Validators.minLength(2)]],
  },
  {
    updateOn: 'blur',
  });
 

  constructor( private fb: FormBuilder,
    private phrasalVerbService: PhrasalVerbService,
    private alertService: AlertsService) { }

  ngOnInit(): void {
    this.getPhrasalVerbs();
  }


  getPhrasalVerbs() {
    this.phrasalVerbs$ = this.phrasalVerbService.getPhrasalVerbs();
  }

  addPhrasalVerb() {
    this.sumitted = true;
    if ( this.phrasalVerbForm.invalid) { return; }

    console.log( this.phrasalVerbForm.get('phrasalVerb')?.value);
    

    if ( this.updateFv ) {
      this.phrasalVerbService.updatePhrasalVerb( this.phrasalVerbForm.value, this.idPhrasalVerb ).subscribe( () => {
        this.alertService.success('Updated', 'Your verb has been updated');
        this.getPhrasalVerbs();
      });

    } else {
      this.phrasalVerbService.addPhrasalVerb(this.phrasalVerbForm.value).subscribe( () => {
        this.alertService.success('Created', 'Your phrasal verb has been created');
        this.getPhrasalVerbs();

      });
    }

    this.closebtn.nativeElement.click();
    this.close();

  

  }

  selectPhrasalVerb( phrasalVerb: PhrasalVerb) {
    console.log(phrasalVerb);
    this.phrasalVerbForm.reset({
      phrasalVerb: phrasalVerb.phrasalVerb,
    });

    this.idPhrasalVerb = phrasalVerb._id;
    this.updateFv = true;
    this.openModal.nativeElement.click();
    
  }

  deletePhrasalVerb( id: string ) {
    this.alertService.confirm().then( ( result ) => {
      if ( result.isConfirmed ) {
        this.phrasalVerbService.deletePhrasalVerb(id).subscribe( () => {
          this.alertService.success('Deleted', 'Your verb has been deleted');
          this.getPhrasalVerbs();
        });
      }
    });
    
  }

  onSearch( term: string ) {

    console.log({ term });
    
    if ( term ) {
      this.phrasalVerbs$ = this.phrasalVerbService.searchPhrasalVerbs( term ).pipe(
        tap( phrasalV => {
          if ( phrasalV.length <= 0) {
            this.alertService.info("We don't find any register");
            this.getPhrasalVerbs();
          }
        }),
      );
    } else {
      this.getPhrasalVerbs();
    }
  }

  trackByFn( index: number): number {
    return index;
  }

  invalidField(formControl: string): boolean {
    const field = this.phrasalVerbForm.get(formControl);
    return (field?.invalid && ( field?.touched || field?.dirty) && this.sumitted) ? true : false;
  }

  close( ) {
    this.updateFv = false;
    this.phrasalVerbForm.reset({
      phrasalVerb: '',
    });
  }
  

}
