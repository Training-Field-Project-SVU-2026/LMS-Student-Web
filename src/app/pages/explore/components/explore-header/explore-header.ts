import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // مهم جداً للأحداث والـ التنسيقات
import { CourseService } from '../../../../shared/services/course';

@Component({
  selector: 'app-explore-header',
  templateUrl: './explore-header.html',
  standalone: true,
  imports: [CommonModule]
})
export class ExploreHeader {
  
}

