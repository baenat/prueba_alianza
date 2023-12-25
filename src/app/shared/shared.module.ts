import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgBrokenDirective } from './directives/img-broken.directive';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ImgBrokenDirective,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    ImgBrokenDirective,
    HeaderComponent
  ]
})
export class SharedModule { }
