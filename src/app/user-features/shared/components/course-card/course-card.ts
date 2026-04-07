import { Component, Input } from '@angular/core';
import { EnrolledCourse } from '../../../models/course.model';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-user-course-card',
  imports: [CommonModule, RouterLink, DatePipe],
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

  updateToDefault(event: Event) {
    (event.target as HTMLImageElement).src = 'images/default_image.jpeg';
  }
}
