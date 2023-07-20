
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @ViewChildren("sliderImg") elements: QueryList<ElementRef>;
  element: any;
  length: number;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.length = this.elements.length;
    this.changePicture();
  }

  changePicture(): void {
    setTimeout(() => {
      for (let i = 0; i < this.length; i++) {
        this.element = this.elements.toArray()[i].nativeElement;
        if (this.element.classList.contains("ik-slider-active")) {
          this.element.classList.remove("ik-slider-active");
          if (i == this.length - 1) {
            this.elements.toArray()[0].nativeElement.classList.add("ik-slider-active");
            break;
          } else {
            this.elements.toArray()[i + 1].nativeElement.classList.add("ik-slider-active");
            break;
          }
        }
      }
      this.changePicture();
    }, 3000);
  }

  movePictureLeft(): void {
    for (let i = 0; i < this.length; i++) {
      if (this.elements.toArray()[i].nativeElement.classList.contains("ik-slider-active")) {
        this.elements.toArray()[i].nativeElement.classList.remove("ik-slider-active");
        if (i == 0) {
          this.elements.toArray()[this.length - 1].nativeElement.classList.add("ik-slider-active");
          break;
        } else {
          this.elements.toArray()[i - 1].nativeElement.classList.add("ik-slider-active");
          break;
        }
      }
    }
  }

  movePictureRight(): void {
    for (let i = 0; i < this.length; i++) {
      if (this.elements.toArray()[i].nativeElement.classList.contains("ik-slider-active")) {
        this.elements.toArray()[i].nativeElement.classList.remove("ik-slider-active");
        if (i == this.length - 1) {
          this.elements.toArray()[0].nativeElement.classList.add("ik-slider-active");
          break;
        } else {
          this.elements.toArray()[i + 1].nativeElement.classList.add("ik-slider-active");
          break;
        }
      }
    }
  }

}
