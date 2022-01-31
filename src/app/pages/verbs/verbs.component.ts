import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { Verb } from 'src/app/interfaces/verbs.interface';
import { AlertsService } from 'src/app/services/alerts.service';
import { VerbsService } from 'src/app/services/verbs.service';

@Component({
  selector: 'app-verbs',
  templateUrl: './verbs.component.html',
  styleUrls: ['./verbs.component.scss'],
})
export class VerbsComponent implements OnInit {

  @ViewChild('closebtn') closebtn!: ElementRef;

  @ViewChild('openModal') openModal!:ElementRef;

  sumitted = false;

  updateV = false;

  idVerb = '';

  selectedFilter = '';

  type = [ 'rregular', 'irregular'];

  nik = [
    {
      type: 'n',
      desc: 'N ( Neutral Word )',
    },
    {
      type: 'i',
      desc: 'I ( Impact Word )',
    },
    {
      type: 'k',
      desc: 'K ( Know Word )',
    }];

  filters = [
    {
      type: 'regular',
      desc: 'Regular',
    },
    {
      type: 'irregular',
      desc: 'Irregular',
    },
    {
      type: 'n',
      desc: 'N ( Neutral Word )',
    },
    {
      type: 'i',
      desc: 'I ( Impact Word )',
    },
    {
      type: 'k',
      desc: 'K ( Know Word )',
    }];

  

  verbs$!:Observable<Verb[]>;

  public verbForm = this.fb.group({
    baseForm: ['', [ Validators.required, Validators.minLength(2)]],
    pastSimple: ['', [ Validators.required, Validators.minLength(2)]],
    pastParticiple: ['', [ Validators.required, Validators.minLength(2)]],
    type: ['', [ Validators.required, Validators.minLength(2)]],
    nik: ['', [ Validators.required]],
  },
  {
    updateOn: 'blur',
  });
 
  constructor( 
    private verbService: VerbsService,
    private fb: FormBuilder,
    private alertService: AlertsService) { }
 

  ngOnInit(): void {
    this.getVerbs();
  }

  getVerbs() {
    this.verbs$ = this.verbService.getVerbs();
  }

  addVerb() {
    this.sumitted = true;
    if ( this.verbForm.invalid) { return; }

    if ( this.updateV ) {
      this.verbService.updateVerb( this.verbForm.value, this.idVerb ).subscribe( () => {
        this.alertService.success('Updated', 'Your verb has been updated');
        this.getVerbs();
      });

        
    } else {
      this.verbService.addVerb(this.verbForm.value).subscribe( () => {
        this.alertService.success('Created', 'Your verb has been created');
        this.getVerbs();

      });
    }

    this.closebtn.nativeElement.click();
    this.close();

  

  }

  deleteVerb( id: string ) {
    this.alertService.confirm().then( ( result ) => {
      if ( result.isConfirmed ) {
        this.verbService.deleteVerb(id).subscribe( () => {
          this.alertService.success('Deleted', 'Your verb has been deleted');
          this.getVerbs();
        });
      }
    });
  }

  selectVerb( verb: Verb ) {
    this.verbForm.reset({
      baseForm: verb.baseForm,
      pastSimple: verb.pastSimple,
      pastParticiple: verb.pastParticiple,
      type: verb.type,
      nik: verb.nik,
    });

    this.idVerb = verb._id;
    this.updateV = true;
    this.openModal.nativeElement.click();
  }

  onSearch( term: string ) {
    if ( term ) {
      this.verbs$ = this.verbService.searchVerbs( term ).pipe(
        tap( verbs => {
          if ( verbs.length <= 0) {
            this.alertService.info("We don't find any register");
            this.getVerbs();
          }
        }),
      );
    } else {
      this.getVerbs();
    }
  }

  filterBy( term: string ) {
    console.log({ term });
    
  }

  close( ) {
    this.updateV = false;
    this.verbForm.reset({
      type: '',
      nik: '',
    });
  }
  
  invalidField(formControl: string): boolean {
    const field = this.verbForm.get(formControl);
    return (field?.invalid && ( field?.touched || field?.dirty) && this.sumitted) ? true : false;
  }

  trackByFn( index: number): number {
    return index;
  }

}
