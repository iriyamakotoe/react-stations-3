import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Header } from "../components/Header";
import { ReviewList } from "../components/ReviewList"
import { Pagenation } from "../components/Pagenation"
import { CreateReviewButton } from "../components/CreateReviewButton";
import "./home.scss";

export const Home = () => {
  const [cookies, setCookie,  ] = useCookies()
  useEffect(() => {
    if(cookies.token) {
      console.log('isSignIn')
      fetch('https://railway.bookreview.techtrain.dev/users', {
        headers:{
          'Authorization': `Bearer ${cookies.token}`
        }
      })
      .then(res => res.json())
      .then(json => {
        setCookie('name', json.name)
        setCookie('iconUrl', json.iconUrl)
      })
    }
  }, [])

  return (
    <>
      <Header />
      <main>
      <h2 className="page-title">レビュー一覧</h2>
      <ReviewList />
      <Pagenation />
      <CreateReviewButton />
      </main>
    </>
  );
};

export default Home;