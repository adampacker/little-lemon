import React from "react";
import { useSearchParams } from "react-router";

export default function ConfirmedBookingPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams)

  return (
    <>
      <h1>Reservation confirmation</h1>
      <div>
        <p>Your reservation for <strong>{searchParams.get("time")}</strong> on <strong>{searchParams.get("date")}</strong> has been confirmed!</p>
      </div>
    </>
  );
}
