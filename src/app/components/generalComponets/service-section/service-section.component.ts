import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SectionService } from 'src/app/services/sections/section.service';

@Component({
  selector: 'app-service-section',
  templateUrl: './service-section.component.html',
  styleUrls: ['./service-section.component.scss']
})
export class ServiceSectionComponent implements OnInit{
  serviceItems: any
  constructor(private sectionService: SectionService) {
 
  }
 
  ngOnInit(): void {
    this.sectionService.getServiceSection().subscribe({
      next: data => {
        this.serviceItems = data;
      },
      error: err =>{
        console.log(err)
      }
    })
  }
}
