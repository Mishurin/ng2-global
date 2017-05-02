import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Rx'

@Injectable()
export class BreadcrumbsService {

    breadCbumbStream: Subject<string> = new Subject<string>()

    constructor() { }

    getBreadCrumbStream() {
        return this.breadCbumbStream
    }

    setBreadCrumb(breadcrumb: string) {
        this.breadCbumbStream.next(breadcrumb)
    }

}
