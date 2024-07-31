import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useCookies } from 'react-cookie'
import { Header } from "../components/Header";
import { Home } from "../pages/Home";
import { SignUp } from "../pages/SignUp";
import { Login } from "../pages/Login";
import { Profile } from "../pages/Profile";
import { Icon } from "../pages/Icon";

export const Router = () => {
  const [cookies, , ] = useCookies()
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path={`/`} element={<Home />} />
        <Route exact path={`/signup`} element={<SignUp />} />
        <Route exact path={`/login`} element={<Login />} />
        <Route exact path={`/profile`} element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};
