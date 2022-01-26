import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
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

  sumitted = false;

  type = [ 'rregular', 'irregular'];

  nik = [
    {
      type: 'N',
      desc: 'N ( Neutral Word )',
    },
    {
      type: 'I',
      desc: 'I ( Impact Word )',
    },
    {
      type: 'K',
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

  addVerb() {
    this.sumitted = true;
    if ( this.verbForm.invalid) { return; }

    this.verbService.addVerb(this.verbForm.value).subscribe( () => {
      this.alertService.success('Verb created');
      this.close();
      this.getVerbs();
    });

  }

  close() {
    this.closebtn.nativeElement.click();
    this.verbForm.reset({
      type: '',
      nik: '',
    });
  }

  getVerbs() {
    this.verbs$ = this.verbService.getVerbs();
  }

  
  invalidField(formControl: string): boolean {
    const field = this.verbForm.get(formControl);
    return (field?.invalid && ( field?.touched || field?.dirty) && this.sumitted) ? true : false;
  }

  trackByFn( index: number): number {
    return index;
  }

}
