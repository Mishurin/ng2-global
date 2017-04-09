import { Component, OnInit, ChangeDetectionStrategy, NgZone, ChangeDetectorRef } from '@angular/core'

@Component({
    selector: 'app-profiler',
    templateUrl: './profiler.component.html',
    styleUrls: ['./profiler.component.css'],
})
export class ProfilerComponent implements OnInit {

    stable: Date = null
    unstable: Date = null
    mutable: Object = null;

    constructor(private zone: NgZone, private cd: ChangeDetectorRef) {

    }

    ngOnInit() {
        this.zone.onUnstable.subscribe(() => {
            this.unstable = new Date()
            console.log('Unstable:', this.unstable)
        })
        this.zone.onStable.subscribe(() => {
            this.stable = new Date()
            console.log('Stable:', this.stable)
        })
    }

    makeChanges() { }

    getTimeSpan(): number {
        return this.stable && this.unstable ? (this.stable.getMilliseconds() - this.unstable.getMilliseconds()) : null;
    }

}
