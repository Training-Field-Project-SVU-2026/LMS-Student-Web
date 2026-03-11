import { Component } from '@angular/core';

@Component({
  selector: 'app-why-us',standalone: true,
  imports: [],
  templateUrl: './why-us.html',
  styleUrl: './why-us.css',
})
export class WhyUs {
features = [
  {
    title: 'Interactive Quizzes',
    desc: 'Get instant feedback on your progress with code-based challenges and logic puzzles after every module.',
    iconClass: 'fas fa-question'
  },
  {
    title: 'Discussion Board',
    desc: 'Never get stuck alone. Our peer-to-peer and mentor-led forums are active 24/7 to help you solve bugs.',
    iconClass: 'fas fa-comment'
  },
  {
    title: 'Structured Paths',
    desc: "Follow curated 'Zero to Hero' sequences designed by industry experts to get you job-ready in months.",
    iconClass: 'fas fa-flag'
  }
];
}
