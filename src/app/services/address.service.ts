import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from 'src/consts/consts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class AddressService {
  constructor(private http: HttpClient) {}

  public getAddressByID(employeeID: number): Observable<any> {
    let addressEndPoint: string =
      API_ENDPOINT + `list/employee/address/${employeeID}`;
    return this.http.get(addressEndPoint);
  }
}
