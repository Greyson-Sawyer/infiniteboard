import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[RichText]'
})
export class RichTextDirective {
@Input('text') text: string = ""
  constructor() { }

}