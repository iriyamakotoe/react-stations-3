import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useCookies } from 'react-cookie'
import { Header } from "../components/Header";
import { Home } from "../pages/Home";
import { SignUp } from "../pages/SignUp";
import { SignIn } from "../pages/SignIn";
import { Icon } from "../pages/Icon";

export const Router = () => {
  const [cookies, , ] = useCookies()
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path={`/`} element={<Home />} />
        <Route exact path={`/signup`} element={<SignUp />} />
        <Route exact path={`/login`} element={<SignIn />} />
        <Route exact path={`/icon`} element={<Icon />} />
      </Routes>
    </BrowserRouter>
  );
};
