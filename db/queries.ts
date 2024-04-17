import {cache} from "react";
import {eq} from "drizzle-orm";
import {auth} from "@clerk/nextjs";
import { UserProgress, challengeProgress, units } from "@/db/schema";
import { courses } from "@/db/schema";
import db from "@/db/drizzle";


export const getUserProgress = cache (async()=>{
    const {userId} = await auth();

    if (!userId){
        return null;
    }
    const data = await db.query.UserProgress.findFirst({
        where: eq(UserProgress.userId,userId), with:{
            activeCourse:true
        },
    
    });
    return data;
})
export const getCourses = cache(async()=>
{
 const data=  await db.query.courses.findMany();
 return data;
});

export const getUnits = cache(async ()=>{
    const {userId} = await auth();
    const userProgress = await getUserProgress();
    if (!userId || !userProgress?.activeCourseId){
        return [];
    }

    const data = await db.query.units.findMany({
        where :eq(units.courseId, userProgress.activeCourseId),
        with : {
            lessons: {
                with: {
                    challenges: {
                        with :{
                            challengeProgress:{
                                where: eq(challengeProgress.userId,
                                    userId,
                                )
                            },
                        }
                    }
                }
            }
        }
    })
    const normalizedData = data.map((unit)=>{
        const lessonsWithCompletedStatus =unit.lessons.map((lesson)=>{
            const allCompletedChallenges = lesson.challenges.every((challenge)=>{
                return challenge.challengeProgress
                 && challenge.challengeProgress.length>0 
                 && challenge.challengeProgress.every((progress)=>progress.completed);
            });
            return {...lesson, completed: allCompletedChallenges};
        })
        return { ...unit, lessons: lessonsWithCompletedStatus};
    });
   
    return normalizedData;
});


export const getCourseById = cache (async (courseId: number)=>{
    const data = await db.query.courses.findFirst({
        where : eq (courses.id, courseId),
    });
    return data
})