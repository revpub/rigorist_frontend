import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Auth from "./components/auth/Auth";
import App from "./App";
import Home from "./pages/Home";
import MyAccount from "./pages/MyAccount";
import ProtectedRoute from "./components/util/ProtectedRoute";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={"/"}>
      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/myAccount" element={<MyAccount />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
