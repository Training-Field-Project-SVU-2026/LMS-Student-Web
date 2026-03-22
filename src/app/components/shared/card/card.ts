import { Component, Input } from '@angular/core';
import { AuthRoutingModule } from "../../../auth/auth-routing-module";
import { ICourseCardData } from '../interfaces/course.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [AuthRoutingModule,CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() courseData!: ICourseCardData;
}
