import { eq } from "drizzle-orm";
import { studentsTable } from "./db/schema.js";
import db from "./db.js";
import type { Request, Response } from "express";
import express from "express";
import logger from "./lib/logger.js";
// import type { NewStudent } from "./db/schema.js";

const Sentry = require("@sentry/node");

const router = express.Router();

// Health check route for AWS ALB
/**
 * @openapi
 * /:
 *  get:
 *    summary: Health check route for service and AWS ALB
 *    tags:
 *      - Home
 *    responses:
 *      200:
 *        description: Basic string to confirm service is running and endpoint is health
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 */
router.get("/", (_req: Request, res: Response) => {
  return res.status(200).json({ status: "Running" });
});

// Route to GET all Students
/**
 * @openapi
 * /students
 * get:
 *  summary: Get list of all Students
 *  tags:
 *    - Students
 *  responses:
 *    200:
 *      description: List of all students
 *      content:
 *        application/json
 *          schema:
 *            type: array
 *          items:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              studentId:
 *                type: string
 *              email:
 *                type: string
 *               phone:
 *                type: string
 *               gender:
 *                type: string
 *               dob:
 *                type: string
 *               level:
 *                type: string
 *               studentType:
 *                type: string
 *               degree:
 *                type: string
 *               major:
 *                type: string
 *               program:
 *                type: string
 *               admitTerm:
 *                type: string
 *      404:
 *        description: Failed to get list of all Students
 *      500:
 *        description: Server encountered error
 */
router.get("/students", async (req: Request, res: Response) => {
  try {
    const students = await db.select().from(studentsTable);

    logger.info(`All students records(${students.length}) retrieved! `);
    return res.status(200).json({ students });
  } catch (error) {
    const logMsg = `Failed to GET all students: ${error}`;
    Sentry.captureMessage(logMsg, "error");
    Sentry.captureException(error);
    logger.error(logMsg);
    return res.status(500).json({ error });
  }
});

// Route to GET single Student by ID
/**
 * @openapi
 * /students
 * get:
 *  summary: Get a Students by student_id
 *  tags:
 *    - Students
 *  responses:
 *    200:
 *      description: Get a single student by student_id
 *      content:
 *        application/json
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              studentId:
 *                type: string
 *              email:
 *                type: string
 *               phone:
 *                type: string
 *               gender:
 *                type: string
 *               dob:
 *                type: string
 *               level:
 *                type: string
 *               studentType:
 *                type: string
 *               degree:
 *                type: string
 *               major:
 *                type: string
 *               program:
 *                type: string
 *               admitTerm:
 *                type: string
 *      404:
 *        description: Failed to get list of all Students
 *      500:
 *        description: Server encountered error
 */
router.get("/students/{student_id}", async (req: Request, res: Response) => {
  const { student_id } = req.params;
  try {
    const student = await db
      .select()
      .from(studentsTable)
      .where(eq(studentsTable.studentId, student_id as string));

    logger.info(`Stuent${student_id} - ${student}`);
    return res.status(200).json({ student });
  } catch (error) {
    const logMsg = `Failed to GET all students: ${error}`;
    Sentry.captureMessage(logMsg, "error");
    Sentry.captureException(error);
    logger.error(logMsg);
    return res.status(500).json({ error });
  }
});

// Route to CREATE new Student
/**
 * @openapi
 * /students
 *  post:
 *    summary: Create a Student
 *    tags:
 *      - Students
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - firstName
 *              - lastName
 *              - studentId
 *              - email
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                 type: string
 *              studentId:
 *                 type: string
 *              email:
 *                 type: string
 *              phone:
 *                 type: string
 *              gender:
 *                 type: string
 *              dob:
 *                 type: string
 *              level:
 *                 type: string
 *              studentType:
 *                 type: string
 *              degree:
 *                 type: string
 *              major:
 *                 type: string
 *              program:
 *                 type: string
 *              admitTerm:
 *                 type: string
 *             example:
 *               firstName: 'James'
 *               lastName: 'Carter'
 *               studentId: 'STU-100001'
 *               email: 'james.carter@university.edu'
 *               phone: '555-201-3847'
 *               gender: 'Male'
 *               dob: '2001-03-14'
 *               level: 'Undergraduate'
 *               studentType: 'Full-Time'
 *               degree: 'B.S.'
 *               major: 'Computer Science'
 *               program: 'CS Program'
 *               admitTerm: 'Fall 2020'
 *             responses:
 *               200:
 *                 description: Student Created
 *                 content:
 *                    application/json
 *                      schema:
 *                        type: object
 *                        properties:
 *                          student: object
 *                            properties:
 *                               id:
 *                                type: integer
 *                              firstName:
 *                                type: string
 *                              lastName:
 *                                type: string
 *                              studentId:
 *                                type: string
 *                              email:
 *                                type: string
 *                              phone:
 *                                type: string
 *                              gender:
 *                                type: string
 *                              dob:
 *                                type: string
 *                              level:
 *                                type: string
 *                              studentType:
 *                                type: string
 *                              degree:
 *                                type: string
 *                              major:
 *                                type: string
 *                              program:
 *                                type: string
 *                              admitTerm:
 *                                type: string
 */
router.post("/students", async (req: Request, res: Response) => {
  const student = req.body;
  try {
    const [insertedItem] = await db
      .insert(studentsTable)
      .values(student)
      .returning();

    logger.info("New Student created: ", insertedItem);
    return res.status(200).json({ student: insertedItem });
  } catch (error) {
    const logMsg = `Failed to create new student- ${error}`;
    Sentry.captureMessage(logMsg, "error");
    Sentry.captureException(error);
    logger.error(logMsg);
    return res.status(500).json({ error });
  }
});

// Route to UPDATE student
/**
 * @openapi
 * /students/{student_id}
 *  put:
 *    summary: Update a Student by ID
 *    tags:
 *      - Students
 *    parameters:
 *      - in: path
 *      name: student_id
 *      required: true
 *      schema:
 *        type: integer
 *      responses:
 *        200:
 *          description: Update a Student
 *          content:
 *            description: Updated student
 *            content:
 *              application/json
 *                schema:
 *                  type: object
 *              properties:
 *                student: object
 *                  properties:
 *                  id:
 *                    type: integer
 *                  firstName:
 *                    type: string
 *                  lastName:
 *                   type: string
 *                  studentId:
 *                    type: string
 *                  email:
 *                    type: string
 *                  phone:
 *                    type: string
 *                  gender:
 *                    type: string
 *                  dob:
 *                    type: string
 *                  level:
 *                    type: string
 *                  studentType:
 *                    type: string
 *                  degree:
 *                    type: string
 *                  major:
 *                    type: string
 *                  program:
 *                    type: string
 *                  admitTerm:
 *                    type: string
 *
 *      404:
 *        description: Student not found
 *      500:
 *        description: Internal server error
 */
router.put("/students/:student_id", async (req: Request, res: Response) => {
  const { student_id } = req.params;
  const data = req.body;
  try {
    const [updatedItem] = await db
      .update(studentsTable)
      .set({ ...data })
      .where(eq(studentsTable.studentId, student_id as string))
      .returning();

    logger.info(`Student info updated - ${updatedItem}`);
    return res.status(200).json({ student: updatedItem });
  } catch (error) {
    const logMsg = `Student(${student_id}) update failed: ${error}`;
    Sentry.captureMessage(logMsg, "error");
    Sentry.captureException(error);
    logger.error(logMsg);
    return res.status(500).json({ error });
  }
});

// Route to DELETE student
/**
 * @openapi
 * /students/{student_id}
 *  delete:
 *    summary: Delete a Student item by ID
 *    tags: [Students]
 *    parameters:
 *      - in: path
 *        name: student_id
 *        schema:
 *          type: string
 *          required: true
 *          description: The STUDENT_ID of the student to delete
 *      responses:
 *        200:
 *          description: Student successfully deleted
 *          content:
 *            application/json
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                  student_id:
 *                    type: string
 *        404:
 *          description: Student now found
 *        500:
 *          description: Server error
 */
router.delete("/students/:student_id", async (req: Request, res: Response) => {
  const { student_id } = req.params;
  try {
    const [deletedItem] = await db
      .delete(studentsTable)
      .where(eq(studentsTable.studentId, student_id as string))
      .returning();

    logger.info(`Student(${student_id}) deleted - ${deletedItem}`);
    return res.status(200).json({ status: "Deleted", student_id });
  } catch (error) {
    const logMsg = `Student(${student_id}) delete failed: ${error}`;
    Sentry.captureMessage(logMsg, "error");
    Sentry.captureException(error);
    logger.error(logMsg);
    return res.status(500).json({ error });
  }
});

export default router;
