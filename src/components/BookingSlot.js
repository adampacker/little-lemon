import React from "react";

export default function BookingSlot({ time, isActive }) {
  return <li className={`slot ${isActive && "active"}`}>{time}</li>;
}
