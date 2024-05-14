import {
  DestroyRef,
  Directive,
  EventEmitter,
  HostListener,
  inject,
  Output,
} from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appInfiniteScroll]',
  standalone: true,
})
export class InfiniteScrollDirective {
  @Output() scrolled = new EventEmitter();

  #destroy = inject(DestroyRef);

  debouncer$: Subject<void> = new Subject();

  constructor() {
    this.debouncer$
      .pipe(debounceTime(500), takeUntilDestroyed(this.#destroy))
      .subscribe(() => this.scrolled.emit());
  }

  @HostListener('window:scroll', ['$event'])
  scrolling() {
    const scrolledTo = window.scrollY + window.innerHeight;
    const isReachBottom = document.body.scrollHeight - scrolledTo <= 50;

    if (isReachBottom) {
      this.debouncer$.next();
    }
  }
}
