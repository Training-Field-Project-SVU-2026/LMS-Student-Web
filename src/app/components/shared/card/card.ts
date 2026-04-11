import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ICourseCardData } from '../interfaces/course.model';
import { ImgFallback } from '../../../shared/directives/img-fallback';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink, CommonModule, ImgFallback],
  templateUrl: './card.html',
  styleUrls: ['./card.css'], 
})
export class Card {
  @Input() courseData!: ICourseCardData;

}
