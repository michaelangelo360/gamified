import { integer,pgTable,serial ,text} from "drizzle-orm/pg-core"
import { title } from "process"
import { relations } from "drizzle-orm";
//import { text } from "stream/consumers"

export const courses= pgTable ('courses',{
    id: serial('id').primaryKey(),title: text("title").notNull(),
    imageSrc: text('image_src').notNull()
});

export const coursesRelations = relations(courses,({many})=>({
userProgress: many(UserProgress),
}));


export const UserProgress =pgTable("user_progress",{
    userId: text ("user_id").primaryKey(),
    userName: text ("user_name").notNull().default("User"),
    userImageSrc: text("user_image").notNull().default("/mascot.svg"),
    activeCourseId: integer("active_course_id").references(()=>courses.id, {onDelete:"cascade"}),
    hearts: integer ("hearts").notNull().default(5),
    points : integer("points").notNull().default(0)
})

export const userProgressRelations = relations(UserProgress, ({one})=>
    ({ 
        activeCourse : one (courses,{fields: [UserProgress.activeCourseId],
            references:[courses.id]
        }),

}));