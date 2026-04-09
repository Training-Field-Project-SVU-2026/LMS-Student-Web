import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from './shared/components/course-card/course-card';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CourseCard,
    RouterLink
  ],
  exports: [
    CourseCard
  ]
})
export class UserFeaturesModule { 
  

}
