import { renderWithStore } from "../../test-utils/renderWithStore";
import Navbar from "../../components/Navbar/Navbar";
import { screen } from "@testing-library/react";

describe("Navbar", () => {
  it("renders Shopwise title", () => {
    // Test if the navbar renders the site title
    renderWithStore(<Navbar />);
    expect(screen.getByText(/shopwise/i)).toBeInTheDocument();
  });
});
