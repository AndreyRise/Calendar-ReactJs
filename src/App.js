import React from "react";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import {BrowserRouter,Routes,Route,Link} from "react-router-dom"

function App() {
  return (
    <BrowserRouter basename="https://andreyrise.github.io/Calendar-ReactJs/">
      <Routes>
        <Route exact path='/' element={< Home />}></Route>
        <Route exact path='/calendar' element={< Calendar />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
