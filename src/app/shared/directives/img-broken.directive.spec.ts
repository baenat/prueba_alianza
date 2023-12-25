import { ElementRef } from '@angular/core';
import { ImgBrokenDirective } from './img-broken.directive';

class MockElementRed extends ElementRef {
  constructor(value: string) {
    super(null);
    this.nativeElement = { value }
  }
}

const MockElementImageUrl = new MockElementRed('http://localhost/imgBroken.png');

describe('ImgBrokenDirective', () => {
  it('should create an instance', () => {
    const directive = new ImgBrokenDirective(MockElementImageUrl);
    expect(directive).toBeTruthy();
  });
});
