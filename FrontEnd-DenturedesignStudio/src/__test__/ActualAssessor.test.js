import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ActualorAssessor from "../Homepages/StudentHome/ActualorAssessor";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import html2canvas from "html2canvas";

// Mock html2canvas to return a fake image data
jest.mock("html2canvas", () => jest.fn());

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../TeethComp/Teeth.jsx", () => () => (
  <div data-testid="teeth-component">Teeth Component</div>
));

const mockNavigate = jest.fn();
const mockCancel = jest.fn();
const mockSolve = jest.fn();
const mockUserdata = { username: "testuser" };

test("renders buttons correctly", () => {
  render(
    <BrowserRouter>
      <ActualorAssessor
        cancel={mockCancel}
        solve={mockSolve}
        userdata={mockUserdata}
      />
    </BrowserRouter>
  );

  expect(screen.getByText("Genarate a Case")).toBeInTheDocument();
  expect(screen.getByText("Actual Case")).toBeInTheDocument();
});

test("handles the Actual Case button click", () => {
  render(
    <BrowserRouter>
      <ActualorAssessor
        cancel={mockCancel}
        solve={mockSolve}
        userdata={mockUserdata}
      />
    </BrowserRouter>
  );

  fireEvent.click(screen.getByText("Actual Case"));

  expect(mockNavigate).toHaveBeenCalledWith("/addSaddles", {
    state: { userdata: mockUserdata },
  });
  expect(mockSolve).toHaveBeenCalled();
});

test("handles the Generate a Case button click", async () => {
  // Mock html2canvas to resolve with a fake image
  html2canvas.mockResolvedValueOnce({
    toDataURL: () => "mocked-image-data",
  });

  render(
    <BrowserRouter>
      <ActualorAssessor
        cancel={mockCancel}
        solve={mockSolve}
        userdata={mockUserdata}
      />
    </BrowserRouter>
  );

  fireEvent.click(screen.getByText("Genarate a Case"));

  // Wait for navigation after the async operation
  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith("/addSaddles", {
      state: {
        userdata: mockUserdata,
        imgData: "mocked-image-data",
        Autogenarated: true,
      },
    });
  });

  expect(mockSolve).toHaveBeenCalled();
});
