import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'

@Component({
    selector: 'app-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
