import { Component, inject, OnInit, output } from '@angular/core';
import { CheckoutService } from '../../../Core/Services/checkout.service';
import {MatRadioModule} from '@angular/material/radio';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../Core/Services/cart.service';
import { DeliveryMethod } from '../../../Shared/Models/deliveryMethod';


@Component({
  selector: 'app-checkout-delivery',
  standalone: true,
  imports: [
    MatRadioModule,
    CurrencyPipe
  ],
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.scss'
})
export class CheckoutDeliveryComponent implements OnInit{
  checkoutService = inject(CheckoutService);
  cartService = inject(CartService);
  deliveryComplete = output<boolean>();

  ngOnInit(){
    this.checkoutService.getDeliveryMethods().subscribe({
      next: methods => {
        const methodId = this.cartService.cart()?.deliveryMethodId;
        if(methodId){
          const method = methods.find(x => x.id == methodId)

          if(method){ 
            this.cartService.selectedDelivery.set(method);
            this.deliveryComplete.emit(true);
          }
        }
      }
    })
  }

  updateDeliveryMethod(method: DeliveryMethod){
    this.cartService.selectedDelivery.set(method);
    const cart = this.cartService.cart();
    if(cart){
      cart.deliveryMethodId = method.id;
      this.cartService.setCart(cart);            
      this.deliveryComplete.emit(true);
    }
  }
}
