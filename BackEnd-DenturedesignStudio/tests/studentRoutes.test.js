const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const Student = require("../model/Student");
const studentRoutes = require("../Routes/Studentroute"); // Adjust the path to your routes file

const app = express();
app.use(express.json());
app.use("/students", studentRoutes);

describe("Student API Routes", () => {
  beforeAll(async () => {
    // Connect to a test database
    const url = `mongodb+srv://e20439:20020111@cluster0.ckgo02o.mongodb.net/denture-design-studio?retryWrites=true&w=majority&appName=Cluster0`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Clear the database and close the connection
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    // Clear the Student collection after each test
    await Student.deleteMany();
  });

  it("should add a new student", async () => {
    const response = await request(app).post("/students/add").send({
      first_name: "ravi",
      last_name: "lakshan",
      email: "ravi.lakshan@gmail.com",
      user_name: "ravi123",
      password: "password123",
    });
    expect(response.status).toBe(200);
    expect(response.body).toBe("Student added");
  });

  it("should not add a student with an existing username", async () => {
    const student = new Student({
      first_name: "nuwan",
      last_name: "thushara",
      email: "nuwan.thushara@gmail.com",
      user_name: "nuwan123",
      password: "password123",
    });
    await student.save();

    const response = await request(app).post("/students/add").send({
      first_name: "ranil",
      last_name: "wikramasinha",
      email: "ranil@gmail.com",
      user_name: "nuwan123",
      password: "password123",
    });
    expect(response.status).toBe(400);
    expect(response.text).toBe("Username already exists, use another one");
  });

  it("should fetch all students", async () => {
    const student1 = new Student({
      first_name: "nuwan",
      last_name: "thushara",
      email: "nuwan.thushara@gmail.com",
      user_name: "nuwan123",
      password: "password123",
    });
    const student2 = new Student({
      first_name: "ravi",
      last_name: "lakshan",
      email: "ravi.lakshan@gmail.com",
      user_name: "ravi123",
      password: "password123",
    });
    await student1.save();
    await student2.save();

    const response = await request(app).get("/students/");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it("should fetch a student by username", async () => {
    const student = new Student({
      first_name: "ravi",
      last_name: "lakshan",
      email: "ravi.lakshan@gmail.com",
      user_name: "ravi123",
      password: "password123",
    });
    await student.save();

    const response = await request(app).post("/students/get").send({
      user_name: "ravi123",
    });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("User fetched");
    expect(response.body.student.user_name).toBe("ravi123");
  });

  it("should return 500 if student not found", async () => {
    const response = await request(app).post("/students/get").send({
      user_name: "nonexistent",
    });
    expect(response.status).toBe(500);
    expect(response.body.status).toBe("Error fetching user");
  });

  it("should delete a student by username", async () => {
    const student = new Student({
      first_name: "ravi",
      last_name: "lakshan",
      email: "ravi.lakshan@gmail.com",
      user_name: "ravi123",
      password: "password123",
    });
    await student.save();

    const response = await request(app).delete("/students/delete").send({
      user_name: "ravi123",
    });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("user delete");
  });

  it("should return 404 if deleting a non-existing student", async () => {
    const response = await request(app).delete("/students/delete").send({
      user_name: "nonexistent",
    });
    expect(response.status).toBe(404);
    expect(response.body.status).toBe("User not found");
  });
});
