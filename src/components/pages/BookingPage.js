import React, { useReducer } from "react";
import BookingForm from "../forms/BookingForm";
import { fetchAPI } from "../../api";
import moment from "moment";

const dates = [];
for (let i = 1; i <= 7; i++) {
  dates.push(moment().add(i, "days").format("MM/DD/YYYY"));
}

export default function Reserve() {
  const [state, dispatch] = useReducer(updateTimes, [], initialiseTimes);

  function updateTimes(state, action) {
    return fetchAPI(new Date(action.date));
  }

  function initialiseTimes() {
    return fetchAPI(new Date());
  }

  return (
    <>
      <h1>Reserve</h1>
      <BookingForm dates={dates} times={state} dispatch={dispatch} />
    </>
  );
}
