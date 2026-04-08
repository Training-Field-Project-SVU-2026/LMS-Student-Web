
export interface ICourseCardData {
  slug: string;
  title: string;
  description: string;
  image: string;
  avg_rating: number;
  students_count: number;
  instructor_name: string;
  price: string;
  is_enrolled?: boolean;
}

export interface IBaseCourse {
  slug: string;
  title: string;
  description: string;
  image?: string | null;
  avg_rating?: number | null;
  students_count?: number;
  courses_count?: number;
  instructor_name?: string | null;
  price?: string | null;
  progress?: number;
  status?: string;
  enrolled_at?: string;
  is_enrolled?: boolean;
  category?: string;
  level?: string;
  is_active?: boolean;
  created_at?: string;
  ratings_count?: number;
}
// Top Rated Response
export interface ITopRatedResponse {
  success: boolean;
  status: number;
  message: string;
  data: IBaseCourse[];
}

// All Courses Response
export interface IAllCoursesResponse {
  count: number;
  results: IBaseCourse[];
  next: string | null;
  previous: string | null;
}

// Course Detail
export interface IInstructorLink {
  slug: string;
  platformName: string;
  url: string;
}


export interface ICourseDetailRequest {
  title: string;
  slug: string;
  description: string;
  price: string | null;
  category: string;
  level: string;
  image: string | null;
  created_at: string;
  is_active: boolean;
  instructor_name: string;
  instructor_image: string | null;
  instructor_bio: string;
  instructor_links: IInstructorLink[];
  avg_rating: number | null;
  ratings_count: number;
  is_enrolled: boolean;


}

export interface ICourseDetailResponse {
  success: boolean;
  status: number;
  message: string;
  data: ICourseDetailRequest;
}
// one package
export interface IPackageCardData {
  slug: string;
  title: string;
  description: string;
  instructor_name: string;
  price: string;
  courses_count: number;
  avg_rating: number;
  image?: string | null;
  categories?: string[];
  course_slugs?: string[];
}

//response
export interface IPackagesResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    total_packages: number;
    total_pages: number;
    current_page: number;
    packages: IPackageCardData[];
  };
}

// Enroll (POST)
export interface IEnrollRequest {
  course: number;
}
export interface IEnrollResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    id: number;
    student: number;
    course: number;
    enrolled_at: string;
  };
}

// Enrollment (GET)
export interface IMyEnrollmentsData {
  total_courses: number;
  total_pages: number;
  current_page: number;
  courses: IBaseCourse[];
}
export interface IMyEnrollmentsResponse {
  success: boolean;
  status: number;
  message: string;
  data: IMyEnrollmentsData;
}

export interface IPackageDetailsCourse {
  title: string;
  slug: string;
  image?: string | null;
  avg_rating: number;
  ratings_count: number;
  students_count: number;
  is_enrolled?: boolean | null;
  instructor_name: string;
}

export interface IPackageDetails {
  title: string;
  slug: string;
  description: string;
  price: string | number | null;
  avg_rating: number;
  ratings_count: number;
  students_count: number;
  courses_count: number;
  is_enrolled?: boolean | null;
  instructor_name?: string | null;
  courses: IPackageDetailsCourse[];
  course_slugs?: string[];
  categories?: string[];
  created_at?: string;
}

export interface IPackageDetailsResponse {
  success: boolean;
  status: number;
  message: string;
  data: IPackageDetails;
}
