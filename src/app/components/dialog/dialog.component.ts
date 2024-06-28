import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    RatingModule,
    ButtonModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  @Input() display: boolean = false;
  @Input() header!: string;
  @Input() product: Product = {
    price: '',
    name: '',
    image: '',
    rating: 0,
  };
  @Output() confirm = new EventEmitter<Product>();
  @Output() displayChange = new EventEmitter<boolean>();
  onConfirm() {
    this.confirm.emit(this.product);
  }
  onCancel() {
    this.confirm.emit(this.product);
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
