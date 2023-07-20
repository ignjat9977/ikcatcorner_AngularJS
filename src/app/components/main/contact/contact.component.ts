import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUnBS } from 'src/app/interfaces/i-un-b-s';
import { OtherService } from 'src/app/services/other/other.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm:FormGroup
  cities: Array<IUnBS>

  constructor(private otherServices: OtherService){


    
  }


  ngOnInit(): void {
    this.otherServices.getCities().subscribe({
      next:(data:IUnBS[])=>{
        this.cities = data
      },
      error: error=>{

      }
    })


    this.contactForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      city: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]),
      gender: new FormControl('', [Validators.required])

      
    });
  }

  contactMe():void{
    if (this.contactForm.valid) {
     

    } else {
      this.contactForm.markAllAsTouched()
    }
  }
  
}
