import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationStart, NavigationEnd } from '@angular/router';
import { OtherService } from './services/other/other.service';
import { Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CatShop';

  @Output() navigationLinks: any = []
  constructor() {
  
  }

}
