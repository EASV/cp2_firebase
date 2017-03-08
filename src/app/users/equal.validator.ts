import {Directive, forwardRef} from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { Input } from "@angular/core";

@Directive({
  selector: '[validateEqualTo][ngModel],[validateEqualTo][formControlName]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualTextValidator), multi: true}
  ]
})
export default class EqualTextValidator implements Validator {
  @Input() validateEqualTo : string;

  validate( c : AbstractControl ) {
    let inputValue = c.value;
    let otherValue = c.root.get(this.validateEqualTo);
    return this.checkEquality(inputValue, otherValue);
  }

  checkEquality( inputValue: string, otherValue: any ) {
    if( otherValue && inputValue !== otherValue.value ) return {
      validateEqual: true
    }
    return null;
  }
}
