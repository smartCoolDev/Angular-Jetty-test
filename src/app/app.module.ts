import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { CoreModule } from './core/core.module';
import { TokenInterceptorService } from './core/token-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { CardListComponent } from './components/card-list/card-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ErrorHttpInterceptor } from './core/error-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    AutocompleteComponent,
    SearchResultComponent,
    CardListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CoreModule,
    HttpClientModule,
    SharedModule,
    MatGridListModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
