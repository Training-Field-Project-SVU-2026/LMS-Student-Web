import { ICourseDetailRequest } from 
  '../../components/shared/interfaces/course.model';

export interface ICourseWorkspaceHeader extends ICourseDetailRequest {
  progress?:      number;
  lessons_count?: number;
  duration?:      string;
}