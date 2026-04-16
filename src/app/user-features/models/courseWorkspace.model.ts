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

export interface IQuizCourse {
  slug: string;
  quiz_name: string;
  total_mark:number;
  max_attempts:number;
  course_name:string;
  attempts_used:number;
  best_score:number;
  quiz_status:'not_started' | 'in_progress' | 'completed' | 'failed' | 'passed';
}

export interface IQuizCourseResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    total_pages: number;
    current_page: number;
    total_quizzes: number;
    quizzes: IQuizCourse[];
  }
}

export interface IQuestionsResponse {
  success: boolean;
  status: number;
  message: string;
  data: IQuestionsData;
}

export interface IQuestionsData {
  total_pages: number;
  current_page: number;
  total_quizzes: number;
  quizzes?: IQuestion[];
  questions?: IQuestion[];
}
export interface IQuestion {
  slug: string;
  question_name: string;
  question_type: 'single' | 'multiple';
  choices: IChoice[];
}

export interface IChoice {
  slug: string;
  choice_name: string;
}

export interface ISubmitQuizRequest {
  answers: IAnswerSubmit[];
}
export interface IAnswerSubmit {
  question_slug: string;
  choice_slug: string;
}

export interface ISubmitQuizResponse {
  success: boolean;
  status: number;
  message: string;
  data: ISubmitQuizData;
}
export interface ISubmitQuizData {
  quiz_name: string;
  total_mark: number;
  score: number;
  status: 'passed' | 'failed';
  attempt_number: number;
  attempt_date: string;
  answers: ISubmittedAnswer[];
}
export interface ISubmittedAnswer {
  question: string;
  selected: string;
  is_correct: boolean;
}
export interface IQuizAnswerResult {
  question: string;
  selected: string;
  is_correct: boolean;
}
export interface IQuizResult {
  quiz_name: string;
  total_mark: number;
  score: number;
  status: 'passed' | 'failed';
  attempt_number: number;
  attempt_date: string;
  answers: IQuizAnswerResult[];
}
export interface IQuizResultsResponse {
  success: boolean;
  status: number;
  message: string;
  data: IQuizResult[];
}
