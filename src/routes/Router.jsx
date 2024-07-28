import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { SignUp } from "../pages/SignUp";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={`/signup`} element={<SignUp />} />
        <Route exact path={`/`} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
