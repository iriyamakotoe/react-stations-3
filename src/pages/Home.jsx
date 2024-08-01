import React from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { Header } from "../components/Header";
import { ReviewList } from "../components/ReviewList"
import { Pagenation } from "../components/Pagenation";
import "./home.scss";

export const Home = () => {
  const [cookies, setCookie, removeCookie ] = useCookies()
  return (
    <>
      <Header />
      <main>
      <h2 className="page-title">レビュー一覧</h2>
      <ReviewList />
      <Pagenation />
      {cookies.token ? (
        <p className='text-center'><Link to="/new" className='inline-block bg-orange text-white p-5 rounded'>レビューを投稿する</Link></p>
      ) : (
        <p></p>
      )} 
      </main>
    </>
  );
};

export default Home;