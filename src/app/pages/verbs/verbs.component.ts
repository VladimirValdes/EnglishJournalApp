import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { Verb } from 'src/app/interfaces/verbs.interface';
import { AlertsService } from 'src/app/services/alerts.service';
import { ReportService } from 'src/app/services/report.service';
import { VerbsService } from 'src/app/services/verbs.service';
import Swal from 'sweetalert2';


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

  type = [ 'regular', 'irregular'];

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
      field: 'all',
      type: 'all',
      desc: 'All',
    },
    {
      field: 'type',
      type: 'regular',
      desc: 'Regular',
    },
    {
      field: 'type',
      type: 'irregular',
      desc: 'Irregular',
    },
    {
      field: 'nik',
      type: 'n',
      desc: 'N ( Neutral Word )',
    },
    {
      field: 'nik',
      type: 'i',
      desc: 'I ( Impact Word )',
    },
    {
      field: 'nik',
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
    private reportService: ReportService,
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
    console.log(term );

    const field = ( term === 'regular' || term === 'irregular') ? 'type' : 'nik';

    console.log({ field });
    
    this.verbs$ = this.verbService.filterVerbs(field, term).pipe(
      tap( verbs => {
        if ( verbs.length <= 0) {
          this.alertService.info("We don't find any register");
          this.getVerbs();
        }
      }),
    );

  
    
    
  }

  getReport( term: string, field: string ) {

    Swal.fire({
      title: 'Loading PDF',
    });
    Swal.showLoading();
    this.reportService.generateReport('verbs', field, term).subscribe( resp => {
      let fileURL = URL.createObjectURL( resp );      
      window.open(fileURL);

      Swal.close();
      Swal.hideLoading();
    });
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
