import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription, tap } from 'rxjs';
import { Preposition } from 'src/app/interfaces/preposition.interface';
import { AlertsService } from 'src/app/services/alerts.service';
import { PrepositionsService } from 'src/app/services/prepositions.service';
import { ReportService } from 'src/app/services/report.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prepositions',
  templateUrl: './prepositions.component.html',
  styleUrls: ['./prepositions.component.scss'],
})
export class PrepositionsComponent implements OnInit, OnDestroy {

  @ViewChild('closebtn') closebtn!: ElementRef;

  @ViewChild('openModal') openModal!:ElementRef;

  sumitted = false;

  updatePreposition = false;

  idPreposition = '';


  private subscriptions: Subscription = new Subscription();

  prepositions$!:Observable<Preposition[]>;



  public prepositionForm = this.fb.group({
    preposition: ['', [ Validators.required, Validators.minLength(2)]],
  },
  {
    updateOn: 'blur',
  });

  constructor( private fb: FormBuilder,
    private prepositionService: PrepositionsService,
    private alertService: AlertsService,
    private reportService: ReportService) { }
 

  ngOnInit(): void {
    this.getPrepositions();
  }

  getPrepositions() {
    this.prepositions$ = this.prepositionService.getPrepositions();
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
          this.alertService.success('Created', 'Your preposition has been created');
          this.getPrepositions();

        }));
    }

    this.closebtn.nativeElement.click();
    this.close();

  

  }

  selectecPreposition( preposition: Preposition) {
    this.prepositionForm.reset({
      preposition: preposition.preposition,
    });

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

  onSearch( term: string ) {

    if ( term ) {
      this.prepositions$ = this.prepositionService.searchPreposition( term ).pipe(
        tap( preposition => {
          if ( preposition.length <= 0) {
            this.alertService.info("We don't find any register");
            this.getPrepositions();
          }
        }),
      );
    } else {
      this.getPrepositions();
    }
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
