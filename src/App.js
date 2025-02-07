import React, { useContext, useState } from "react";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
//👇🏻 components
import PilihSchedule from "./components/PilihSchedule";

//👇🏻 React-Toastify configuration
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<PilihSchedule />} />
          </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;