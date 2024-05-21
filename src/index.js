import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MoviesList from "./components/MoviesList";
import LoginPage from "../src/pages/LoginPage";
import SignupPage from "../src/pages/SignupPage";
import ProtectedPage from "../src/pages/ProtectedPage";
import { AuthProvider, useAuth } from "./AuthContext"; // Import the AuthProvider and useAuth
import Movie from "./pages/movieDetail/movie";
import Header from "./components/Header";
import MovieList from "./components/MoviesList"; // Import MovieList only once

// Define ProtectedRoute and HomeRoute components
const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <ProtectedPage /> : <Navigate to="/login" replace />;
};

const HomeRoute = () => {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);

  return isLoggedIn ? <App /> : <Navigate to="/login" replace />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      {/* Wrap your app with AuthProvider */}
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/movies" element={<MoviesList />} />
          <Route path="/protected" element={<ProtectedRoute />} />
          <Route
            path="/movies/:type"
            element={
              <>
                <Header /> <MovieList />
              </>
            }
          />
          <Route path="/movie/:id" element={<Movie />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
