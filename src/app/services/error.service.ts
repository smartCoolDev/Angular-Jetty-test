import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class ErrorService {
  isError = new BehaviorSubject<boolean>(false);
  constructor() {}
}
