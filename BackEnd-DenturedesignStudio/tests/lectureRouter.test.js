const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const lectureRouter = require("../Routes/Lectureroute"); // update with actual path
const Lecturecontent = require("../model/Lecturecontent"); // Mock your model

const app = express();
app.use(express.json()); // to parse json in requests
app.use("/lectures", lectureRouter); // Using the router

jest.mock("../model/Lecturecontent.js"); // Mocking the model

describe("Lecture Content Routes", () => {
  beforeAll(() => {
    mongoose.connect = jest.fn(); // Mock mongoose connection
  });

  afterAll(() => {
    mongoose.connection.close(); // Clean up mongoose connection
  });

  // Test for adding a lecture
  test("POST /lectures/add - adds a new lecture", async () => {
    const mockLecture = {
      title: "Test Lecture",
      videoUrl: "http://test.com",
      description: "Test description",
    };

    Lecturecontent.findOne.mockResolvedValueOnce(null); // No existing lecture
    Lecturecontent.prototype.save.mockResolvedValueOnce(mockLecture); // Mock save

    const res = await request(app).post("/lectures/add").send(mockLecture);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBe("lecture added");
  });

  // Test for fetching all lectures
  test("GET /lectures - fetch all lectures", async () => {
    const mockLectures = [{ title: "Lecture 1" }, { title: "Lecture 2" }];
    Lecturecontent.find.mockResolvedValueOnce(mockLectures); // Mock fetching

    const res = await request(app).get("/lectures");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockLectures);
  });

  // Test for deleting a lecture
  test("DELETE /lectures/delete/:id - delete a lecture by ID", async () => {
    const mockLecture = { _id: "someid", title: "Lecture 1" };

    Lecturecontent.findById.mockResolvedValueOnce(mockLecture); // Mock finding the lecture
    Lecturecontent.findOneAndDelete.mockResolvedValueOnce(mockLecture); // Mock delete

    const res = await request(app).delete("/lectures/delete/someid");

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe("lecture delete");
    expect(res.body.lecture).toEqual(mockLecture);
  });

  // Test for counting lectures
  test("GET /lectures/count - count all lectures", async () => {
    Lecturecontent.countDocuments.mockResolvedValueOnce(5); // Mock count

    const res = await request(app).get("/lectures/count");

    expect(res.statusCode).toEqual(200);
    expect(res.body.count).toBe(5);
  });
});
