import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[pmHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) { 
    this.el.nativeElement.style.color = 'red';
    this.el.nativeElement.style.fontWeight = 'bold';
  }

}
