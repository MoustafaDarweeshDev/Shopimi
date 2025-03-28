import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./Layout/header/header.component";
import { HttpClient } from '@angular/common/http';
import { Product } from './Shared/Models/Product';
import { Pagination } from './Shared/Models/Pagination';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Shopifi';


  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5001/api/';
  products:Product[] = [];

  ngOnInit(): void {
      this.http.get<Pagination<Product>>(this.baseUrl + 'products').subscribe({
        next: response  => this.products = response.data,
        error: err => console.log(err),
        complete: ()=> console.log('complete')
      })
  }

}
