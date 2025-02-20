import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { useState } from "react";
import RefreshHandler from "./components/RefreshHandler";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return authenticated ? element : <Navigate to="/login" />;
  };
  return (
    <>
      <RefreshHandler setAuthenticated={setAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route
          path="/home"
          element={<PrivateRoute element={<Home />} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
