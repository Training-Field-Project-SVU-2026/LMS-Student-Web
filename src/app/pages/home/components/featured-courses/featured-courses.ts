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


ngOnInit(){
  this.courseService.getTopRatedCourses().subscribe({
    next:(data)=>{
      console.log('Data received:', data)
      this.courses=data
    },
    error: (err) => {
       console.error('Error fetching courses', err);
    this.courses = [];
      console.error('Error fetching courses', err);
      // this.alertService.error('Failed to load courses. Please try again.');
    },
  })
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

