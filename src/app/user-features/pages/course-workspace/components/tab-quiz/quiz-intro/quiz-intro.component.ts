import {
  Component, OnInit, inject, DestroyRef,
  Output, EventEmitter, signal, computed, HostListener
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IQuizCourse } from '../../../../../models/courseWorkspace.model';
import { CourseWorkspaceService } from '../../../../../services/course-workspace';
import { NgClass } from '@angular/common';

type FilterTab = 'all' | 'completed' | 'not_started';

@Component({
  selector: 'app-quiz-intro',
  imports: [NgClass],
  templateUrl: './quiz-intro.component.html',
  styleUrls: ['./quiz-intro.component.css']
})
export class QuizIntro implements OnInit {

  @Output() startQuiz = new EventEmitter<IQuizCourse>();

  private route = inject(ActivatedRoute);
  private courseWorkspaceService = inject(CourseWorkspaceService);
  private destroyRef = inject(DestroyRef);

  quizzes = signal<IQuizCourse[]>([]);
  isLoading = signal(true);
  isLoadingMore = signal(false);

  activeTab = signal<FilterTab>('all');
  courseName = signal('');

  currentPage = signal(1);
  pageSize = 10;
  hasMore = signal(true);


  filteredQuizzes = computed(() => {
    const all = this.quizzes();
    const tab = this.activeTab();

    if (tab === 'completed')
      return all.filter(q => q.quiz_status === 'completed' || q.quiz_status === 'passed');

    if (tab === 'not_started')
      return all.filter(q => q.quiz_status === 'not_started');

    return all;
  });

  avgScore = computed(() => {
    const done = this.quizzes().filter(q =>
      q.quiz_status === 'completed' || q.quiz_status === 'passed' || q.quiz_status === 'failed'
    );
    if (!done.length) return 0;
    const sum = done.reduce((acc, q) => acc + (q.best_score / q.total_mark) * 100, 0);
    return Math.round(sum / done.length);
  });

  passedCount = computed(() =>
    this.quizzes().filter(q =>
      q.quiz_status === 'completed' || q.quiz_status === 'passed'
    ).length
  );


  ngOnInit() {
    const courseSlug = this.route.parent?.snapshot.paramMap.get('slug') ?? '';
    this.loadQuizzes(courseSlug, 1);
  }


  private courseSlug = '';

  loadQuizzes(courseSlug: string, page: number) {
    if (this.isLoadingMore()) return;

    if (courseSlug) this.courseSlug = courseSlug;

    this.isLoadingMore.set(true);

    this.courseWorkspaceService.getQuizzes(this.courseSlug, page, this.pageSize)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          const newQuizzes = res.data.quizzes || [];
          this.quizzes.update(old => [...old, ...(newQuizzes || [])]);
          this.hasMore.set(page < res.data.total_pages);
          this.currentPage.set(page);

          if (!this.courseName()) {
            this.courseName.set(newQuizzes[0]?.course_name ?? '');
          }

          this.isLoading.set(false);
          this.isLoadingMore.set(false);
        },
        error: () => {
          this.isLoading.set(false);
          this.isLoadingMore.set(false);
        }
      });
  }

  loadMore() {
    if (!this.hasMore() || this.isLoadingMore()) return;
    this.loadQuizzes('', this.currentPage() + 1);
  }

@HostListener('window:scroll')
onScroll() {
  if (this.isLoadingMore() || !this.hasMore()) return;

  const scrollPosition = window.innerHeight + window.scrollY;
  const threshold = document.body.offsetHeight - 600;

  if (scrollPosition >= threshold) {
    this.loadMore();
  }
}


  setTab(tab: FilterTab) {
    this.activeTab.set(tab);
  }


  goToQuiz(quiz: IQuizCourse) {
    this.startQuiz.emit(quiz);
  }
}
