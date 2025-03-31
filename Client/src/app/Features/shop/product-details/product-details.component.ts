import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';
import { ShopService } from '../../../Core/Services/shop.service';
import { Product } from '../../../Shared/Models/Product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatButton,
    MatIcon,
    MatFormField,
    MatInput,
    MatLabel,
    MatDivider
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  ngOnInit(): void {
    this.getProduct();
  }
  private shopService = inject(ShopService);
  private activatedRoute = inject(ActivatedRoute);
  product?:Product;

  getProduct(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if(!id) return;

    this.shopService.getProductById(+id).subscribe({
      next: res => this.product=res,
      error: err => console.log(err)

    })
  }

}
