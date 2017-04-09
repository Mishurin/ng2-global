import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'

import { Subscription } from 'rxjs/Rx'

import { LoaderService } from './loader.service'

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit, OnDestroy {

    isLoaderHidden: boolean = true
    hideLoaderSubscription: Subscription

    constructor(private loader: LoaderService, private cd: ChangeDetectorRef) { }

    ngOnInit() {
        this.hideLoaderSubscription = this.loader.getHideLoaderStream().subscribe((isHidden) => {
            this.isLoaderHidden = isHidden
            this.cd.markForCheck()
        })
    }

    ngOnDestroy() {
        this.hideLoaderSubscription.unsubscribe()
    }

}
