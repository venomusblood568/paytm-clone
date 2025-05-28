import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Dashbaord from "./pages/dashboard";
import Send from "./pages/send";
function App() {
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path={"/signup"} element={<Signup/>}/>
        <Route path={"/signin"} element={<Signin/>}/>
        <Route path={"/dashboard"} element={<Dashbaord/>}/>
        <Route path={"/send"} element={<Send/>}/>
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App;
