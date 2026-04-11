export interface EnrolledCourse {
  title: string;
  slug: string;
  image: string | null;
  progress: number;
  status: 'not_started' | 'in_progress' | 'completed';
  enrolled_at: string;
}

export interface EnrollmentData {
  total_pages: number;
  current_page: number;
  total_courses: number;
  courses: EnrolledCourse[];
}

export interface EnrollmentResponse {
  success: boolean;
  status: number;
  message: string;
  data: EnrollmentData;
}
export interface IRateCourseRequest {
  rate: number; 
}
export interface IRateCourseResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    rate: number;
  };
}