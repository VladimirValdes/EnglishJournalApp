import {  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription, tap } from 'rxjs';
import { Verbs, Verb } from 'src/app/interfaces/verbs.interface';
import { AlertsService } from 'src/app/services/alerts.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { ReportService } from 'src/app/services/report.service';
import { VerbsService } from 'src/app/services/verbs.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-verbs',
  templateUrl: './verbs.component.html',
  styleUrls: ['./verbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerbsComponent implements OnInit, OnDestroy {

  @ViewChild('closebtn') closebtn!: ElementRef;

  @ViewChild('openModal') openModal!:ElementRef;

  @ViewChild('selectFilter') selectFilter!:ElementRef;

  private subscription: Subscription = new Subscription();





  sumitted = false;

  updateV = false;

  allVerbs = false;

  idVerb = '';

  search = '';

  filter = '';

  selectedFilter = '';

  total = 0;

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

  

  verbs$!:Observable<Verbs>;



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
    private alertService: AlertsService,
    private paginationService: PaginationService,
    private cdr: ChangeDetectorRef) { }

 
  ngOnInit(): void {
    this.getVerbs();

    this.subscription.add(
      this.paginationService.totalSubject.subscribe( total => {
        this.pagination(total);
      }),
    );

  }

  pagination( items = 0) {
    
    if ( this.search ) {

      this.onSearch( this.search, items );
      
      return;
    }

    
    if ( this.filter ) {

      this.filterBy( this.filter, items );
      
      return;
    }


    this.getVerbs( items );
    
  }

  getVerbs( from = 0 ) {

    this.verbs$ = this.verbService.getVerbs( from ).pipe(
      tap( verbs => {
        this.total = verbs.total;
        if (!this.allVerbs) {
          this.paginationService.pagination(this.total);
        }
        this.allVerbs = true;
      }));

    this.search = '';
    this.filter = '';
    this.cdr.detectChanges();
  }

  addVerb() {
    this.sumitted = true;
    this.selectFilter.nativeElement.value = '';

    if ( this.verbForm.invalid) { return; }

    if ( this.updateV ) {
      this.subscription.add(
        this.verbService.updateVerb( this.verbForm.value, this.idVerb ).subscribe( () => {
          this.alertService.success('Updated', 'Your verb has been updated');
          this.getVerbs();
        }),
      );
    } else {
      this.subscription.add(
        this.verbService.addVerb(this.verbForm.value).subscribe( () => {
          this.alertService.success('Created', 'Your verb has been created');
          this.allVerbs = false;
          this.getVerbs();
        }));
    }

    this.closebtn.nativeElement.click();
    this.close();
  }

  deleteVerb( id: string ) {
    this.alertService.confirm().then( ( result ) => {
      if ( result.isConfirmed ) {
        this.subscription.add(
          this.verbService.deleteVerb(id).subscribe( () => {
            this.alertService.success('Deleted', 'Your verb has been deleted');
            this.allVerbs = false;
            this.getVerbs();
          }));
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

  onSearch( term: string, from = 0 ) {
    if ( term ) {
      this.verbs$ = this.verbService.searchVerbs( term, from ).pipe(
        tap( resp => {
          
          this.total = resp.total;

          if (this.search !== term) {
            
            this.paginationService.pagination( resp.total );
            
          }
          
          if ( resp.verbs.length <= 0) {
            this.alertService.info("We don't find any register");
          }

          this.search = term;
          
        }),
      );
    } else {
      this.getVerbs();
    }
    this.allVerbs = false;
    this.filter = '';
    this.selectFilter.nativeElement.value = '';
  }

  filterBy( term: string, from = 0 ) {

    if ( !term ) {
      return;
    }

    const field = ( term === 'regular' || term === 'irregular') ? 'type' : 'nik';

    
    this.verbs$ = this.verbService.filterVerbs(field, term, from ).pipe(
      tap( resp => {

        
        this.total = resp.total;

        if (this.filter !== term ) {
          
          this.paginationService.pagination( this.total );
          
        }
        
        this.filter = term;
        
        if ( resp.verbs.length <= 0) {
          this.alertService.info("We don't find any register");
          this.selectFilter.nativeElement.value = '';
          this.getVerbs();
        }

      }),
    );
       
    this.allVerbs = false;

  }

  getReport( term: string, field: string ) {

    Swal.fire({
      title: 'Loading PDF',
    });
    Swal.showLoading();
    this.subscription.add(
      this.reportService.generateReport('verbs', field, term).subscribe( resp => {
        let fileURL = URL.createObjectURL( resp );      
        window.open(fileURL);

        Swal.close();
        Swal.hideLoading();
      }));
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
