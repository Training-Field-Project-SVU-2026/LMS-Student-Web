import { Component, OnInit, inject, DestroyRef, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CourseWorkspaceService } from '../../../../../services/course-workspace';
import { IAnswerSubmit, IQuestion, ISubmitQuizData } from '../../../../../models/courseWorkspace.model';

@Component({
  selector: 'app-quiz-questions',
  templateUrl: './quiz-questions.component.html',
  styleUrls: ['./quiz-questions.component.css']
})
export class QuizQuestions implements OnInit {
  @Input() quizSlug = '';
  @Output() submitted = new EventEmitter<ISubmitQuizData>();
  @Output() back = new EventEmitter<void>();

  private workspaceService = inject(CourseWorkspaceService);
  private destroyRef = inject(DestroyRef);

  questions = signal<IQuestion[]>([]);
  isLoading = signal(true);
  isSubmitting = signal(false);

  // { question_slug: choice_slug[] }
  answers = signal<Record<string, string[]>>({});

  // ✅ computed
  answeredCount = computed(() =>
    Object.keys(this.answers()).filter(k => this.answers()[k]?.length > 0).length
  );

  allAnswered = computed(() =>
    this.questions().length > 0 &&
    this.answeredCount() === this.questions().length
  );

  progress = computed(() =>
    this.questions().length
      ? Math.round((this.answeredCount() / this.questions().length) * 100)
      : 0
  );

  ngOnInit() {
    if (!this.quizSlug) {
      this.isLoading.set(false);
      return;
    }

    this.workspaceService.getQuizQuestions(this.quizSlug).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (data) => {
        this.questions.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  selectChoice(questionSlug: string, choiceSlug: string, type: 'single' | 'multiple') {
    const current = { ...this.answers() };

    if (type === 'single') {
      current[questionSlug] = [choiceSlug];
    } else {
      const selected = current[questionSlug] ?? [];
      current[questionSlug] = selected.includes(choiceSlug)
        ? selected.filter(s => s !== choiceSlug)
        : [...selected, choiceSlug];
    }

    this.answers.set(current);
  }

  isSelected(questionSlug: string, choiceSlug: string): boolean {
    const answers = this.answers();
    return answers[questionSlug]?.includes(choiceSlug) ?? false;
  }

  isQuestionAnswered(questionSlug: string): boolean {
    const answers = this.answers();
    return (answers[questionSlug]?.length ?? 0) > 0;
  }

  onSubmit() {
    if (!this.allAnswered()) {
      const first = this.questions().find(q => !this.isQuestionAnswered(q.slug));
      document.getElementById(first?.slug || '')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      return;
    }

    if (this.isSubmitting()) return;

    const answers: IAnswerSubmit[] = [];
    const ans = this.answers();

    for (const questionSlug of Object.keys(ans)) {
      for (const choiceSlug of ans[questionSlug]) {
        answers.push({ question_slug: questionSlug, choice_slug: choiceSlug });
      }
    }

    this.isSubmitting.set(true);

    this.workspaceService.submitQuiz(this.quizSlug, { answers }).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        this.submitted.emit(res.data);
      },
      error: () => this.isSubmitting.set(false),
    });
  }

  goBack() {
    this.back.emit();
  }
}
