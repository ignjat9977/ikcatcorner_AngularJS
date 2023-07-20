import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { getLocalStorage } from 'src/app/config/config';
import { EventService } from 'src/app/services/event/event.service';
import { OtherService } from 'src/app/services/other/other.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navigations: any = []
  @ViewChild("counterCart") counter: ElementRef;
  constructor(private eventService: EventService, private otherService: OtherService) {}
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    
    this.eventService.buttonClickedCounter.subscribe((value: boolean) => {
      if(value){
        var items = getLocalStorage("cart")
        if(items.length)
          this.counter.nativeElement.innerHTML = items.length 
        else
          this.counter.nativeElement.innerHTML = 0
      }
      
    });
    
    this.otherService.getMenu().subscribe({
      next: data => {
        this.navigations = data
      },
      error: err =>{
        console.log(err)
      }
    })
    
  }
  IncreaseCounter(event:any):void{

  }
}
