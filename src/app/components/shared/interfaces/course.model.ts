export interface ICourseCardData {
  slug: string;
  title: string;
  description: string;
  image: string | null;
  avg_rating: number;       
  students_count: number;
  instructor_name?: string;
  price: string;
  category?: string;
  level?: string;
  badge?: string;
}

export interface ICourseDetail extends ICourseCardData {
  instructor_firstname: string;
  instructor_lastname: string;
  instructor_image: string | null;
  instructor_bio: string | null;
  instructor_links?: any[];
  created_at: string;
  ratings_count: number;
  is_active: boolean;
}
