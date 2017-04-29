import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {

    transform(minutes: number): string {
        let hours = Math.floor(minutes / 60)
        let rest = minutes - hours * 60
        let hoursString = hours > 0? `${hours} h` : ''
        let minutesString = rest > 0? `${rest} min` : ''
        let hoursSpace = hours > 0 && rest > 0? ' ' : ''
        return `${hoursString}${hoursSpace}${minutesString}`
    }

}
