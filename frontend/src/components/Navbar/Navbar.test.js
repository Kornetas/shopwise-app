import { renderWithStore } from "../../test-utils/renderWithStore";
import Navbar from "./Navbar";
import { screen } from "@testing-library/react";

// Mock next/navigation (jeśli Twój Navbar korzysta np. z useRouter)
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => "/",
}));

describe("Navbar", () => {
  it("renders Shopwise title", () => {
    renderWithStore(<Navbar />);
    expect(screen.getByText(/shopwise/i)).toBeInTheDocument();
  });
});
