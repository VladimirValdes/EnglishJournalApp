import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription, tap } from 'rxjs';
import { PhrasalVerb, PhrasalVerbs } from 'src/app/interfaces/phrasalVerb.interface';
import { AlertsService } from 'src/app/services/alerts.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { PhrasalVerbService } from 'src/app/services/phrasalVerbs.service';
import { ReportService } from 'src/app/services/report.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-phrasal-verbs',
  templateUrl: './phrasal-verbs.component.html',
  styleUrls: ['./phrasal-verbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhrasalVerbsComponent implements OnInit, OnDestroy {

  @ViewChild('closebtn') closebtn!: ElementRef;

  @ViewChild('openModal') openModal!:ElementRef;

  sumitted = false;

  updateFv = false;

  allPhrasalVerbs = false;

  search = '';

  idPhrasalVerb = '';

  total = 0;

  modalTitle = 'Add Phrasal Verb';


  phrasalVerbs$!:Observable<PhrasalVerbs>;

  private subscriptions: Subscription = new Subscription();


  public phrasalVerbForm = this.fb.group({
    phrasalVerb: ['', [ Validators.required, Validators.minLength(2)]],
  },
  {
    updateOn: 'blur',
  });
 

  constructor( private fb: FormBuilder,
    private phrasalVerbService: PhrasalVerbService,
    private reportService: ReportService,
    private alertService: AlertsService,
    private paginationService: PaginationService,
    private cdr: ChangeDetectorRef) { }
  
  ngOnInit(): void {
    this.getPhrasalVerbs();


    this.subscriptions.add(
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



    this.getPhrasalVerbs( items );
    
  }

  getPhrasalVerbs( from = 0) {
    this.phrasalVerbs$ = this.phrasalVerbService.getPhrasalVerbs(from).pipe(
      tap( phrasalVerbs => {

        this.total = phrasalVerbs.total;

        if (!this.allPhrasalVerbs) {
          this.paginationService.pagination(this.total);
        }
        this.allPhrasalVerbs = true;
      }));

    this.search = '';
    this.cdr.detectChanges();
  }

  addPhrasalVerb() {
    this.sumitted = true;
    if ( this.phrasalVerbForm.invalid) { return; }


    if ( this.updateFv ) {
      this.subscriptions.add(
        this.phrasalVerbService.updatePhrasalVerb( this.phrasalVerbForm.value, this.idPhrasalVerb ).subscribe( () => {
          this.alertService.success('Updated', 'Your verb has been updated');
          this.getPhrasalVerbs();
        }));

    } else {
      this.subscriptions.add(
        this.phrasalVerbService.addPhrasalVerb(this.phrasalVerbForm.value).subscribe( () => {
          this.alertService.success('Created', 'Your phrasal verb has been created');
          this.allPhrasalVerbs = false;
          this.getPhrasalVerbs();

        }));
    }

    this.closebtn.nativeElement.click();
    this.close();

  

  }

  selectPhrasalVerb( phrasalVerb: PhrasalVerb) {
    this.phrasalVerbForm.reset({
      phrasalVerb: phrasalVerb.phrasalVerb,
    });

    this.modalTitle = 'Update Pharasal Verb';
    this.idPhrasalVerb = phrasalVerb._id;
    this.updateFv = true;
    this.openModal.nativeElement.click();
    
  }

  deletePhrasalVerb( id: string ) {
    this.alertService.confirm().then( ( result ) => {
      if ( result.isConfirmed ) {
        this.subscriptions.add(
          this.phrasalVerbService.deletePhrasalVerb(id).subscribe( () => {
            this.alertService.success('Deleted', 'Your verb has been deleted');
            this.allPhrasalVerbs = false;
            this.getPhrasalVerbs();
          }));
      }
    });
    
  }

  generateReport() {
    Swal.fire({
      title: 'Loading PDF',
    });
    Swal.showLoading();
    this.subscriptions.add(
      this.reportService.generateReport('phrasalverbs', 'phrasalverb' ).subscribe( resp => {
        let fileURL = URL.createObjectURL( resp );      
        window.open(fileURL);

        Swal.close();
        Swal.hideLoading();
      }));
    
  }

  onSearch( term: string, from = 0 ) {

    
    if ( term ) {
      this.phrasalVerbs$ = this.phrasalVerbService.searchPhrasalVerbs( term, from ).pipe(
        tap( resp => {

          this.total = resp.total;

          if (this.search !== term) {
            
            this.paginationService.pagination( this.total );
            
          }

          if ( resp.phrasalVerbs.length <= 0) {
            this.alertService.info("We don't find any register");
          }

          this.search = term;

        }),
      );
    } else {
      this.getPhrasalVerbs();
    }

    this.allPhrasalVerbs = false;

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
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


}
