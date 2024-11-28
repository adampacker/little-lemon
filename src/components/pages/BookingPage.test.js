import { act } from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import BookingPage from "../pages/BookingPage";
import { BrowserRouter } from "react-router";

test("Renders the booking page heading", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <BookingPage />
      </BrowserRouter>
    )
  );

  const headingElement = screen.getByText(/Reservations/);

  expect(headingElement).toBeInTheDocument();
});

test("Available times from API are listed on booking page initialisation", async () => {
  const pageComponent = render(
    <BrowserRouter>
      <BookingPage />
    </BrowserRouter>
  );

  const initialTimesList = pageComponent.getByTestId("times");
  const { getAllByRole } = within(initialTimesList);
  const initialTimesListItems = getAllByRole("listitem");

  await waitFor(() => expect(initialTimesListItems.length).toBeGreaterThan(0));
});
