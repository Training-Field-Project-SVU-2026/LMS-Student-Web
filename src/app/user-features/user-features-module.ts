import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from './shared/components/course-card/course-card';
import { RouterLink } from '@angular/router';
import { TabMaterials } from './pages/course-workspace/components/tab-materials/tab-materials';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CourseCard,
    RouterLink,
    TabMaterials
  ],
  exports: [
    CourseCard,
    TabMaterials,
  ]
})
export class UserFeaturesModule {


}
