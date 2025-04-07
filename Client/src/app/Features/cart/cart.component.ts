import { Component, inject } from '@angular/core';
import { CartService } from '../../Core/Services/cart.service';
import { CartItemComponent } from "./cart-item/cart-item.component";
import { OrderSummaryComponent } from "../../Shared/components/order-summary/order-summary.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, OrderSummaryComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartService = inject(CartService)
}
