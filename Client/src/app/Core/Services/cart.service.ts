import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Cart, CartItem } from '../../Shared/Models/Cart';
import { Product } from '../../Shared/Models/Product';
import { map, reduce } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl =environment.apiUrl;
  private http = inject(HttpClient);
  cart = signal<Cart | null>(null);
  itemCount = computed( ()=> {
    return this.cart()?.items.reduce((sum, item) => sum + item.quantity, 0)
  });

  totals = computed(()=>{
    const cart = this.cart();
    if(!cart) return null;

    const subtotal = cart.items.reduce((sum, item)=> sum + item.price * item.quantity, 0 )
    const shipping = 0;
    const discount = 0;

    return {
      subtotal,
      shipping,
      discount,
      total: subtotal + shipping - discount
    };
  })

  getCard(id:string){
    return this.http.get<Cart>(this.baseUrl +'cart?id=' + id).pipe(
      map(cart => {
        this.cart.set(cart);
        return cart;
      })
    )
  }

  setCart(cart:Cart){
    return this.http.post<Cart>(this.baseUrl + 'cart' , cart).subscribe({
      next: res => this.cart.set(res),
      error:err=>console.log(err)
    })
  }

  addItemToCart(item : CartItem | Product, quantity = 1){
    const cart = this.cart() ?? this.createCart();
    if(this.isItemProduct(item)){
      item =this.mapProductToCartItem(item);
    }
    cart.items = this.addOrUpdateItem(cart.items, item, quantity);
    this.setCart(cart);
  }

  removeItemFromCart(productId: number, quantity = 1) {
    const cart = this.cart();
    if(!cart) return;

    const index = cart.items.findIndex(x => x.productId = productId);
    if(index === -1) return;

    const item = cart.items[index];

    if(item.quantity > quantity){
      item.quantity -= quantity;
    } else{
      cart.items.splice(index, 1);
    }

    cart.items.length === 0 ? this.deleteCart() : this.setCart(cart)
  }

  deleteCart() {
    this.http.delete(this.baseUrl + 'cart?id=' + this.cart()?.id).subscribe({
      next: ()=>{
        localStorage.removeItem('cart_id');
        this.cart.set(null);
      }
    })
  }

  private addOrUpdateItem(items: CartItem[], item: CartItem, quantity: number): CartItem[] {
    const index = items.findIndex(x=> x.productId === item.productId);
    if(index === -1){
      item.quantity = quantity;
      items.push(item);
    }else {
      items[index].quantity += quantity;
    }
    return items;
  }

  mapProductToCartItem(item: Product):CartItem {
    return {
      productId: item.id ,
      productName: item.name ,
      price: item.price ,
      quantity: 0 ,
      pictureUrl: item.pictureUrl ,
      brand: item.productBrand ,
      type: item.productType ,
    }
  }

  private createCart(): Cart {
    const cart = new Cart();
    localStorage.setItem('cart_id',cart.id)
    return cart;
  }

  private isItemProduct(item: CartItem | Product) : item is Product {
    return (item as Product).id !== undefined;
  }
}

