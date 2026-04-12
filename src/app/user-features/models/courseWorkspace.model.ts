import { ICourseDetailRequest } from 
  '../../components/shared/interfaces/course.model';

export interface ICourseWorkspaceHeader extends ICourseDetailRequest {
  progress?:      number;
  lessons_count?: number;
  duration?:      string;
}



// {
//     "success": true,
//     "status": 200,
//     "message": "Materials retrieved successfully",
//     "data": [
//         {
//             "course": "dfdf",
//             "slug": "mat-day2-0805d362",
//             "Material_Name": "Day2",
//             "file": "http://lms-env.eba-8nbnpx42.us-east-1.elasticbeanstalk.com/media/courses/materials/Day2_OdcDd3u.pdf"
//         },
//         {
//             "course": "dfdf",
//             "slug": "mat-ftbrtb-e6400d46",
//             "Material_Name": "ftbrtb",
//             "file": "http://lms-env.eba-8nbnpx42.us-east-1.elasticbeanstalk.com/media/courses/materials/Day2_Lab_Assignment.pdf"
//         }
//     ]
// }