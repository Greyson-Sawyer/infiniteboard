import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[richText]'
})
export class RichTextDirective {
@Input('text') text: string = ""
  constructor() { }

}