import React, { useReducer } from "react";
import BookingForm from "../forms/BookingForm";
import { fetchAPI } from "../../api";
import moment from "moment";
import BookingSlot from "../BookingSlot";

const dates = [];
for (let i = 1; i <= 7; i++) {
  dates.push(moment().add(i, "days").format("MM/DD/YYYY"));
}

export default function Reserve() {
  const [times, dispatch] = useReducer(updateTimes, [], initialiseTimes);

  function updateTimes(times, action) {
    return fetchAPI(new Date(action.date));
  }

  function initialiseTimes() {
    return fetchAPI(new Date());
  }

  return (
    <>
      <h1>Reserve</h1>
      <ul>
        {times.map((time) => (
          <BookingSlot key={time} time={time} />
        ))}
      </ul>
      <BookingForm dates={dates} times={times} dispatch={dispatch} />
    </>
  );
}
