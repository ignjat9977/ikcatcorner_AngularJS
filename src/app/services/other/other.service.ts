import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategories } from 'src/app/interfaces/i-categories';
import { IMenu } from 'src/app/interfaces/i-menu';
import { IUnBS } from 'src/app/interfaces/i-un-b-s';
import { pathLinks } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class OtherService {

  constructor( private http: HttpClient) { }

  urlBrands: string = pathLinks.globalUrl + "brands" + pathLinks.jsonString;
  urlSort: string = pathLinks.globalUrl + "sort" + pathLinks.jsonString;
  urlMenu: string = pathLinks.globalUrl + "menu" + pathLinks.jsonString;
  urlCategories: string = pathLinks.globalUrl + "categories" + pathLinks.jsonString;
  urlCity: string = pathLinks.globalUrl + "city" + pathLinks.jsonString;

  getBrands(): Observable<IUnBS[]> {
    return this.http.get<IUnBS[]>(this.urlBrands);
  }
  getSort(): Observable<IUnBS[]> {
    return this.http.get<IUnBS[]>(this.urlSort);
  }
  getMenu(): Observable<IMenu[]> {
    return this.http.get<IMenu[]>(this.urlMenu);
  }
  getCategories(): Observable<ICategories[]> {
    return this.http.get<ICategories[]>(this.urlCategories);
  }
  getCities(): Observable<IUnBS[]> {
    return this.http.get<IUnBS[]>(this.urlCity);
  }
}
