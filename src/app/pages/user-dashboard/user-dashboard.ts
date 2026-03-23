import { OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { CourseService } from "../../shared/services/course";
import { ICourseCardData } from "../home/components/featured-courses/featured-courses";
import { Card } from "../../components/shared/card/card";
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [Card],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})

export class UserDashboard implements OnInit {
  private courseService = inject(CourseService);
  private router = inject(Router);


  myCourses: ICourseCardData[] = [];
  topRatedCourses: ICourseCardData[] = [];

  ngOnInit() {
    this.loadMyCourses();
    this.loadTopRated();
  }


  loadMyCourses() {
    this.courseService.getMyCourses().subscribe({
      next: (data) => {
        this.myCourses = data.slice(0, 4);
      },
      error: (err) => {
        console.error('Error fetching my courses', err);
        this.myCourses = [];
      }
    });
  }


  loadTopRated() {
    this.courseService.getTopRatedCourses().subscribe({
      next: (data) => {
        this.topRatedCourses = data.slice(0, 4);
      },
      error: (err) => {
        console.error('Error fetching top rated', err);
        this.topRatedCourses = [];
      }
    });
  }

  onCourseClick(slug: string) {
    this.router.navigate(['/course', slug]);
  }
}
