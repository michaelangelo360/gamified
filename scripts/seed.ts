import "dotenv/config";
import {drizzle} from "drizzle-orm/neon-http";
import {neon} from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql ,{schema});

const main = async ()=>{
    try{
        console.log("seeding database");
        await db.delete(schema.courses);
        await db.delete(schema.UserProgress);
        await db.delete(schema.lessons);
        await db.delete(schema.units);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);
        //await db.delete(schema.UserProgress);
        
        
        await db.insert(schema.courses).values([
            {
               id : 1,
                title : "Spanish",
                imageSrc: "/es.svg"
            },
            {
                id : 2,
                title : "croatia",
                imageSrc: "/hr.svg"
            },
            {
                id : 3,
                title : "Japan",
                imageSrc: "/jp.svg"
            }
        ]);


        await db.insert(schema.units).values([
            {
                id :1 , 
                courseId :1,
                title :"Unit 1",
                description : "Learn the basics of Spanish",
                order : 1
            }
        ]);
        
        await db.insert(schema.lessons).values([
            {
                id :1 , 
                unitId : 1,
                order :1 ,
                title :"Nouns"
            },
            
        ]);
        
     
    await db.insert(schema.challenges).values([
        {
            id :1 ,
            lessonsId :1,
            type : "SELECT",
            order :1,
            question: " which one of these is the ? "
        }
    ]);

    await db.insert(schema.challengeOptions).values([
        {
            id : 1 ,
            challengeId :1,
            imageSrc : "/man.svg",
            correct: true , 
            text : "el hombre",
            audioSrc: "/es_man.mp3",
        },
        {
            id : 2,
            challengeId :1,
            imageSrc : "/woman.svg",
            correct: false , 
            text : "el mujer",
            audioSrc: "/es_woman.mp3",
        },
        {
            id : 3 ,
            challengeId :1,
            imageSrc : "/robot.svg",
            correct: false , 
            text : "el robot",
            audioSrc: "/es_robot.mp3",
        },
        
    ]);
        console.log ("Seeding finished");


    }catch (error){
        console.error(error);
        throw new Error ("Failed to seed the databse");

      
    }
};

main();