import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appImgBroken]'
})
export class ImgBrokenDirective {

  @Input() customImg = '';

  @HostListener('error') handleError() {
    console.log('directiva', this.host)
    const native = this.host.nativeElement;
    native.src = '../../../assets/images/finanzas.png';
    // native.src = this.customImg;

  }

  constructor(
    private host: ElementRef
  ) { }

}
