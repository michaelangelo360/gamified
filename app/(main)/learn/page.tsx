import { FeedWrapper } from "@/components/feed-wrapper";
import { Header } from "@/components/header";
import { UserProgress1 } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { title } from "process";

import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
const LearnPage = async() =>{
    
    const UserProgressData = getUserProgress();

    const [UserProgress] = await Promise.all([UserProgressData]);

    if (!UserProgress || !UserProgress.activeCourse){
        redirect('/courses');

    }
    
    return(
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
            <UserProgress1 activeCourse={{title:"Spanish", imageSrc:"/es.svg"}} hearts ={5} points={100} hasActiveSubscription={false}/>
               
             
                
            </StickyWrapper>
            <FeedWrapper>
             My Feed
             <Header title ="Spanish"></Header>
           
            </FeedWrapper>
            
        </div>
    );
};

export default LearnPage; 