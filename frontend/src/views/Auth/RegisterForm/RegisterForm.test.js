import { screen, fireEvent } from "@testing-library/react";
import { renderWithStore } from "../../../test-utils/renderWithStore";
import RegisterForm from "./RegisterForm";

// Tests for the RegisterForm component
describe("RegisterForm", () => {
  // This test checks if all input fields and the register button are visible
  it("renders all fields and register button", () => {
    renderWithStore(<RegisterForm />);
    // Check if the name input is rendered
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    // Check if the email input is rendered
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    // Check if the password input is rendered
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    // Check if the register button is rendered
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  // This test checks if validation works when required fields are empty
  it("validates required fields", async () => {
    renderWithStore(<RegisterForm />);
    // Simulate clicking the register button without filling fields
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    // Wait for the validation message to appear
    expect(
      await screen.findByText(/all fields are required/i)
    ).toBeInTheDocument();
  });
});
