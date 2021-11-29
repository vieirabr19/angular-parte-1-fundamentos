import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  debounce: Subject<string> = new Subject<string>();
  @Output() onTyping = new EventEmitter<string>();
  @Input() value: string = '';

  constructor() { }

  ngOnInit(): void {
    this.debounce
    .pipe(debounceTime(400))
    .subscribe(filter => this.onTyping.emit(filter));
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

  filterFn(target : any) {
    if(target instanceof EventTarget) {
      let element = target as HTMLInputElement;
      this.debounce.next(element.value);
    }
  }

}
