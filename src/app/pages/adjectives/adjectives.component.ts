import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription, tap } from 'rxjs';
import { Adjective, Adjectives } from 'src/app/interfaces/adjectives.interface';
import { AdjectivesService } from 'src/app/services/adjectives.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { ReportService } from 'src/app/services/report.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adjectives',
  templateUrl: './adjectives.component.html',
  styleUrls: ['./adjectives.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdjectivesComponent implements OnInit, OnDestroy {

  @ViewChild('closebtn') closebtn!: ElementRef;

  @ViewChild('openModal') openModal!:ElementRef;

  sumitted = false;

  updateAdj = false;

  allAdjectives = false;

  idAdjective = '';

  search = '';

  total = 0;

  modalTitle = 'Add Adjective';


  adjectives$!:Observable<Adjectives>;

  private subscriptions: Subscription = new Subscription();


  public adjectiveForm = this.fb.group({
    adjective: ['', [ Validators.required, Validators.minLength(2)]],
  },
  {
    updateOn: 'blur',
  });

  constructor( private fb: FormBuilder,
    private adjectivesService: AdjectivesService,
    private alertService: AlertsService,
    private reportService: ReportService,
    private paginationService: PaginationService,
    private cdr: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.getAdjectives();

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

    this.getAdjectives( items );
    
  }

  getAdjectives( from = 0) {
    this.adjectives$ = this.adjectivesService.getAdjectives( from )
      .pipe(
        tap( resp => {

          this.total = resp.total;

          if (!this.allAdjectives) {
            this.paginationService.pagination(this.total);
          }
          this.allAdjectives = true;
        }),
      );

    this.search = '';
    this.cdr.detectChanges();
  }

  addAdjective() {
    this.sumitted = true;
    if ( this.adjectiveForm.invalid) { return; }    

    if ( this.updateAdj ) {
      this.subscriptions.add(
        this.adjectivesService.updateAdjective( this.adjectiveForm.value, this.idAdjective ).subscribe( () => {
          this.alertService.success('Updated', 'Your adjective has been updated');
          this.getAdjectives();
        }));

    } else {
      this.subscriptions.add(
        this.adjectivesService.addAdjective(this.adjectiveForm.value).subscribe( () => {
          this.allAdjectives = false;
          this.alertService.success('Created', 'Your adjective has been created');
          this.getAdjectives();

        }));
    }

    this.closebtn.nativeElement.click();
    this.close();

  

  }

  selectAdjective( adjective: Adjective) {
    this.adjectiveForm.reset({
      adjective: adjective.adjective,
    });

    this.modalTitle = 'Update Adjective';
    this.idAdjective = adjective._id;
    this.updateAdj = true;
    this.openModal.nativeElement.click();
    
  }

  deleteAdjective( id: string ) {
    this.alertService.confirm().then( ( result ) => {
      if ( result.isConfirmed ) {
        this.subscriptions.add(
          this.adjectivesService.deleteAdjective(id).subscribe( () => {
            this.alertService.success('Deleted', 'Your adjective has been deleted');
            this.allAdjectives = false;
            this.getAdjectives();
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
      this.reportService.generateReport('adjectives', 'adjective' ).subscribe( resp => {
        let fileURL = URL.createObjectURL( resp );      
        window.open(fileURL);

        Swal.close();
        Swal.hideLoading();
      }));
    
  }

  onSearch( term: string, from = 0 ) {

    
    if ( term ) {
      this.adjectives$ = this.adjectivesService.searchAdjectives( term, from ).pipe(
        tap( resp => {

          this.total = resp.total;

          if (this.search !== term) {
            
            this.paginationService.pagination( this.total );
            
          }

          if ( resp.adjectives.length <= 0) {
            this.alertService.info("We don't find any register");
          }

          this.search = term;

        }),
      );
    } else {
      this.getAdjectives();
    }

    this.allAdjectives = false;

  }

  trackByFn( index: number): number {
    return index;
  }

  invalidField(formControl: string): boolean {
    const field = this.adjectiveForm.get(formControl);
    return (field?.invalid && ( field?.touched || field?.dirty) && this.sumitted) ? true : false;
  }

  close( ) {
    this.updateAdj = false;
    this.adjectiveForm.reset({
      adjective: '',
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
