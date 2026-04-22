import { ICourseDetailRequest } from 
  '../../components/shared/interfaces/course.model';

export interface ICourseWorkspaceHeader extends ICourseDetailRequest {
  progress?:      number;
  lessons_count?: number;
  duration?:      string;
}

export interface IMaterialsResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    total_pages: number;
    current_page: number;
    total_materials: number;
    materials: IMaterial[];
  }
}

export interface IMaterial {
  course: string;
  slug: string;
  Material_Name: string;
  file: string;
}