import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  valid = false;

  public loginForm = this.fb.group(
    {
      email: [ '', [ Validators.required, Validators.minLength(3), Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password:[ '', [ Validators.required, Validators.minLength(8)]]
    })

  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  login() {

    if ( this.loginForm.invalid) { 

      return;
     }

    console.log(this.loginForm.value)
  }

  invalidField( formControl: string ): boolean {

    const field = this.loginForm.get( formControl );
    return ( field?.invalid && ( field?.touched || field?.dirty)) ? true : false;

  }

  validField( formControl: string ): boolean {

    const field = this.loginForm.get( formControl );
    return ( field?.valid && ( field?.touched || field?.dirty)) ? true : false;

  }

}
