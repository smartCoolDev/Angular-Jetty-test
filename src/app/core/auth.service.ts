import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from 'src/consts/consts';

export interface tokenType {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public getToken(): void {
    const authEndPoint: string = API_ENDPOINT + 'generate/open/jwt';
    this.http.get(authEndPoint).subscribe((res: any) => {
      localStorage.setItem('jetty_jwt', res.token);
    });
  }
}
