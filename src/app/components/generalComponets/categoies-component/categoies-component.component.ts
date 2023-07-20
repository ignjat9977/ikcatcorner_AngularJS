import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-categoies-component',
  templateUrl: './categoies-component.component.html',
  styleUrls: ['./categoies-component.component.scss']
})
export class CategoiesComponentComponent {
  @Input() categories : any = []
  @ViewChild('check') checkElement: ElementRef;
  @Output() checkClicked = new EventEmitter()
  sendToShop(chcek:HTMLInputElement,id:number):void{
  this.checkClicked.emit(true)
  }
}
