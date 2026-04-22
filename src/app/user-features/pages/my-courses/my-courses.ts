import { Component, OnInit } from '@angular/core';
import { User } from '../../services/user';
import { EnrolledCourse } from '../../models/course.model';
import { CourseCard } from '../../shared/components/course-card/course-card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
  inProgressCount: number = 0;
  completedCount: number = 0;

  constructor(private userServices: User, public router: Router) { }

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
