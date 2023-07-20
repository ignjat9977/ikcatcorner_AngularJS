import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { OtherService } from 'src/app/services/other/other.service';
import { ProductService } from 'src/app/services/products/product.service';
import { setLocalStorage } from 'src/app/config/config';
import { getLocalStorage } from 'src/app/config/config';
import { EventService } from 'src/app/services/event/event.service';
import { IProduct } from 'src/app/interfaces/i-product';
import { CategoiesComponentComponent } from '../../generalComponets/categoies-component/categoies-component.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  numOfProdByPage: number = 6;

  @Input() categories: any = []
  brandsDropDownList : any = []
  sortDropDownList: any = []
  allProducts: any = []
  products : any = []
  price: number = 0
  isDisplayed: string = "ik-hide"
  id: number = 1
  howFar: number = 0
  fromBegining: number = 0
  paginationNumOfLinks: number = 0
  paginationObject: any = []
  
  all: any = []
  @ViewChildren("check") checks: QueryList<ElementRef>
  constructor(private productsService: ProductService,
     private otherService: OtherService,
     private eventService: EventService) {
    
  }
  ngOnInit(): void {
    this.getPosts(null)
    this.otherService.getBrands().subscribe({
      next: data=>{
        this.brandsDropDownList = data
      },
      error: err=>{
        console.log(err)
      }
    })
    this.otherService.getCategories().subscribe({
      next: data=>{
        this.categories = data
      },
      error: err=>{
        console.log(err)
      }
    })
    this.otherService.getSort().subscribe({
      next:data=>{
        this.sortDropDownList = data
      },
      error: err=>{
        console.log(err)
      }
    })

    this.eventService.data$.subscribe((data:any)=>{
      this.isDisplayed = data.isDisplayed
      this.id = data.id
    })    
  }
  filterByCheckBox(id:number):void{
    var ids: number[] = []; 
    this.checks.forEach((check: ElementRef) => {
      if (check.nativeElement.checked) {
        ids.push(Number(check.nativeElement.value));
      }
    })
    this.products = this.all.filter((el: any) => {
      return el.subCategories.some((subCategory: any) => ids.includes(subCategory));
    });
    
    this.getPosts(this.products)
    
  }

 
  changePage(page :number){
    this.fromBegining = page * (this.numOfProdByPage)
    this.howFar = (page + 1) * this.numOfProdByPage
    this.products = this.allProducts.slice(this.fromBegining, this.howFar)
  }
  filterByPrice(priceOutput:HTMLOutputElement, priceRange:HTMLInputElement):void{
    var value = Number(priceRange.value)
    
    priceOutput.innerHTML = "" + value
    this.products = this.all.filter((el:any)=>{
      if(el.price.noDis<value){
        return el;
      }
    })

    this.getPosts(this.products)
  }
  sortByPrice(sortDD:HTMLSelectElement):void{
    var value = sortDD.value
    if(value == "ascPrice"){
        this.products = this.products.sort((a:any,b:any)=> a.price.noDis > b.price.noDis ? 1 : -1)
    }
    if(value == "descPrice"){
      this.products = this.products.sort((a:any,b:any)=> a.price.noDis < b.price.noDis ? 1 : -1)
    }
    if(value == "ascLetter"){
        this.products = this.products.sort((a:any,b:any)=> a.name > b.name ? 1 : -1)
    }
    if(value == "descLetter"){
      this.products = this.products.sort((a:any,b:any)=> a.name < b.name ? 1 : -1)
    }
  }
  getPosts(pr:any|null):void{
    this.productsService.getProducts().subscribe({
      next: data => {
        this.paginationObject = []
        this.products = data
        this.allProducts = data
        this.all = data
        if(pr!=null){
          this.allProducts = pr
        }
        this.allProducts = this.all
        this.products = this.allProducts.slice(0,this.numOfProdByPage)
        this.paginationNumOfLinks = Math.ceil(this.allProducts.length / this.numOfProdByPage)
        this.paginationNumOfLinks = Math.ceil(this.allProducts.length / this.numOfProdByPage)

       
        for(let i =0 ; i < this.paginationNumOfLinks; i++){
          this.paginationObject.push({
            "value": i,
            "number": i+1
          })
        }
      },
      error: err =>{
        console.log(err)
      }
    })
  }
  
  
}
