import { Component, OnInit, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms'

export const AUTHORS_COMPONENT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AuthorsComponent),
    multi: true
}

@Component({
    selector: 'course-authors',
    templateUrl: './authors.component.html',
    styleUrls: ['./authors.component.css'],
    providers: [
        AUTHORS_COMPONENT_VALUE_ACCESSOR
    ]
})
export class AuthorsComponent implements OnInit, ControlValueAccessor {

    innerValue: any[]

    constructor() { }

    writeValue(value: any[]) {
        this.innerValue = value
    }

    get value(): any[] {
        return this.innerValue
    }

    set value(value: any[]) {
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

    onChange(value: any[]) {

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
