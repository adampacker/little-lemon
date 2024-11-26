import { render, screen } from "@testing-library/react";
import BookingForm from "./BookingForm";

test("Renders the booking form heading", () => {
  render(<BookingForm />);
  const headingElement = screen.getByText(/Reserve a table/);
  expect(headingElement).toBeInTheDocument();
});
