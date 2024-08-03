import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Header } from "../components/Header";
import { ReviewList } from "../components/ReviewList"
import { Pagenation } from "../components/Pagenation"
import { NewReviewButton } from "../components/NewReviewButton";
import "./home.scss";

export const Home = () => {
  return (
    <>
      <Header />
      <main>
        <h2 className="page-title">レビュー一覧</h2>
        <ReviewList />
        <Pagenation />
        <NewReviewButton />
      </main>
    </>
  );
};

export default Home;