import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription, tap } from 'rxjs';
import { Adjective } from 'src/app/interfaces/adjectives.interface';
import { AdjectivesService } from 'src/app/services/adjectives.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { ReportService } from 'src/app/services/report.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adjectives',
  templateUrl: './adjectives.component.html',
  styleUrls: ['./adjectives.component.scss'],
})
export class AdjectivesComponent implements OnInit, OnDestroy {

  @ViewChild('closebtn') closebtn!: ElementRef;

  @ViewChild('openModal') openModal!:ElementRef;

  sumitted = false;

  updateAdj = false;

  mobile!:boolean;

  idAdjective = '';


  adjectives$!:Observable<Adjective[]>;

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
    private reportService: ReportService) { }


  ngOnInit(): void {
    this.getAdjectives();
  }

  getAdjectives() {
    this.adjectives$ = this.adjectivesService.getAdjectives();
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

  onSearch( term: string ) {

    
    if ( term ) {
      this.adjectives$ = this.adjectivesService.searchAdjectives( term ).pipe(
        tap( adjective => {
          if ( adjective.length <= 0) {
            this.alertService.info("We don't find any register");
            this.getAdjectives();
          }
        }),
      );
    } else {
      this.getAdjectives();
    }
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
