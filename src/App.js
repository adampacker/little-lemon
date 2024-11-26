import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router";
import HomePage from "./components/routes/HomePage";
import BookingPage from "./components/routes/BookingPage";

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
              <Link to="/reserve">Reserve</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="reserve" element={<BookingPage />} />
        </Routes>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
