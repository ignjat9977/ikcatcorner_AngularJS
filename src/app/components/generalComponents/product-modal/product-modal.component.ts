import { Component, Input } from '@angular/core';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent {
  @Input() p: any
  id:number
  isDisplayed:string

  constructor(private eventService: EventService){}

  closeModal() : void{
    this.isDisplayed = "ik-hide"
    this.id = 0
    var data
    this.eventService.sendData(data={
      'isDisplayed':this.isDisplayed,
      "id":this.id
    })
  }
  
}
