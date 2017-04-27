import { Component, OnInit, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms'

export const DURATION_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DurationComponent),
    multi: true
}

@Component({
    selector: 'course-duration',
    templateUrl: './duration.component.html',
    styleUrls: ['./duration.component.css'],
    providers: [
        DURATION_VALUE_ACCESSOR
    ]
})
export class DurationComponent implements OnInit, ControlValueAccessor {

    innerValue: string

    constructor() { }

    writeValue(value: string) {
        this.innerValue = value
    }

    get value(): string {
        return this.innerValue
    }

    set value(value: string) {
        console.log(value)
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
