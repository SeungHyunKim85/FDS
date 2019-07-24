import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[Moveupdown]',
})
export class MoveupdownDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') move() {
    // console.log(this.el.nativeElement.closest('.slider'));
    const slider = this.el.nativeElement.closest('.slider');
    const sliderTop = slider.getBoundingClientRect().top;
    const mainView = this.el.nativeElement.closest('.mainView');
    const thanos = this.el.nativeElement.closest('.thanos');
    const header = document.querySelector('.header-container');

    console.log('position', sliderTop);
    console.log('header', header);
    console.log('thanos');

    // this.renderer.setStyle(mainView);
    // transform: translate3d(0px, {}px, 0px); transition-duration: 540ms; transition-delay: 50ms;
    this.renderer.setStyle(
      mainView,
      'transform',
      `translate3d(0px, -${sliderTop - 70}px, 0px)`
    );
    this.renderer.setStyle(mainView, 'transition-duration', '540ms');
    this.renderer.setStyle(mainView, 'transition-delay', '50ms');

    // top: 1160.8px; position: absolute; background: rgb(20, 20, 20);
    this.renderer.setStyle(header, 'top', `${sliderTop - 70}px`);
    this.renderer.setStyle(header, 'position', 'absolute');
    this.renderer.setStyle(header, 'background', 'rgb(20, 20, 20)');

    if (thanos.classList.contains('has-open-jaw')) {
      thanos.classList.remove('has-open-jaw');
    } else {
      thanos.classList.add('has-open-jaw');
    }

    setTimeout(() => {
      this.renderer.removeStyle(mainView, 'transform');
      this.renderer.removeStyle(mainView, 'transition-duration');
      this.renderer.removeStyle(mainView, 'transition-delay');
    }, 540);
  }

  @HostListener('window:scroll', ['$event']) scroll() {
    const slider = this.el.nativeElement.closest('.slider');
    const mainView = this.el.nativeElement.closest('.mainView');
    const thanos = this.el.nativeElement.closest('.thanos');
  }
}
