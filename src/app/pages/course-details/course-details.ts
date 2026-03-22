import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../shared/services/course';
import { ICourseDetail } from '../../components/shared/interfaces/course.model';

@Component({
  selector: 'app-course-details',
  imports: [CommonModule],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetails implements OnInit{

private route=inject(ActivatedRoute);
private courseService=inject(CourseService);
courseDetail: ICourseDetail | null = null;
isLoading = true;

  ngOnInit(): void {

    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug) {
      this.loadCourseData(slug);
    }
  }

  loadCourseData(slug: string) {
    this.isLoading = true;
    this.courseService.getCourseDetails(slug).subscribe({
      next: (data) => {
        this.courseDetail = data;
        this.isLoading = false;
        console.log('Course Data Loaded:', data);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching course details:', err);

      }
    });
  }
}
