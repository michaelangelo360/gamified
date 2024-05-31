"use server"
import { redirect } from "next/navigation";
import db from "@/db/drizzle";
import { challengeProgress,challenges,UserProgress, userProgressRelations } from "@/db/schema";
import { getCourseById, getUserProgress } from "@/db/queries";
import {auth , currentUser} from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { Adamina } from "next/font/google";
import { eq, and } from "drizzle-orm";
import { error } from "console";

export const upsertUserProgress = async (courseId: number)=>{

    const {userId} = await auth();
    const user = await currentUser();

    if (!userId ||!user){
        throw new Error("Unauthorized");
    }

    const course = await getCourseById(courseId);

    if (!course){
        throw new Error("Course not found");


    }

    
    //TODO : enable once unit and lessons are 
    // if (!course.units.length || !course.units[0].lessons.length){
    //     throw new Error ("Course is Empty")
    // }

    const existingUserProgress = await getUserProgress();
    if (existingUserProgress){
        await db.update(UserProgress).set({
            activeCourseId: courseId,
            userName : user.firstName || "User",
            userImageSrc: user.imageUrl || "/mascot.svg",
        });
        revalidatePath("/courses");
        revalidatePath("/learn");
        redirect("/learn");

    }
    await db.insert(UserProgress).values({
     userId,
     activeCourseId:courseId,
     userName :user.firstName || "User",
     userImageSrc :user.imageUrl || "/mascot.svg",

    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
};

export const reduceHearts = async (challengeId:number)=>{
    const {userId } = await auth();

    if (!userId){

        throw new Error ("Unauthorized");
    }

    const currentUserProgress = await getUserProgress();

    // TODO: Get user subbscription

    const challenge = await db.query.challenges.findFirst({
        where :eq(challenges.id , challengeId)
    });

    if(!challenge){
        throw new Error ("Challenge not found");
    }

    const lessonId = challenge.lessonsId;

    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId),
        )
    });

    const isPractice = !!existingChallengeProgress;
    if (isPractice){
        return {error:"practice"};
    }
    if (!currentUserProgress){
        throw new Error ("User progress not found");
    }

    //TODO: handle subscription 

    if (currentUserProgress.hearts ===0){
        return {error:"hearts"}
    }

    await db.update(UserProgress).set({
        hearts:Math.max(currentUserProgress.hearts-1,0),
    }).where(eq(UserProgress.userId,userId ))

    revalidatePath("/shop");
    revalidatePath("/learn");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`)
}