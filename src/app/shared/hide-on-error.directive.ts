import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: 'img[appHideOnError]',
  host: {
    '(error)': 'hide()',
  },
})
export class HideOnErrorDirective {
  private readonly host = inject(ElementRef<HTMLImageElement>);

  hide(): void {
    this.host.nativeElement.style.display = 'none';
  }
}
