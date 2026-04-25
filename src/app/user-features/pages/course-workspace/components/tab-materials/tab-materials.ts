import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CourseWorkspaceService } from '../../../../services/course-workspace';

@Component({
  selector: 'app-tab-materials',
  standalone: true,
  imports: [CommonModule],   
  templateUrl: './tab-materials.html',
  styleUrl: './tab-materials.css',
})
export class TabMaterials implements OnInit {
  private courseWorkspaceService = inject(CourseWorkspaceService);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);

  materials: any[] = [];
  isLoading = true;
  baseUrl = environment.baseUrl;

  ngOnInit() {
    const slug = this.route.parent?.snapshot.paramMap.get('slug') ?? '';

    this.courseWorkspaceService.materials(slug)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.materials = res.data.materials ?? [];
          this.isLoading = false;
        },
        error: () => this.isLoading = false,
      });
  }
}