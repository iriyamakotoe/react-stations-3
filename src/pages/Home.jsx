import React from 'react'
import { ReviewList } from "../components/ReviewList"
import { Pagenation } from "../components/Pagenation";
import "./home.scss";

export const Home = () => {
  return (
    <>
      <main>
      <h2 className="page-title">レビュー一覧</h2>
      <ReviewList />
      <Pagenation />
      </main>
    </>
  );
};

export default Home;