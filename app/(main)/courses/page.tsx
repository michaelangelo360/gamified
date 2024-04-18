import { List } from "./list";
import { getCourseProgress, getCourses ,getLessonPercentage,getUnits,getUserProgress} from "@/db/queries";
const CoursesPage =async () => {
    const coursesData = await getCourses();
    const UserProgressData = await getUserProgress();
    const courseProgressData = getCourseProgress()
    const lessonPercentage = getLessonPercentage();
    const unitsData = getUnits()

    const [courses,UserProgress,]= await Promise.all([coursesData,UserProgressData])
    return(
      <div className=" h-full max-w-[912px] px-3 mx-auto">
        <h1 className="text-2xl font-bold text-neutral-700">

         Rewarding Courses
        </h1>
        <List courses ={courses} activeCourseId={UserProgress?.activeCourseId}></List>
      </div>
    )
} 
export default CoursesPage;