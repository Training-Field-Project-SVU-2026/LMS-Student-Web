import { Component } from '@angular/core';

@Component({
  selector: 'app-why-us', standalone: true,
  imports: [],
  templateUrl: './why-us.html',
  styleUrl: './why-us.css',
})
export class WhyUs {
  features = [
    {
      title: 'Interactive Quizzes',
      desc: 'Hands-on code challenges after every module. Immediate feedback, no guessing games.',
      icon: 'quiz'
    },
    {
      title: 'Discussion Board',
      desc: 'Stuck on a bug at 2am? Peers and mentors are active around the clock — ask anything, anytime.',
      icon: 'discussion'
    },
    {
      title: 'Structured Paths',
      desc: "No guessing what to learn next. Expert-designed paths take you from syntax to job-ready, step by step.",
      icon: 'path'
    }
  ];
}
