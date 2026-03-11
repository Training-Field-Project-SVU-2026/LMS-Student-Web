import { Component } from '@angular/core';
import { Card } from "../../../../components/shared/card/card";

@Component({
  selector: 'app-course-section',
  imports: [Card],
  templateUrl: './course-section.html',
  styleUrl: './course-section.css',
})
export class CourseSection {


learningTracks = [
  {
    title: 'Full-Stack Web Development',
    description: 'Master the art of building complete, modern web applications from scratch...',
    tags: ['FRONTEND', 'BACKEND'],
    skills: ['HTML', 'CSS', 'JS', 'REACT', 'NODE.JS', 'GITHUB'],
    stats: { courses: 12, hours: 84, enrolled: '14.2k' }
  },
  {
    title: 'Full-Stack Web Development',
    description: 'Master the art of building complete, modern web applications from scratch...',
    tags: ['FRONTEND', 'BACKEND'],
    skills: ['HTML', 'CSS', 'JS', 'REACT', 'NODE.JS', 'GITHUB'],
    stats: { courses: 12, hours: 84, enrolled: '14.2k' }
  }
];


manyCourses = [
  { title: 'Modern Fullstack Web Dev', rating: 4.9, students: '15.4k', badge: 'BESTSELLER' },
  { title: 'Python for Data Science', rating: 4.5, students: '12.4k', badge: 'NEW' },
  { title: 'Advanced JavaScript Patterns', rating: 4.7, students: '8.2k', badge: 'BESTSELLER' },
  { title: 'iOS Development with Swift', rating: 4.9, students: '3.4k', badge: 'POPULAR' }
];
}
