import { Routes } from '@angular/router';
import { HomeComponent } from './Features/home/home.component';
import { ShopComponent } from './Features/shop/shop.component';
import { ProductDetailsComponent } from './Features/shop/product-details/product-details.component';
import { TestErrorComponent } from './Features/test-error/test-error.component';
import { ServerErrorComponent } from './Shared/components/server-error/server-error.component';
import { NotFoundComponent } from './Shared/components/not-found/not-found.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'shop/:id', component: ProductDetailsComponent},
  {path: 'test-error', component: TestErrorComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', redirectTo: '', pathMatch:'full'}
];
