import { date, pgTable, serial, varchar } from "drizzle-orm/pg-core";
export const studentsTable = pgTable("students", {
    id: serial().primaryKey(),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    studentId: varchar("student_id", { length: 20 }).notNull().unique(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    phone: varchar("phone", { length: 20 }),
    gender: varchar("gender", { length: 20 }),
    dob: date("dob"),
    level: varchar("level", { length: 50 }),
    studentType: varchar("student_type", { length: 50 }),
    degree: varchar("degree", { length: 100 }),
    major: varchar("major", { length: 100 }),
    program: varchar("program", { length: 100 }),
    admitTerm: varchar("admit_term", { length: 50 }),
});
//# sourceMappingURL=schema.js.map