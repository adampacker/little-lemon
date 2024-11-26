import React from "react";
import { Formik } from "formik";

export default function BookingForm() {
  return (
    <Formik
      initialValues={{ date: "", time: "", guests: "", occasion: "" }}
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
        if (!values.occasion) {
          errors.occasion = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="date"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.date}
          />
          {errors.date && touched.date && errors.date}

          <select
            name="time"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.time}
          >
            <option>17:00</option>
            <option>18:00</option>
            <option>19:00</option>
            <option>20:00</option>
            <option>21:00</option>
            <option>22:00</option>
          </select>
          {errors.time && touched.time && errors.time}

          <input
            type="number"
            name="guests"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.guests}
          />
          {errors.guests && touched.guests && errors.guests}

          <select
            name="occasion"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.occasion}
          >
            <option>Birthday</option>
            <option>Anniversary</option>
          </select>
          {errors.occasion && touched.occasion && errors.occasion}

          <button type="submit" disabled={isSubmitting}>
            Make Your reservation
          </button>
        </form>
      )}
    </Formik>
  );
}
