import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/interfaces/i-product';
import { pathLinks } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor( private http: HttpClient) { }

  url: string = pathLinks.globalUrl + "products" + pathLinks.jsonString;

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url);
  }
  // getOneProduct(): Observable<IProduct>{
  
  // }
}
