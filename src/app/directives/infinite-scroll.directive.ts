import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Directive({
  selector: '[appInfiniteScroll]',
  standalone: true,
})
export class InfiniteScrollDirective {
  @Output() scrolled = new EventEmitter();

  private debouncer: Subject<void> = new Subject();

  constructor() {
    console.log('infinite scroll directive');
    // todo: add take until
    this.debouncer
      .pipe(debounceTime(500))
      .subscribe(() => this.scrolled.emit());
  }

  @HostListener('window:scroll', ['$event'])
  scrolling() {
    const limit = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );

    const endReached = limit === window.innerHeight + window.scrollY;

    if (endReached) {
      this.debouncer.next();
    }
  }
}
