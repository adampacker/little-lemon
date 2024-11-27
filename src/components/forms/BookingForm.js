import React from "react";
import { Formik } from "formik";
import { submitAPI } from "../../api";
import { useNavigate } from "react-router";

export default function BookingForm({ dates = [], times = [], dispatch }) {
  const navigate = useNavigate();

  return (
    <>
      <h2>Reserve a table</h2>
      <Formik
        initialValues={{
          date: dates[0],
          time: times[0],
          guests: "1",
          occasion: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.date) {
            errors.date = "Required";
          }
          if (!values.time) {
            errors.time = "Required";
          }
          if (!values.guests) {
            errors.guests = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            const response = submitAPI(values);

            if (response === true) {
              setSubmitting(false);
              navigate("/reservation/confirmed");
            }
          }, 500);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit: submitForm,
          isSubmitting,
        }) => (
          <form onSubmit={submitForm}>
            <label htmlFor="date">Date</label>
            <select
              id="date"
              name="date"
              onChange={(e) => {
                handleChange(e);
                dispatch({ type: "update_times", date: e.target.value });
              }}
              onBlur={handleBlur}
              value={values.date}
            >
              {dates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
            {errors.date && touched.date && errors.date}

            <label htmlFor="time">Time</label>
            <select
              id="time"
              name="time"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.time}
            >
              {times.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {errors.time && touched.time && errors.time}

            <label htmlFor="guests">Guests</label>
            <input
              type="number"
              name="guests"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.guests}
              min="1"
            />
            {errors.guests && touched.guests && errors.guests}

            <label htmlFor="occasion">Occasion</label>
            <select
              name="occasion"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.occasion}
            >
              <option>None</option>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
            </select>
            {errors.occasion && touched.occasion && errors.occasion}

            <button type="submit" disabled={isSubmitting}>
              Make Your reservation
            </button>
          </form>
        )}
      </Formik>
    </>
  );
}
