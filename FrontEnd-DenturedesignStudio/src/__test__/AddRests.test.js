// AddRests.test.js
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import AddRests from "../AddRests/AddRests.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { useTime } from "../Timecontext";
const axios = require("axios");

// Mock the necessary modules and functions
jest.mock("axios");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));
jest.mock("../Timecontext", () => ({
  useTime: jest.fn(),
}));

describe("AddRests Component", () => {
  let navigateMock;
  let useLocationMock;
  let useTimeMock;

  beforeEach(() => {
    navigateMock = jest.fn();
    useLocationMock = useLocation;
    useTimeMock = useTime;

    useNavigate.mockImplementation(() => navigateMock);
    useLocationMock.mockReturnValue({
      state: {
        curves: [],
        fromReview: false,
        userdata: {},
        imgData: "",
        Autogenarated: false,
        selectedData: {},
      },
    });
    useTimeMock.mockReturnValue({
      setWatchVideoTime: jest.fn(),
    });
    axios.post.mockResolvedValue({ data: { progress: { solveTime: 0 } } });
    axios.put.mockResolvedValue({});
  });

  test("should handle user activity correctly", async () => {
    // Render the component
    render(<AddRests />);

    // Simulate user activity
    fireEvent.mouseMove(window, { clientX: 100, clientY: 100 });
    fireEvent.keyPress(window, { key: "a", code: "KeyA" });

    // Wait for any side effects to be processed
    await act(async () => {
      // Simulate a delay to ensure the timeout has been set
      await new Promise((r) => setTimeout(r, 1000));
    });

    // Verify that the state and effects have been updated as expected
    // For example, you might check if the axios PUT request was called
    expect(axios.put).toHaveBeenCalledWith(
      "http://localhost:5000/progress/edit",
      expect.any(Object)
    );
  });
});
