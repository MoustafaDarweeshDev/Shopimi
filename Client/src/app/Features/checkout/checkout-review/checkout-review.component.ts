import { Component, inject, Input } from '@angular/core';
import { CartService } from '../../../Core/Services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { ConfirmationToken } from '@stripe/stripe-js';
import { AddressPipe } from '../../../Shared/pipes/address.pipe';
import { PaymentCardPipe } from '../../../Shared/pipes/payment-card.pipe';

@Component({
  selector: 'app-checkout-review',
  standalone: true,
  imports: [
    CurrencyPipe,
    AddressPipe,
    PaymentCardPipe
  ],
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss'
})
export class CheckoutReviewComponent {
  @Input() confirmationToken?:ConfirmationToken;
  cartService = inject(CartService);
}
