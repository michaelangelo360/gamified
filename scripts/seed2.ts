import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // Clear tables
    await db.delete(schema.challengeProgress);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challenges);
    await db.delete(schema.lessons);
    await db.delete(schema.units);
    await db.delete(schema.UserProgress);
    await db.delete(schema.courses);

    // Insert courses
    console.log("Inserting courses...");
    await db.insert(schema.courses).values([
      { title: "Spanish", imageSrc: "/es.svg" },
      { title: "Croatian", imageSrc: "/hr.svg" },
      { title: "Japanese", imageSrc: "/jp.svg" },
    ]);

    // Log courses
    const courses = await db.select().from(schema.courses);
    console.log("Courses inserted:", courses);

    // Insert units
    console.log("Inserting units...");
    await db.insert(schema.units).values([
      {
        courseId: courses[0].id, // Assuming the first course is Spanish
        title: "Unit 1",
        description: "Learn the basics of Spanish",
        order: 1,
      },
    ]);

    // Insert lessons
    console.log("Inserting lessons...");
    const units = await db.select().from(schema.units);
    await db.insert(schema.lessons).values([
      { unitId: units[0].id, order: 1, title: "Nouns" },
      { unitId: units[0].id, order: 2, title: "Verbs" },
      { unitId: units[0].id, order: 3, title: "Verbs" },
      { unitId: units[0].id, order: 4, title: "Verbs" },
      { unitId: units[0].id, order: 5, title: "Verbs" },
    ]);

    // Insert challenges
    console.log("Inserting challenges...");
    const lessons = await db.select().from(schema.lessons);
    await db.insert(schema.challenges).values([
      {
        lessonsId: lessons[0].id,
        type: "SELECT",
        order: 1,
        question: "Which one of these is the man?",
      },
      {
        lessonsId: lessons[1].id,
        type: "ASSIST",
        order: 2,
        question: "The man?",
      },
      {
        lessonsId: lessons[2].id,
        type: "SELECT",
        order: 3,
        question: "Which one of these is the robot?",
      },
    ]);

    // Insert challenge options
    console.log("Inserting challenge options...");
    const challenges = await db.select().from(schema.challenges);
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: challenges[0].id,
        imageSrc: "/man.svg",
        correct: true,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: challenges[0].id,
        imageSrc: "/woman.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: challenges[0].id,
        imageSrc: "/robot.svg",
        correct: false,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
      {
        challengeId: challenges[1].id,
        correct: true,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: challenges[1].id,
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: challenges[1].id,
        correct: false,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
      {
        challengeId: challenges[2].id,
        imageSrc: "/man.svg",
        correct: false,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: challenges[2].id,
        imageSrc: "/woman.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: challenges[2].id,
        imageSrc: "/robot.svg",
        correct: true,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error("Error during seeding:", error);
    throw new Error("Failed to seed the database");
  }
};

main();
