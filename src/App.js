import React from "react";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import {BrowserRouter,Routes,Route,Link} from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='https://github.com/AndreyRise/Calendar-ReactJs.git' element={< Home />}></Route>
        <Route exact path='https://github.com/AndreyRise/Calendar-ReactJs.git/calendar' element={< Calendar />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
