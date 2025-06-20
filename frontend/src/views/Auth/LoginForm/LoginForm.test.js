import { renderWithStore } from "../../../test-utils/renderWithStore";
import { screen, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";

// Predefined initial Redux state for user
const initialUserState = {
  user: {
    loading: false,
    error: null,
    user: null,
  },
};

describe("LoginForm", () => {
  // Test if login form renders correctly
  it("renders email & password fields and login button", () => {
    renderWithStore(<LoginForm />, { preloadedState: initialUserState });
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  // Test user interaction: typing and submitting
  it("allows user to type and submit", () => {
    renderWithStore(<LoginForm />, { preloadedState: initialUserState });

    // Simulate typing email and password
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@dev.pl" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "sekretnehaslo" },
    });

    // Simulate click on the login button
    fireEvent.click(screen.getByRole("button"));
    // You can add more assertions here, e.g. for dispatch, spinner etc.
  });

  // Test validation: show error message if fields are empty
  it("shows error if email or password is empty", async () => {
    renderWithStore(<LoginForm />, { preloadedState: initialUserState });

    // Try submitting empty form
    fireEvent.click(screen.getByRole("button"));

    // Check if error message is displayed
    expect(
      await screen.findByText(/email and password are required/i)
    ).toBeInTheDocument();
  });
});
