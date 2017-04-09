import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-toolbox',
    templateUrl: './toolbox.component.html',
    styleUrls: ['./toolbox.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolboxComponent implements OnInit {
    
    @Output() findCourses = new EventEmitter(true)

    searchValue: string;


    constructor() { }

    ngOnInit() {
    }

    find() {
        this.findCourses.emit(this.searchValue)
    }

}
