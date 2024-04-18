import { FeedWrapper } from "@/components/feed-wrapper";
import { Header } from "@/components/header";
import { UserProgress1 } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { title } from "process";
import { units } from "@/db/schema";
import { Unit } from "./unit";

import { getUserProgress ,getUnits, getCourseProgress, getLessonPercentage } from "@/db/queries";
import { redirect } from "next/navigation";
const LearnPage = async() =>{
    
    const UserProgressData = getUserProgress();
    const courseProgressData = getCourseProgress()
    const lessonPercentageData = getLessonPercentage();
    

    const unitsData = getUnits();
    const [UserProgress,units, courseProgress, lessonPercentage] = await Promise.all([
        UserProgressData,
        unitsData,
        courseProgressData,
        lessonPercentageData,
    ]);

    if (!UserProgress || !UserProgress.activeCourse){
        redirect('/courses');

    }

    if (!courseProgress){
        redirect("/courses");
    }
    
    return(
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
            <UserProgress1 activeCourse={UserProgress.activeCourse} hearts ={UserProgress.hearts} points={UserProgress.points} hasActiveSubscription={false}/>
               
             
                
            </StickyWrapper>
            <FeedWrapper>
             My Feed
             <Header title ={UserProgress.activeCourse.title}>
             </Header>
               {units.map((unit)=>(

                <div key={unit.id} className="mb-10">
                   
                    <Unit 
                    id ={unit.id}
                    order={unit.order}
                    description= {unit.description}
                    title  = {unit.title}
                    lessons = {unit.lessons}
                    activeLesson = {courseProgress?.activeLesson}
                    activeLessonPercentage = {lessonPercentage}
                    />
                </div>
               ))} 
           
            </FeedWrapper>
            
        </div>
    );
};

export default LearnPage; 