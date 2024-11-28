import React from "react";
import { Formik } from "formik";

export default function BookingForm({
  dates = [],
  times = [],
  selectedTime = "",
  setSelectedTime = () => {},
  dispatch = () => {},
  onSubmit = () => {},
}) {
  return (
    <>
      <h2>Reserve a table</h2>
      <Formik
        initialValues={{
          date: dates[0] || "",
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
          setFieldValue,
        }) => (
          <form onSubmit={submitForm}>
            <label className="required" htmlFor="date">
              Date
            </label>
            <select
              id="date"
              name="date"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("time", "");
                setSelectedTime("");
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
            <div className="error" data-testid="date-error">
              {errors.date && touched.date && errors.date}
            </div>

            <label className="required" htmlFor="time">
              Time
            </label>
            <select
              id="time"
              name="time"
              onChange={(e) => {
                handleChange(e);
                setSelectedTime(e.target.value);
              }}
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
            <div className="error" data-testid="time-error">
              {errors.time && touched.time && errors.time}
            </div>

            <label className="required" htmlFor="guests">
              Guests
            </label>
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
            <div className="error" data-testid="guests-error">
              {errors.guests && touched.guests && errors.guests}
            </div>

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
            <div className="error" data-testid="occasion-error">
              {errors.occasion && touched.occasion && errors.occasion}
            </div>

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
