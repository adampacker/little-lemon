import React, { useReducer, useState } from "react";
import BookingForm from "../forms/BookingForm";
import { fetchAPI } from "../../api";
import moment from "moment";
import BookingSlot from "../BookingSlot";
import { submitAPI } from "../../api";
import { useNavigate } from "react-router";

const dates = [];
for (let i = 1; i <= 7; i++) {
  dates.push(moment().add(i, "days").format("MM/DD/YYYY"));
}

export default function BookingPage() {
  const [selectedTime, setSelectedTime] = useState("");
  const [times, dispatch] = useReducer(updateTimes, [], initialiseTimes);
  const navigate = useNavigate();

  function updateTimes(times, action) {
    return fetchAPI(new Date(action.date));
  }

  function initialiseTimes() {
    return fetchAPI(new Date());
  }

  function submitForm(values) {
    const response = submitAPI(values);

    if (response === true) {
      navigate(
        `/reservation/confirmed?date=${values.date}&time=${values.time}`
      );
    }
  }

  return (
    <>
      <section className="page-header">
        <h1>Reservations</h1>
      </section>
      <ul
        className="timeslots"
        aria-label="Available times"
        data-testid="times"
      >
        {times.map((time) => (
          <BookingSlot
            key={time}
            time={time}
            isActive={time === selectedTime}
            onClick={() => setSelectedTime(time)}
          />
        ))}
      </ul>
      <BookingForm
        dates={dates}
        times={times}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        dispatch={dispatch}
        onSubmit={submitForm}
      />
    </>
  );
}
