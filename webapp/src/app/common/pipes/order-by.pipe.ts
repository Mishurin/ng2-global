import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

    transform(collection: any[], prop: string): any[] {
        return collection.sort((a, b) => {
            var x = a[prop]
            var y = b[prop]
            return x < y ? -1 : x > y ? 1 : 0;
        })
    }

}
