import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { studentsTable } from "./db/schema.js";
import db from "./db.js";
import express from "express";
const router = express.Router();
// Health check route for AWS ALB
router.get("/", (_req, res) => {
    return res.status(200).json({ status: "Running" });
});
// Route to GET all Students
router.get("/students", async (req, res) => {
    try {
        const students = await db.select().from(studentsTable);
        console.log(`All students records(${students.length}) retrieved! `);
        return res.status(200).json({ students });
    }
    catch (error) {
        console.log(`Failed to GET all students: ${error}`);
        return res.status(500).json({ error });
    }
});
// Route to CREATE new Student
router.post("/students", async (req, res) => {
    const student = req.body;
    try {
        const newStudent = await db.insert(studentsTable).values(student);
        console.log("New Student created: ", newStudent);
        // TODO: Get created students by calling a SELECT
        return res.status(200).json({ student: newStudent });
    }
    catch (error) {
        console.log("Failed to create new student: ", error);
        return res.status(500).json({ error });
    }
});
// Route to UPDATE student
router.put("/students/:student_id", async (req, res) => {
    const { student_id } = req.params;
    const data = req.body;
    try {
        const updatedStudent = await db
            .update(studentsTable)
            .set({ ...data })
            .where(eq(studentsTable.studentId, student_id));
        console.log(`Student(${student_id}) info updated!`);
        // TODO: Get updated students by calling a SELECT
        return res.status(200).json({ student: updatedStudent });
    }
    catch (error) {
        console.error(`Student(${student_id}) update failed: ${error}`);
        return res.status(500).json({ error });
    }
});
// Route to DELETE student
router.delete("/students/:student_id", async (req, res) => {
    const { student_id } = req.params;
    try {
        const deletedStudent = await db
            .delete(studentsTable)
            .where(eq(studentsTable.studentId, student_id));
        console.log(`Student(${student_id}) deleted!`);
        return res.status(200).json({ student: deletedStudent });
    }
    catch (error) {
        console.error(`Student(${student_id}) delete failed: ${error}`);
        return res.status(500).json({ error });
    }
});
export default router;
//# sourceMappingURL=routes.js.map