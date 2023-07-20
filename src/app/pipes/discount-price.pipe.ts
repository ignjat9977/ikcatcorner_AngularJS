import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountPrice'
})
export class DiscountPricePipe implements PipeTransform {
  price: number
  transform(discount: number| null, priceWithoutDiscount:number): number {
      if(discount!=null){
        
      this.price = discount * (100 - priceWithoutDiscount) / 100
      this.price = Math.round(this.price * 100) / 100
      
      return this.price
      }
      return priceWithoutDiscount
  }

}
