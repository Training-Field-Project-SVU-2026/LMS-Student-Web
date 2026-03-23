import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../shared/services/course';
import { ICourseDetailRequest } from '../../components/shared/interfaces/course.model';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private courseService = inject(CourseService);

  courseDetail: ICourseDetailRequest | null = null;
  isLoading = true;
  isEnrolling = false;

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
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching course details:', err);
      }
    });
  }

  onEnroll() {
    if (this.isLoading) {
      alert('Course details still loading. Please wait...');
      return;
    }

    if (!this.courseDetail || !this.courseDetail.slug) {
      alert('Course slug not found. Please refresh the page.');
      console.error('Missing course detail/slug:', this.courseDetail);
      return;
    }

    if (this.isEnrolling) {
      alert('Enrollment in progress...');
      return;
    }

    this.isEnrolling = true;
    console.log('Enrolling in course slug:', this.courseDetail.slug);
    
    this.courseService.enrollInCourse(this.courseDetail.slug, this.courseDetail.id).subscribe({
      next: (res) => {
        this.isEnrolling = false;
        alert('Enrolled successfully!');
        this.router.navigate(['/user-dashboard']);
      },
      error: (err) => {
        this.isEnrolling = false;
        console.error('Enroll error details:', err);
        alert('Failed to enroll. Check Console for details.');
      }
    });
  }
}

