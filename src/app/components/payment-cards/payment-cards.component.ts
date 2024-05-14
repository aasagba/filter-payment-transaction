import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe, DatePipe, NgForOf } from '@angular/common';
import { InfiniteScrollDirective } from '../../directives/infinite-scroll.directive';
import { PaymentTransactionDto } from '../../models/model';

@Component({
  selector: 'app-payment-cards',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, InfiniteScrollDirective, NgForOf],
  templateUrl: './payment-cards.component.html',
  styleUrl: './payment-cards.component.scss',
})
export class PaymentCardsComponent {
  @Input() infinityItems: PaymentTransactionDto[] = [];

  @Output() infiniteScroll = new EventEmitter();

  onInfinityScrollFired() {
    this.infiniteScroll.emit();
  }
}
