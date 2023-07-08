import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import ErrorService from '../services/error.service';
@Injectable()
export class ErrorHttpInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle and process the HTTP error here
        console.error('HTTP Error:', error);
        this.errorService.isError.next(true);
        // You can also perform additional actions like showing an error message or redirecting
        // Throw the error to propagate it to the subscriber
        return throwError(error);
      })
    );
  }
}
