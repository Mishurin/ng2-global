import { FormControl } from '@angular/forms'

export function authorsRequiredValidator(control: FormControl) {
    return control.value.filter((item: any) => {
        return item.selected
    }).length == 0 ? { required: 'No items selected' } : null
}