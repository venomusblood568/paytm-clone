import "./App.css";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Send from "./pages/send";
import Dashboard from "./pages/dashboard";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/signin"} element={<Signin />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/send"} element={<Send />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
