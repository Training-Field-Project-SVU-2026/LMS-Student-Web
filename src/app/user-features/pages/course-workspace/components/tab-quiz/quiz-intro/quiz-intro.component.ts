import { Component, OnInit, inject, DestroyRef, Output, EventEmitter, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IQuizCourse } from '../../../../../models/courseWorkspace.model';
import { CourseWorkspaceService } from '../../../../../services/course-workspace';

type FilterTab = 'all' | 'completed' | 'not_started';
@Component({
  selector: 'app-quiz-intro',
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
  activeTab = signal<FilterTab>('all');
  courseName = signal('');


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

    this.courseWorkspaceService.getQuizzes(courseSlug).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (data) => {
        this.quizzes.set(data);
        this.courseName.set(data[0]?.course_name ?? '');
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  setTab(tab: FilterTab) {
    this.activeTab.set(tab);
  }



  goToQuiz(quiz: IQuizCourse) {
    this.startQuiz.emit(quiz);
  }
}
