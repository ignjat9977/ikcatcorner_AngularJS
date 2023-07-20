import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISection } from 'src/app/interfaces/i-section';
import { ISectionSer } from 'src/app/interfaces/i-section-ser';
import { pathLinks } from 'src/app/config/config';
@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor( private http: HttpClient) { }

  urlBrands: string = pathLinks.globalUrl + "aboutSection" + pathLinks.jsonString
  urlAbout: string = pathLinks.globalUrl + "brandsSection" + pathLinks.jsonString
  urlService: string = pathLinks.globalUrl + "service" + pathLinks.jsonString

  getAboutSection(): Observable<ISection[]> {
    return this.http.get<ISection[]>(this.urlAbout)
  }
  getBrandSection(): Observable<ISection[]> {
    return this.http.get<ISection[]>(this.urlBrands)
  }
  getServiceSection(): Observable<ISectionSer[]>{
    return this.http.get<ISectionSer[]>(this.urlService)
  }
}
