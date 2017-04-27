import { Component, OnInit, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms'

export const DATE_COMPONENT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateComponent),
    multi: true
}

@Component({
    selector: 'course-date',
    templateUrl: './date.component.html',
    styleUrls: ['./date.component.css'],
    providers: [
        DATE_COMPONENT_VALUE_ACCESSOR
    ]
})
export class DateComponent implements OnInit, ControlValueAccessor {

    innerValue: string

    constructor() { }

    writeValue(value: string) {
        this.innerValue = value
    }

    get value(): string {
        return this.innerValue
    }

    set value(value: string) {
        if (value !== this.innerValue) {
            this.innerValue = value
            this.onChange(value)
        }
    }

    registerOnChange(fn: any) {
        this.onChange = fn
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn
    }

    setDisabledState(isDisabled: boolean) {

    }

    onChange(value: string) {

    }

    onTouched() {

    }

    onInputValueChange(event) {
        this.value = event.target.value
    }

    onBlur() {
        this.onTouched()
    }

    ngOnInit() {
    }

}
