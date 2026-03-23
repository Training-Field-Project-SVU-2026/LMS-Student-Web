import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../shared/services/course';
import { Card } from "../../components/shared/card/card";
import { CommonModule } from '@angular/common';
import type { ICourseCardData } from "../home/components/featured-courses/featured-courses";
import { AlertService } from '../../shared/services/alert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  imports: [Card,CommonModule],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard implements OnInit {
  private courseService = inject(CourseService);
  private alertService = inject(AlertService);
  private router = inject(Router);

  featuredCourses: ICourseCardData[] = [];

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        console.log(data); 
        //first 4 courses
        this.featuredCourses = data.slice(0, 4);
      },
      error: (err) => {
        console.error('Error fetching courses', err);
        this.featuredCourses = [];
      }
    });
  }


  onCourseClick(slug: string) {
    this.router.navigate(['/course', slug]);
  }


  onViewAllCourses() {
    this.router.navigate(['/courses']);
  }
}
