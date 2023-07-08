import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { TokenInterceptorService } from './token-interceptor.service';

@NgModule({
  declarations: [], // Add any components, directives, or pipes specific to the core module
  imports: [CommonModule, HttpClientModule],
  exports: [], // Add any components, directives, or pipes that you want to make available to other modules
  providers: [AuthService, TokenInterceptorService], // Add any services that should be available throughout the app
})
export class CoreModule {}
