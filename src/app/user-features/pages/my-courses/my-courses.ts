import { Component, OnInit } from '@angular/core';
import { User } from '../../services/user';
import { EnrolledCourse } from '../../models/course.model';
import { CourseCard } from '../../shared/components/course-card/course-card';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-my-courses',
  imports: [CourseCard, CommonModule],
  templateUrl: './my-courses.html',
  styleUrl: './my-courses.css',
})
export class MyCourses implements OnInit {
  courses: EnrolledCourse[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private userServices: User) { }

  ngOnInit(): void {
    this.userServices.getMyEnrollments();
    this.userServices.courses$.subscribe({
    next: (courses) => {
      this.courses = courses;
      this.isLoading = false;
    },
    error: () => {
      this.error = 'Failed to load courses';
      this.isLoading = false;
    }
  });
  }

}
