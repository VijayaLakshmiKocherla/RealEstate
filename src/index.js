import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Seller from "./components/Seller"

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import InvalidUser from "./components/invalid-user";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App/>}></Route>
      <Route path="/seller" element={<Seller/>}></Route>
      <Route path="/invalidUser" element={<InvalidUser/>}></Route>
    </Routes>
  </Router>
);
