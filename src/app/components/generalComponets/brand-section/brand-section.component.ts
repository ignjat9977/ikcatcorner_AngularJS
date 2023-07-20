import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { SectionService } from 'src/app/services/sections/section.service';

@Component({
  selector: 'app-brand-section',
  templateUrl: './brand-section.component.html',
  styleUrls: ['./brand-section.component.scss']
})
export class BrandSectionComponent implements OnInit {
  brandItems: any = []
  queryString: string = "././assets/data/"
  @Input() isBrandOrAbout = false;
  constructor(private sectionService: SectionService) {
    
  }

  ngOnInit(): void {

    if(this.isBrandOrAbout)
    {
      this.sectionService.getAboutSection().subscribe({
        next: data => {
          this.brandItems = data;
        },
        error: err =>{
          console.log(err)
        }
      })
    }  
    else
    {
      this.sectionService.getBrandSection().subscribe({
        next: data => {
          this.brandItems = data;
        },
        error: err =>{
          console.log(err)
        }
      })
    }
  }
}
