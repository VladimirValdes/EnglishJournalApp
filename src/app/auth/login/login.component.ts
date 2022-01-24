import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingServicesService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loading!: boolean;

  private subscription: Subscription = new Subscription();

  public loginForm = this.fb.group(
    {
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.email,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    },
    {
      updateOn: 'blur',
    },
  );

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingService: LoadingServicesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.loadingService.loadingSub.subscribe((value) => {
        this.loading = value;
        console.log('loading', this.loading);
      }),
    );
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.subscription.add(
      this.authService.login(this.loginForm.value).subscribe((resp) => {
        console.log(resp);
        this.router.navigateByUrl('/dashboard');
      }),
    );
  }

  invalidField(formControl: string): boolean {
    const field = this.loginForm.get(formControl);
    return field?.invalid && (field?.touched || field?.dirty) ? true : false;
  }

  validField(formControl: string): boolean {
    const field = this.loginForm.get(formControl);
    return field?.valid && (field?.touched || field?.dirty) ? true : false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
