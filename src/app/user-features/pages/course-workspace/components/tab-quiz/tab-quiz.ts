import { Component } from '@angular/core';

@Component({
  selector: 'app-tab-quiz',
  imports: [],
  templateUrl: './tab-quiz.html',
  styleUrl: './tab-quiz.css',
})
export class TabQuiz {
currentStep:'intro' | 'question' | 'result' = 'intro';
goToStep(step:'intro' | 'question' | 'result') {
  this.currentStep =step;
}
}
