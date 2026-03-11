import { Component } from '@angular/core';
import { AlertService } from '../../../../shared/services/alert';
import { Card } from "../../../../components/shared/card/card";
import { Router } from '@angular/router';
export interface Course {
  id: number;
  title: string;
  image: string;
  rating: number;
  studentsCount: string;
  badge?: string;
}
@Component({
  selector: 'app-featured-courses',
  standalone: true,
  imports: [Card],
  templateUrl: './featured-courses.html',
  styleUrl: './featured-courses.css',
})
export class FeaturedCourses {
   constructor(private alertService: AlertService, private router: Router) {}
  courses: Course[] = [
  { id: 1, title: 'Modern Fullstack Web Dev', image: 'assets/images/c1.png', rating: 4.9, studentsCount: '12.4K', badge: 'BESTSELLER' },
  { id: 2, title: 'Python for Data Science', image: 'assets/images/c2.png', rating: 4.8, studentsCount: '10K', badge: 'NEW' },
  { id: 3, title: 'Advanced JavaScript Patterns', image: 'assets/images/c3.png', rating: 4.7, studentsCount: '5.2K', badge: 'BESTSELLER' },
  { id: 4, title: 'iOS Development with Swift', image: 'assets/images/c4.png', rating: 4.9, studentsCount: '3.4K', badge: 'POPULAR' }
];

onCourseClick(courseId: number) {

  const token = localStorage.getItem('token');

  if (!token) {
    this.alertService.requireLogin(
      'You need to login first to view this course'
    );
    return;
  }

  this.router.navigate(['/course', courseId]);

}
onViewAllCourses() {

  const token = localStorage.getItem('token');

  if (!token) {
    this.alertService.requireLogin(
      'Please login first to view all courses'
    );
    return;
  }

  this.router.navigate(['/courses']);

}

}

