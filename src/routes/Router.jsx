import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Home } from "../pages/Home";
import { SignUp } from "../pages/SignUp";
import { Login } from "../pages/Login";
import { Icon } from "../pages/Icon";

export const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path={`/`} element={<Home />} />
        <Route exact path={`/signup`} element={<SignUp />} />
        <Route exact path={`/login`} element={<Login />} />
        <Route exact path={`/icon`} element={<Icon />} />
      </Routes>
    </BrowserRouter>
  );
};
