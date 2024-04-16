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
        
        await db.insert(schema.courses).values([
            {
               
                title : "Spanish",
                imageSrc: "/es.svg"
            },
            {
                
                title : "croatia",
                imageSrc: "/hr.svg"
            },
            {
              
                title : "Japan",
                imageSrc: "/jp.svg"
            }
        ]);
        console.log ("Seeding finished");


    }catch (error){
        console.error(error);
        throw new Error ("Failed to seed the databse");

      
    }
};

main();