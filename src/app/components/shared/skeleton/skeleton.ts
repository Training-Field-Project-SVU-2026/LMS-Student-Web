import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton.html',
})
export class Skeleton {
  @Input() type: 'courses-grid' | 'course-detail' | 'profile' = 'courses-grid';
  @Input() count: number = 8;

  get items() {
    return Array(this.count);
  }
}