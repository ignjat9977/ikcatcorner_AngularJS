import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  buttonClickedCounter = new EventEmitter<boolean>();
  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  data$: Observable<any> = this.dataSubject.asObservable();
  constructor() { }

  emitButtonClickedCounter(value: boolean) {
    this.buttonClickedCounter.emit(value);
  }
  sendData(data: any) {
    this.dataSubject.next(data);
  }
}

