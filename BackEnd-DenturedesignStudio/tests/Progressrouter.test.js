const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const userProgressRouter = require("../Routes/Progressroute"); // update with actual path
const Progress = require("../model/userProgress"); // Mock your model

const app = express();
app.use(express.json());
app.use("/progress", userProgressRouter); // Using the router

jest.mock("../model/userProgress.js"); // Mocking the model

describe("User Progress Routes", () => {
  beforeAll(() => {
    mongoose.connect = jest.fn(); // Mock mongoose connection
  });

  afterAll(() => {
    mongoose.connection.close(); // Clean up mongoose connection
  });

  // Test for adding user progress
  test("POST /progress/add - adds user progress", async () => {
    const mockProgress = {
      user_name: "TestUser",
      createCase: 1,
      solveCase: 1,
      completedLecture: 2,
      solveTime: 10,
      lectureTime: 20,
    };

    Progress.findOne.mockResolvedValueOnce(null); // No existing progress
    Progress.prototype.save.mockResolvedValueOnce(mockProgress); // Mock save

    const res = await request(app).post("/progress/add").send(mockProgress);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBe("progress added");
  });

  // Test for getting user progress by username
  test("POST /progress/get - fetches user progress", async () => {
    const mockProgress = {
      user_name: "TestUser",
      createCase: 1,
      solveCase: 1,
      completedLecture: 2,
      solveTime: 10,
      lectureTime: 20,
    };

    Progress.findOne.mockResolvedValueOnce(mockProgress); // Mock fetching progress

    const res = await request(app)
      .post("/progress/get")
      .send({ user_name: "TestUser" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe("User fetched");
    expect(res.body.progress).toEqual(mockProgress);
  });

  // Test for editing user progress
  test("PUT /progress/edit - edits user progress", async () => {
    const mockProgress = {
      user_name: "TestUser",
      createCase: 1,
      solveCase: 1,
      completedLecture: 2,
      solveTime: 10,
      lectureTime: 20,
      watchedVideos: [],
      save: jest.fn().mockResolvedValueOnce(true), // Mock the save function
    };

    Progress.findOne.mockResolvedValueOnce(mockProgress); // Mock existing progress

    const res = await request(app)
      .put("/progress/edit")
      .send({ user_name: "TestUser", createCase: 2, videoId: "video123" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe("Progress updated");
    expect(mockProgress.createCase).toBe(2); // Check if createCase was updated
    expect(mockProgress.watchedVideos).toContain("video123"); // Check if videoId was added
  });
});
