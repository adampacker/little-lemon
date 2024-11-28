import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router";
import HomePage from "./components/pages/HomePage";
import BookingPage from "./components/pages/BookingPage";
import ConfirmedBookingPage from "./components/pages/ConfirmedBookingPage";

function App() {
  return (
    <div className="container">
      <header>
        <img
          className="logo"
          src={process.env.PUBLIC_URL + '/little-lemon-restaurant.png'}
          alt="Little Lemon Restaurant"
        />
        <nav className="main-navigation">
          <ul className="menu">
            <li className="menu-item">
              <Link to="/">Home</Link>
            </li>
            <li className="menu-item">
              <Link to="/reservation">Reserve a table</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="reservation" element={<BookingPage />} />
          <Route
            path="reservation/confirmed"
            element={<ConfirmedBookingPage />}
          />
        </Routes>
      </main>
      <footer>
        <span className="quote">
          <em>"When life gives you lemons, make lemonade"</em>
        </span>
        <span className="copyright">
          &copy; Little Lemon Restaurant Company 2024
        </span>
      </footer>
    </div>
  );
}

export default App;
