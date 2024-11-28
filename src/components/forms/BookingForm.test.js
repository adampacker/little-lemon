import BookingForm from "./BookingForm";
import { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("Renders the booking form heading", async () => {
  await act(async () => render(<BookingForm />));

  const headingElement = screen.getByText(/Reserve a table/);

  expect(headingElement).toBeInTheDocument();
});

test("Submits booking form with valid field values", async () => {
  const handleSubmit = jest.fn();
  const formComponent = render(
    <BookingForm
      dates={["12/01/2024"]}
      times={["17:00"]}
      onSubmit={handleSubmit}
    />
  );
  const date = formComponent.getByTestId("date");
  const time = formComponent.getByTestId("time");
  const guests = formComponent.getByTestId("guests");
  const occasion = formComponent.getByTestId("occasion");
  const submitButton = formComponent.getByTestId("submit");

  userEvent.selectOptions(date, "12/01/2024");
  userEvent.selectOptions(time, "17:00");
  userEvent.type(guests, "2");
  userEvent.selectOptions(occasion, "birthday");
  userEvent.click(submitButton);

  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalledWith({
      date: "12/01/2024",
      time: "17:00",
      guests: 2,
      occasion: "birthday",
    })
  );
});

test("Submit button is disabled when booking form fields are invalid", async () => {
  const handleSubmit = jest.fn();
  const formComponent = render(
    <BookingForm
      dates={["12/01/2024"]}
      times={["17:00"]}
      onSubmit={handleSubmit}
    />
  );
  const submitButton = formComponent.getByTestId("submit");

  userEvent.click(submitButton);

  await waitFor(() => expect(submitButton).toBeDisabled());
});

test("Inline error message shows on booking form when invalid field value entered", async () => {
  const handleSubmit = jest.fn();
  const formComponent = render(
    <BookingForm
      dates={["12/01/2024"]}
      times={["17:00"]}
      onSubmit={handleSubmit}
    />
  );
  const guests = formComponent.getByTestId("guests");
  const guestsError = screen.getByTestId("guests-error");
  const submitButton = formComponent.getByTestId("submit");

  userEvent.type(guests, "0");
  userEvent.click(submitButton);

  await waitFor(() => expect(guestsError.textContent).toMatch(/Required/));
});
