import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../Shared/Models/Product';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../Core/Services/cart.service';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardActions,
    MatIcon,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {

  @Input() product? : Product;
  cartService = inject(CartService)
}
