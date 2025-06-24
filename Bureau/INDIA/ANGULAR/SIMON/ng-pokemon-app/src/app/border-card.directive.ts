import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBorderCard]',
  standalone: false
})
export class BorderCardDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.setHeight(190);
    // this.setBorder('#f5f5f5');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setBackground('white');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBackground('linear-gradient(45deg, rgb(4, 159, 187) 0%, rgb(80, 246, 255) 100%)');
  }

  private setBackground(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background', color);
  }
  setHeight(height: number) {
    const element = this.el.nativeElement.style.height = `${height}px`;
  }
}
