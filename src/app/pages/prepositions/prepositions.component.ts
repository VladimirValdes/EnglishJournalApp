import {  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription, tap } from 'rxjs';
import { Preposition, Prepositions } from 'src/app/interfaces/preposition.interface';
import { AlertsService } from 'src/app/services/alerts.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { PrepositionsService } from 'src/app/services/prepositions.service';
import { ReportService } from 'src/app/services/report.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prepositions',
  templateUrl: './prepositions.component.html',
  styleUrls: ['./prepositions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class PrepositionsComponent implements OnInit, OnDestroy {

  @ViewChild('closebtn') closebtn!: ElementRef;

  @ViewChild('openModal') openModal!:ElementRef;

  sumitted = false;

  updatePreposition = false;

  allPrepositions = false;

  search = '';

  idPreposition = '';

  total = 0;

  modalTitle = 'Add Preposition';


  private subscriptions: Subscription = new Subscription();

  prepositions$!:Observable<Prepositions>;



  public prepositionForm = this.fb.group({
    preposition: ['', [ Validators.required, Validators.minLength(2)]],
  },
  {
    updateOn: 'blur',
  });

  constructor( private fb: FormBuilder,
    private prepositionService: PrepositionsService,
    private alertService: AlertsService,
    private reportService: ReportService,
    private paginationService: PaginationService,
    private cdr: ChangeDetectorRef) { }
 

  ngOnInit(): void {
    this.getPrepositions();

    this.subscriptions.add(
      this.paginationService.totalSubject.subscribe( total => {
        this.pagination(total);
      }),
    );

  }

  pagination(items = 0) {

    
    if ( this.search ) {

      this.onSearch( this.search, items );
      
      return;
    }

    this.getPrepositions( items );
    
  }

  getPrepositions( from = 0 ) {

    this.prepositions$ = this.prepositionService.getPrepositions( from ).pipe(

      tap( prepositions => {
        this.total = prepositions.total;

        if (!this.allPrepositions) {
          this.paginationService.pagination(this.total);
        }
        this.allPrepositions = true;

      }));
      
    this.search = '';
    this.cdr.detectChanges();
  }

  addPreposition() {
    this.sumitted = true;
    if ( this.prepositionForm.invalid) { return; }

    if ( this.updatePreposition ) {
      this.subscriptions.add(
        this.prepositionService.updatePreposition( this.prepositionForm.value, this.idPreposition ).subscribe( () => {
          this.alertService.success('Updated', 'Your preposition has been updated');
          this.getPrepositions();
        }));

    } else {
      this.subscriptions.add(

        this.prepositionService.addPreposition(this.prepositionForm.value).subscribe( () => {
          this.allPrepositions = false;
          this.getPrepositions();
          this.alertService.success('Created', 'Your preposition has been created');

        }));


    }

    this.closebtn.nativeElement.click();
    this.close();

  

  }

  selectecPreposition( preposition: Preposition) {
    this.prepositionForm.reset({
      preposition: preposition.preposition,
    });

    this.modalTitle = 'Update Preposition';
    this.idPreposition = preposition._id;
    this.updatePreposition = true;
    this.openModal.nativeElement.click();
    
  }

  deletePreposition( id: string ) {
    this.alertService.confirm().then( ( result ) => {
      if ( result.isConfirmed ) {
        this.subscriptions.add(
          this.prepositionService.deletePreposition(id).subscribe( () => {
            this.alertService.success('Deleted', 'Your preposition has been deleted');
            this.allPrepositions = false;
            this.getPrepositions();
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
      this.reportService.generateReport('prepositions', 'preposition' ).subscribe( resp => {
        let fileURL = URL.createObjectURL( resp );      
        window.open(fileURL);

        Swal.close();
        Swal.hideLoading();
      }));
    
  }

  onSearch( term: string, from = 0) {

    if ( term ) {
      this.prepositions$ = this.prepositionService.searchPreposition( term, from ).pipe(
        tap( resp => {
          this.total = resp.total;

          if (this.search !== term) {
            
            this.paginationService.pagination(this.total );
            
          }

          if ( resp.prepositions.length <= 0) {
            this.alertService.info("We don't find any register");
          }

          this.search = term;

        }),
      );
    } else {
      this.getPrepositions();
    }

    this.allPrepositions = false;
  }

  trackByFn( index: number): number {
    return index;
  }

  invalidField(formControl: string): boolean {
    const field = this.prepositionForm.get(formControl);
    return (field?.invalid && ( field?.touched || field?.dirty) && this.sumitted) ? true : false;
  }

  close( ) {
    this.updatePreposition = false;
    this.prepositionForm.reset({
      preposition: '',
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
