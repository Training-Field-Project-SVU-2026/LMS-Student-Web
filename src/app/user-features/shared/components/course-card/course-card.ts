import { Component, Input } from '@angular/core';
import { EnrolledCourse } from '../../../models/course.model';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImgFallback } from '../../../../shared/directives/img-fallback';

@Component({
  selector: 'app-user-course-card',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, ImgFallback],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard {
  @Input() course!: EnrolledCourse;

  readonly statusLabels: Record<EnrolledCourse['status'], string> = {
    not_started: 'Not Started',
    in_progress: 'In Progress',
    completed: 'Completed'
  };

  // Directive handles fallback logic automatically
}
