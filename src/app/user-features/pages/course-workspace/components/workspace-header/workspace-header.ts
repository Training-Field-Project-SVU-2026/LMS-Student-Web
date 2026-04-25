import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { ICourseWorkspaceHeader } from '../../../../models/courseWorkspace.model';
import { User } from '../../../../services/user';
import { ImgFallback } from '../../../../../shared/directives/img-fallback';

@Component({
  selector: 'app-workspace-header',
  imports: [CommonModule, ImgFallback],
  templateUrl: './workspace-header.html',
  styleUrl: './workspace-header.css',
})
export class WorkspaceHeader {
  private userService = inject(User);
  @Input({ required: true }) course!: ICourseWorkspaceHeader;
  selectedCourse = this.userService.selectedCourse;

  exportCourseImage() {
    const courseData = this.selectedCourse() || this.course;
    if (courseData?.image) {
      const filename = `${courseData.title.replace(/\s+/g, '-').toLowerCase()}-thumbnail.jpg`;
      this.userService.downloadImage(courseData.image, filename);
    }
  }
}
