import { InfiniteScrollDirective } from './infinite-scroll.directive';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div
    style="height: 200px; overflow-y: scroll;"
    appInfiniteScroll></div>`,
})
class TestInfiniteScrollComponent {
  @Output() scrolled = new EventEmitter<void>();
}

describe('InfiniteScrollDirective', () => {
  let component: TestInfiniteScrollComponent;
  let fixture: ComponentFixture<TestInfiniteScrollComponent>;
  let directive: InfiniteScrollDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InfiniteScrollDirective],
      declarations: [TestInfiniteScrollComponent],
    });

    fixture = TestBed.createComponent(TestInfiniteScrollComponent);
    component = fixture.componentInstance;

    const debugElement = fixture.debugElement.query(
      By.directive(InfiniteScrollDirective)
    );
    directive = debugElement.injector.get<InfiniteScrollDirective>(
      InfiniteScrollDirective
    );
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should emit scrolled event when scrolling near bottom', fakeAsync(() => {
    jest.spyOn(directive.scrolled, 'emit');
    window.scrollTo(0, document.body.scrollHeight - window.innerHeight - 45); // Scroll near bottom
    window.dispatchEvent(new Event('scroll')); // Dispatch scroll event
    tick(500); // wait for debounceTime

    expect(directive.scrolled.emit).toHaveBeenCalled();
  }));
});
