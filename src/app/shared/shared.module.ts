import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedCardComponent } from './components/card/card.component';
import { SharedErrorComponent } from './components/error/error.component';
@NgModule({
  declarations: [SharedCardComponent, SharedErrorComponent],
  imports: [CommonModule],
  exports: [SharedCardComponent, SharedErrorComponent],
})
export class SharedModule {}
