import { Component } from '@angular/core';
import { Hero } from './components/hero/hero';
import { FeaturedCourses } from './components/featured-courses/featured-courses';
import { WhyUs } from './components/why-us/why-us';
import { Cta } from './components/cta/cta';
@Component({
  selector: 'app-home',
  imports: [Cta, WhyUs, FeaturedCourses, Hero],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true,
})
export class Home {
 
}
