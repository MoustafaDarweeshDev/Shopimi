import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { OrderSummaryComponent } from '../../Shared/components/order-summary/order-summary.component';
import { MatButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { StripeService } from '../../Core/Services/stripe.service';
import { SnackbarService } from '../../Core/Services/snackbar.service';
import { ConfirmationToken, StripeAddressElement, StripeAddressElementChangeEvent, StripePaymentElement, StripePaymentElementChangeEvent } from '@stripe/stripe-js';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox'
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Address } from '../../Shared/Models/user';
import { firstValueFrom } from 'rxjs';
import { AccountService } from '../../Core/Services/account.service';
import { CheckoutDeliveryComponent } from "./checkout-delivery/checkout-delivery.component";
import { CheckoutReviewComponent } from "./checkout-review/checkout-review.component";
import { CartService } from '../../Core/Services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    MatStepperModule,
    OrderSummaryComponent,
    MatButton,
    RouterLink,
    MatCheckboxModule,
    CheckoutDeliveryComponent,
    CheckoutReviewComponent,
    CurrencyPipe
],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit, OnDestroy{
  private stripeService = inject(StripeService);
  private snackbar = inject(SnackbarService);
  private accountService = inject(AccountService);
  private router = inject(Router);
  cartService = inject(CartService);
  addressElement? : StripeAddressElement;
  paymentElement? : StripePaymentElement;
  saveAddress = false;
  completionStatus = signal<{address:boolean ,card:boolean , delivery:boolean}>(
    {address:false , card:false, delivery:false}
  );
  confirmationToken?:ConfirmationToken;

  async ngOnInit(){
    try{
      this.addressElement = await this.stripeService.createAddressElement();
      this.addressElement.mount('#address-element')
      this.addressElement.on('change', this.handleAddressChange)

      this.paymentElement = await this.stripeService.createPaymentElement();
      this.paymentElement.mount('#payment-element')
      this.paymentElement.on('change', this.handlePaymentChange)
      
    } catch(error: any){
      this.snackbar.error(error.message);
    }
  }

  handleAddressChange = (event:StripeAddressElementChangeEvent) =>{
    this.completionStatus.update(state => {
      state.address = event.complete
      return state;
    })
  }

  handlePaymentChange = (event:StripePaymentElementChangeEvent) =>{
    this.completionStatus.update(state => {
      state.card = event.complete
      return state;
    })
  }

  handleDeliveryChange(event:boolean){
    this.completionStatus.update(state => {
      state.delivery = event
      return state;
    })
  }

  async getCpnfirmationToken(){
    try {
      if(Object.values(this.completionStatus()).every(status => status === true)) {
        const result = await this.stripeService.createConfirmationToken();
        if(result.error) throw new Error(result.error.message);
        this.confirmationToken = result.confirmationToken;

        console.log(this.confirmationToken);
        
      }
      
    } catch (error : any) {
      this.snackbar.error(error.message)
    }
    
  }

  async onStepChange(event:StepperSelectionEvent){
    if(event.selectedIndex === 1){
      if(this.saveAddress){
        const address = await this.getAddressFrmStripeAddress();
        address && firstValueFrom(this.accountService.updateAddress(address));
      }
    }

    if(event.selectedIndex === 2){
      await firstValueFrom(this.stripeService.createOrUpdayePaymentIntent())
    }

    if(event.selectedIndex === 3){
      await this.getCpnfirmationToken();
    }
  }

  async ConfirmPayment(stepper:MatStepper){
    try {
      if(this.confirmationToken){
        const result = await this.stripeService.confirmPayment(this.confirmationToken);
        if(result.error) {
          throw new Error(result.error.message)
        } else {
           this.cartService.deleteCart();
           this.cartService.selectedDelivery.set(null);
           this.router.navigateByUrl('/checkout/success')
        }
      }
    } catch (error:any) {
      this.snackbar.error(error.message || 'Something went wrong')
      stepper.previous();
    }
  }

  async getAddressFrmStripeAddress() : Promise<Address | null>{
    const resault = await this.addressElement?.getValue();
    const address = resault?.value.address;

    if(address){
      return {
        line1: address.line1,
        line2: address.line2 || undefined,
        city: address.city,
        country: address.country,
        state: address.state,
        postalCode: address.postal_code,
      }
    }else return null;
  }

  onSaveAddressCheckboxChange(event:MatCheckboxChange) {
    this.saveAddress = event.checked;
  }

  ngOnDestroy(): void {
    this.stripeService.disposeElements();
  }
}
