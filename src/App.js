import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router";
import HomePage from "./components/pages/HomePage";
import BookingPage from "./components/pages/BookingPage";
import ConfirmedBookingPage from "./components/pages/ConfirmedBookingPage";

function App() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/reservation">Reserve</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="reservation" element={<BookingPage />} />
          <Route path="reservation/confirmed" element={<ConfirmedBookingPage />} />
        </Routes>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
