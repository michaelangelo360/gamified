import { FeedWrapper } from "@/components/feed-wrapper";
import { Header } from "@/components/header";
import { UserProgress1 } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { title } from "process";
import { units } from "@/db/schema";
import { Unit } from "./unit";

import { getUserProgress ,getUnits } from "@/db/queries";
import { redirect } from "next/navigation";
const LearnPage = async() =>{
    
    const UserProgressData = getUserProgress();
    const unitsData = getUnits();
    const [UserProgress,units,] = await Promise.all([
        UserProgressData,
        unitsData,
    ]);

    if (!UserProgress || !UserProgress.activeCourse){
        redirect('/courses');

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
                    activeLesson = {undefined}
                    activeLessonPercentage = {0}
                    />
                </div>
               ))} 
           
            </FeedWrapper>
            
        </div>
    );
};

export default LearnPage; 