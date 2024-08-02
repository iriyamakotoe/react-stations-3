import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { Header } from "../components/Header";
import { ReviewList } from "../components/ReviewList"
import { Pagenation } from "../components/Pagenation";
import "./home.scss";

export const Home = () => {
  const [cookies, setCookie,  ] = useCookies()
  const isSignIn = () => {
    // console.log('isSignIn')
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
  useEffect(() => {
    if(cookies.token) return isSignIn()
  }, [])

  return (
    <>
      <Header />
      <main>
      <h2 className="page-title">レビュー一覧</h2>
      <ReviewList />
      <Pagenation />

      {cookies.token ? (
        <p className='text-center'><Link to="/new" className='inline-block bg-orange text-white p-5 rounded'>レビュー作成</Link></p>
      ) : (
        <p className='text-center'><Link to="/login" className='inline-block bg-orange text-white p-5 rounded'>ログインしてレビュー作成</Link></p>
      )} 
      
      </main>
    </>
  );
};

export default Home;