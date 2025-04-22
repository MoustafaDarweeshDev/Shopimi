import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../Core/Services/account.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../Core/Services/snackbar.service';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { TextInputComponent } from "../../../Shared/components/text-input/text-input.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatButton,
    TextInputComponent
],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private rouer = inject(Router);
  private snack = inject(SnackbarService);

  registerForm = this.fb.group({
    firstName : ['', Validators.required],
    lastName : ['', Validators.required],
    email : ['', [Validators.required , Validators.email]],
    password : ['', [Validators.required]]
  });
  validationErrors? : string[];

  onSubmit(){
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => {
        this.snack.success('registration successful - you can login now')
        this.rouer.navigateByUrl('/account/login')
      },
      error: errors => this.validationErrors = errors
    })
  }
}
