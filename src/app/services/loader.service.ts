import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public loadData$= new BehaviorSubject(false);
  constructor() { }

  //Listen Behavaiour Subjct Using Next Method
  load(val: boolean) {
    this.loadData$.next(val)
  }
     
  // Observer in next Method Data
  Onload() {
    return this.loadData$.asObservable()
  }
}
