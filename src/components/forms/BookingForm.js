import React from "react";
import { Formik } from "formik";

export default function BookingForm({
  dates = [],
  times = [],
  dispatch = () => {},
  onSubmit = () => {},
}) {
  return (
    <>
      <h2>Reserve a table</h2>
      <Formik
        initialValues={{
          date: "",
          time: "",
          guests: "",
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
        validateOnMount={true}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            onSubmit(values);
            setSubmitting(false);
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
          isValid,
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
              required={true}
              data-testid="date"
            >
              <option disabled={true} value="">
                Please select
              </option>
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
              required={true}
              data-testid="time"
            >
              <option disabled={true} value="">
                Please select
              </option>
              {times.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {errors.time && touched.time && errors.time}

            <label htmlFor="guests">Guests</label>
            <input
              id="guests"
              type="number"
              name="guests"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.guests}
              min="1"
              required={true}
              data-testid="guests"
            />
            <span data-testid="guests-error">{errors.guests && touched.guests && errors.guests}</span>

            <label htmlFor="occasion">Occasion</label>
            <select
              name="occasion"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.occasion}
              data-testid="occasion"
            >
              <option>None</option>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
            </select>
            {errors.occasion && touched.occasion && errors.occasion}

            <button
              id="submit"
              type="submit"
              disabled={isSubmitting || !isValid}
              data-testid="submit"
            >
              Make your reservation
            </button>
          </form>
        )}
      </Formik>
    </>
  );
}
