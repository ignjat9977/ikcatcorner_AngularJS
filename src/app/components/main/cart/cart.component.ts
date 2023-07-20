import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { setLocalStorage } from 'src/app/config/config';
import { getLocalStorage } from 'src/app/config/config';
import { EventService } from 'src/app/services/event/event.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    items: any = null
    tmpItems: any

    constructor(private eventService: EventService){}
    ngOnInit(): void {
      this.items = getLocalStorage("cart")
      console.log(this.items)
      if(!this.items.length)
        this.items = null
      
    }
    removeFromCart(id:number):void{
      this.tmpItems = []
      this.items.forEach((element:any) => {
        if(element.id != id){
          this.tmpItems.push(element)
        }
      })
      setLocalStorage("cart", this.tmpItems)
      this.items = this.tmpItems
      if(!this.items.length)
        this.items = null
      this.eventService.buttonClickedCounter.emit(true)
    }
    removeAllItemsFromCart():void{
      setLocalStorage("cart", []);
      this.items = null
      this.eventService.buttonClickedCounter.emit(true)
    }
}
