import { Component, Input } from '@angular/core';
import { EnrolledCourse } from '../../../models/course.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-user-course-card',
  imports: [CommonModule,RouterLink],
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
}
