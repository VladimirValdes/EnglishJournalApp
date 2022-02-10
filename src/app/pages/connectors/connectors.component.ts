import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { Connector } from 'src/app/interfaces/connectors.interface';
import { AlertsService } from 'src/app/services/alerts.service';
import { ConnectorsService } from 'src/app/services/connectors.service';
import { ReportService } from 'src/app/services/report.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-connectors',
  templateUrl: './connectors.component.html',
  styleUrls: ['./connectors.component.scss'],
})
export class ConnectorsComponent implements OnInit {

  @ViewChild('closebtn') closebtn!: ElementRef;

  @ViewChild('openModal') openModal!:ElementRef;

  sumitted = false;

  updateConnector = false;

  idConnector = '';


  connectors$!:Observable<Connector[]>;


  public connectorForm = this.fb.group({
    connector: ['', [ Validators.required, Validators.minLength(2)]],
  },
  {
    updateOn: 'blur',
  });

  constructor( private fb: FormBuilder,
    private connectorsService: ConnectorsService,
    private alertService: AlertsService,
    private reportService: ReportService) { }

  ngOnInit(): void {
    this.getConnectors();
  }

  getConnectors() {
    this.connectors$ = this.connectorsService.getConnectors();
  }

  addConnector() {
    this.sumitted = true;
    if ( this.connectorForm.invalid) { return; }

    console.log( this.connectorForm.get('connector')?.value);
    

    if ( this.updateConnector ) {
      this.connectorsService.updateConnector( this.connectorForm.value, this.idConnector ).subscribe( () => {
        this.alertService.success('Updated', 'Your connector has been updated');
        this.getConnectors();
      });

    } else {
      this.connectorsService.addConnector(this.connectorForm.value).subscribe( () => {
        this.alertService.success('Created', 'Your connector has been created');
        this.getConnectors();

      });
    }

    this.closebtn.nativeElement.click();
    this.close();

  

  }

  selectConnector( connector: Connector) {
    console.log(connector);
    this.connectorForm.reset({
      connector: connector.connector,
    });

    this.idConnector = connector._id;
    this.updateConnector = true;
    this.openModal.nativeElement.click();
    
  }

  deleteConnector( id: string ) {
    this.alertService.confirm().then( ( result ) => {
      if ( result.isConfirmed ) {
        this.connectorsService.deleteConnector(id).subscribe( () => {
          this.alertService.success('Deleted', 'Your connector has been deleted');
          this.getConnectors();
        });
      }
    });
    
  }

  generateReport() {
    Swal.fire({
      title: 'Loading PDF',
    });
    Swal.showLoading();
    this.reportService.generateReport('connectors', 'connector' ).subscribe( resp => {
      let fileURL = URL.createObjectURL( resp );      
      window.open(fileURL);

      Swal.close();
      Swal.hideLoading();
    });
    
  }

  onSearch( term: string ) {

    console.log({ term });
    
    if ( term ) {
      this.connectors$ = this.connectorsService.searchConnectors( term ).pipe(
        tap( connector => {
          if ( connector.length <= 0) {
            this.alertService.info("We don't find any register");
            this.getConnectors();
          }
        }),
      );
    } else {
      this.getConnectors();
    }
  }

  trackByFn( index: number): number {
    return index;
  }

  invalidField(formControl: string): boolean {
    const field = this.connectorForm.get(formControl);
    return (field?.invalid && ( field?.touched || field?.dirty) && this.sumitted) ? true : false;
  }

  close( ) {
    this.updateConnector = false;
    this.connectorForm.reset({
      adjective: '',
    });
  }

}
