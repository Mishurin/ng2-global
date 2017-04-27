import { FormControl } from '@angular/forms'

export function authorsRequiredValidator(control: FormControl) {
    return control.value.length == 0 ? { required: 'No items selected' } : null
}