import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_ENDPOINT } from 'src/consts/consts';

@Injectable({
  providedIn: 'root',
})
export default class EmployeeService {
  selectedEmployeeID = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  public getEmployees(): Observable<any> {
    let employeeEndPoint: string = API_ENDPOINT + `list/employee`;
    return this.http.get(employeeEndPoint);
  }

  public getEmployeeByID(employeeID: number): Observable<any> {
    let employeeEndPoint: string = API_ENDPOINT + `list/employee/${employeeID}`;
    return this.http.get(employeeEndPoint);
  }
}
