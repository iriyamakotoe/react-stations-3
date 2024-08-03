import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { useCookies } from 'react-cookie'
import { Home } from "../pages/Home";
import { SignUp } from "../pages/SignUp";
import { Login } from "../pages/Login";
import { Profile } from "../pages/Profile";
import { NewReview } from "../pages/NewReview";
import { DetailReview } from "../pages/DetailReview"
import { EditReview } from "../pages/EditReview"

export const Router = () => {
  const [cookies, , ] = useCookies()
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={`/`} element={<Home />} />
        <Route exact path={`/signup`} element={<SignUp />} />
        <Route exact path={`/login`} element={<Login />} />
        <Route exact path={`/profile`} element={cookies.token ? <Profile /> : <Navigate replace to="/login" />} />
        <Route exact path={`/new`} element={cookies.token ? <NewReview /> : <Navigate replace to="/login" />} />
        <Route exact path={`/detail/:id`} element={<DetailReview />} />
        <Route exact path={`/edit/:id`} element={<EditReview />} />
      </Routes>
    </BrowserRouter>
  );
};
