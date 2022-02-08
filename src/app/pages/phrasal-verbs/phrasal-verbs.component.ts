import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-phrasal-verbs',
  templateUrl: './phrasal-verbs.component.html',
  styleUrls: ['./phrasal-verbs.component.scss'],
})
export class PhrasalVerbsComponent implements OnInit {

  @ViewChild('closebtn') closebtn!: ElementRef;

  @ViewChild('openModal') openModal!:ElementRef;

  sumitted = false;

  phrasalVerbs$!:Observable<[]>;


  public phrasalVerbForm = this.fb.group({
    phrasalVerb: ['', [ Validators.required, Validators.minLength(2)]],
  },
  {
    updateOn: 'blur',
  });
 

  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getPharalVerbs();
  }


  getPharalVerbs() {
    // this.phrasalVerbs$ = this.verbService.getVerbs();
  }

  addPhrasalVerb() {
    this.sumitted = true;
    if ( this.phrasalVerbForm.invalid) { return; }

    // if ( this.updateV ) {
    //   this.verbService.updateVerb( this.verbForm.value, this.idVerb ).subscribe( () => {
    //     this.alertService.success('Updated', 'Your verb has been updated');
    //     this.getVerbs();
    //   });

        
    // } else {
    //   this.verbService.addVerb(this.verbForm.value).subscribe( () => {
    //     this.alertService.success('Created', 'Your verb has been created');
    //     this.getVerbs();

    //   });
    // }

    this.closebtn.nativeElement.click();
    this.close();

  

  }

  onSearch( term: string ) {

    console.log({ term });
    
    // if ( term ) {
    //   this.verbs$ = this.verbService.searchVerbs( term ).pipe(
    //     tap( verbs => {
    //       if ( verbs.length <= 0) {
    //         this.alertService.info("We don't find any register");
    //         this.getVerbs();
    //       }
    //     }),
    //   );
    // } else {
    //   this.getVerbs();
    // }
  }

  invalidField(formControl: string): boolean {
    const field = this.phrasalVerbForm.get(formControl);
    return (field?.invalid && ( field?.touched || field?.dirty) && this.sumitted) ? true : false;
  }

  close( ) {
    // this.updateV = false;
    this.phrasalVerbForm.reset({
      phrasalVerb: '',
    });
  }
  

}
