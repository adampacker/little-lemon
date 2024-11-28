import React from "react";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <section class="banner">
      <h1 className="banner-title">Welcome to Little Lemon Resturant</h1>
      <Link to="reservation" className="banner-call-to-action">Reserve a table</Link>
    </section>
  );
}
