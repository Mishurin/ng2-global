import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'

import { LoaderService } from './loader.service'

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit {

    public isLoaderHidden: boolean = true;

    constructor(private loader: LoaderService) { }

    ngOnInit() {
        this.loader.getHideLoaderStream().subscribe((isHidden) => this.isLoaderHidden = isHidden)
    }

}
