import React from 'react'
import { Helmet } from 'react-helmet'
import { Header } from "../components/Header";
import { ReviewList } from "../components/ReviewList"
import { Pagenation } from "../components/Pagenation"
import { NewReviewButton } from "../components/NewReviewButton";
import "./home.scss";

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>書籍レビュー</title>
        <meta name="description" content='書籍レビューアプリ概要' />
      </Helmet>
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