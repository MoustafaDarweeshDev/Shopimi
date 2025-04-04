import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-test-error',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.scss'
})
export class TestErrorComponent {
  private baseUrl = 'https://localhost:5001/api/';
  private http = inject(HttpClient);
  validationErrors?:string[];


  get404Error(){
    this.http.get(this.baseUrl + 'Buggy/notfound').subscribe({
      next: res=> console.log(res),
      error: err=> console.log(err)
    })
  }

  get400Error(){
    this.http.get(this.baseUrl + 'Buggy/badrequest').subscribe({
      next: res=> console.log(res),
      error: err=> console.log(err)
    })
  }
  get401Error(){
    this.http.get(this.baseUrl + 'Buggy/unauthorized').subscribe({
      next: res=> console.log(res),
      error: err=> console.log(err)
    })
  }
  get500Error(){
    this.http.get(this.baseUrl + 'Buggy/internalerror').subscribe({
      next: res=> console.log(res),
      error: err=> console.log(err)
    })
  }
  get400ValidationError(){
    this.http.post(this.baseUrl + 'Buggy/validationerror', {}).subscribe({
      next: res=> console.log(res),
      error: err=> this.validationErrors = err
    })
  }
}
