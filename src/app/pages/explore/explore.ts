import { Component } from '@angular/core';
import { ExploreHeader } from "./components/explore-header/explore-header";
import { FilterSection } from './components/filter-section/filter-section';
import { CourseSection } from "./components/course-section/course-section";

@Component({
  selector: 'app-explore',
  imports: [ExploreHeader, FilterSection ,CourseSection],
  templateUrl: './explore.html',
  styleUrl: './explore.css',
  standalone: true,
})
export class Explore {


}
