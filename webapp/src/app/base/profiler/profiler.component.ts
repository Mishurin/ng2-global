import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-profiler',
  templateUrl: './profiler.component.html',
  styleUrls: ['./profiler.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
