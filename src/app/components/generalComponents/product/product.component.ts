import { Component, Input } from '@angular/core';
import { getLocalStorage, setLocalStorage } from 'src/app/config/config';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() p: any
  @Input() allProducts:any
  cartItems: any = []
  id:number
  isDisplayed:string

  constructor(private eventService: EventService){}
  addToCart(id: number): void{



    if(getLocalStorage("cart") == null){
      this.allProducts.forEach((element: any)=>{
        if(element.id == id){
          element.quantity = 1
          this.cartItems.push(element)
        }
      })

    }else{
      this.cartItems = getLocalStorage("cart")
      var counter = 0
      this.cartItems.forEach((element:any)=>{

        if(element.id == id){
          element.quantity++
          counter++
        }
      })
      if(counter==0){
        this.allProducts.forEach((element:any)=>{
          if(element.id == id){
            element.quantity = 1
                
            this.cartItems.push(element)
          }
        })
        
      }
      
    }
    setLocalStorage("cart", this.cartItems)
    this.eventService.buttonClickedCounter.emit(true)
  }
  seeMoreAboutProduct(id : number) : void{
    this.isDisplayed = "ik-show"
    this.id = id
    var data = {
      "isDisplayed":this.isDisplayed,
      "id":this.id
    }
    this.eventService.sendData(data);
  }
}
