import { Component, inject, OnInit } from '@angular/core';
import { Card } from "../../../../components/shared/card/card";
import { CourseService } from '../../../../shared/services/course';
import { ICourseCardData } from '../../../home/components/featured-courses/featured-courses';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-section',
  standalone: true,
  imports: [Card,RouterLink],
  templateUrl: './course-section.html',
  styleUrl: './course-section.css',
})
export class CourseSection implements OnInit {
  private courseService = inject(CourseService);

learningTracks:ICourseCardData[] = []
manyCourses:ICourseCardData[] = []

ngOnInit() {
 this.courseService.getPackages().subscribe({
  next:(data)=>this.learningTracks=data,
  error:(err)=>console.error('Tracks Error:', err)

 })
 this.courseService.getAllCourses().subscribe({
  next:(data)=>this.manyCourses=data,
  error:(err)=>console.error('Courses Error:', err)
 })
}
}
