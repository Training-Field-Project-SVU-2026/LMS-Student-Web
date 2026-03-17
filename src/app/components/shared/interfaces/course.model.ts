export interface ICourseCardData {
  slug: string;
  title: string;
  description: string;
  image: string | null;
  avg_rating?: number;
  students_count?: number;
  instructor_name?: string;
  price: string;
  category?: string;
  level?: string;
  badge?: string;
}
export interface ICourseDetail extends ICourseCardData {
  slug: string;
title: string;
  description: string;
  price: string;
  category: string;
  level: string;
  image: string;
  instructor_firstname: string;
  instructor_lastname: string;
  instructor_image: string;
  instructor_bio: string;
  created_at: string;
  avg_rating: number;
  ratings_count: number;
  student_enrollment_count: number;
}
