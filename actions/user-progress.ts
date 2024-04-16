"use server"
import { redirect } from "next/navigation";
import db from "@/db/drizzle";
import { UserProgress, userProgressRelations } from "@/db/schema";
import { getCourseById, getUserProgress } from "@/db/queries";
import {auth , currentUser} from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

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