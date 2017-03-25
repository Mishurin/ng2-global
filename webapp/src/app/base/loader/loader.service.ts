import { Injectable } from '@angular/core'

import { Subject, Observable } from 'rxjs/Rx'

@Injectable()
export class LoaderService {

    private hideLoaderStream: Subject<boolean>  = new Subject<boolean>()
    private _isHidden = true;

    constructor() { }

    getHideLoaderStream(): Observable<boolean> {
        return this.hideLoaderStream.asObservable()
    }

    hide() {
        this.hideLoaderStream.next(true)
        this._isHidden = true;
    }

    isHidden() {
        return this._isHidden;
    }

    show() {
        this.hideLoaderStream.next(false)
        this._isHidden = false;
    }

}
