import {Directive, forwardRef, OnDestroy} from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { Input } from "@angular/core";
import {Subscription} from "rxjs";

@Directive({
  selector: '[validateEqualTo][ngModel],[validateEqualTo][formControlName]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualTextValidator), multi: true}
  ]
})
export default class EqualTextValidator implements Validator, OnDestroy {
  @Input() validateEqualTo : string;
  private _onChange : () => void;
  oldVal : string;
  sub: Subscription;

  registerOnValidatorChange( fn : () => void ) {
    this._onChange = fn;
  }

  /**
   *
   * @param c
   * @returns {{validateEqual: boolean}|null}
   */
  validate( c : AbstractControl ) {
    let passwordVal = c.value;
    let repeatEle = c.root.get(this.validateEqualTo);
    if( repeatEle ) {
      this.oldVal = repeatEle.value;
    }
    return this.checkEquality(passwordVal, repeatEle);
  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

  /**
   *
   * @param passwordVal
   * @param repeatEle
   * @returns {any}
   */
  checkEquality( passwordVal: string, repeatEle: any ) {
    if( repeatEle && passwordVal !== repeatEle.value ) return {
      validateEqual: true
    }
    return null;
  }
}
