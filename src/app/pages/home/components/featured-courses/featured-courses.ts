import { Component, inject, OnInit } from '@angular/core';
import { AlertService } from '../../../../shared/services/alert';
import { Card } from "../../../../components/shared/card/card";
import { Router } from '@angular/router';
import { CourseService } from '../../../../shared/services/course';
import { ICourseCardData } from '../../../../components/shared/interfaces/course.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-featured-courses',
  standalone: true,
  imports: [Card,CommonModule],
  templateUrl: './featured-courses.html',
  styleUrl: './featured-courses.css',
})
export class FeaturedCourses implements OnInit {
  private courseService = inject(CourseService);
  private alertService=inject(AlertService)
  private router = inject(Router);

  courses:ICourseCardData[]=[]

ngOnInit() {
  this.courseService.getTopRatedCourses().subscribe({
    next: (data) => this.courses = data.slice(0, 4),
    error: () => {
      console.error('topRated fail, fallback to all courses');
      this.courseService.getAllCourses().subscribe({
        next: (all) => this.courses = all.slice(0, 4),
        error: (e) => (this.courses = [])
      });
    }
  });
}
onCourseClick(slug:string){
const token=localStorage.getItem('access_token');
if(!token){
  this.alertService.requireLogin('You need to login first to view this course');
  return;
}
this.router.navigate(['/course',slug])
}

onViewAllCourses() {
  this.router.navigate(['/courses']);
}
trackBySlug(index: number, course: ICourseCardData) {
  return course.slug;
}
}

export type { ICourseCardData };

