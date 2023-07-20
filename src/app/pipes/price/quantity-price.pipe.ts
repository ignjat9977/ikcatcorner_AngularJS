import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quantityPrice'
})
export class QuantityPricePipe implements PipeTransform {
  price: number
  transform(discount: number| null, priceWithoutDiscount:number, quantity:number): number {
    if(discount!=null){
      
    this.price = discount * (100 - priceWithoutDiscount) / 100 * quantity
    this.price = Math.round(this.price * 100) / 100
    
    return this.price
    }
    return priceWithoutDiscount
}

}
