import { Directive, Input, ElementRef, OnInit } from '@angular/core'

export const HIGHLIGHTER_STATES = {
    RECENT: "recent",
    UPCOMPINT: "upcoming"
}

@Directive({
    selector: '[highlightByCreateDate]',
})
export class CreateDateHighlighterDirective {

    @Input('highlightByCreateDate') createDate: Date;
    constructor(private el: ElementRef) {
        //el.nativeElement.style
    }

    ngOnInit() {
    }

    private getClassName() {
    }

    private getTimeSpanInDays(date1: Date, date2: Date): number {
        let diff: number = date1.getDate() - date2.getDate();
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }

}
