import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { counterAtom } from "../store/atom";
import { Header } from "../components/Header";
import { ReviewList } from "../components/ReviewList";
import { PageControl } from "../components/PageControl";
import "./home.scss";

export const Home = () => {
  const [review, setReview] = useState([])
  const [counter, setCounter] = useRecoilState(counterAtom)

  const fetchReview = () => {
    console.log(counter)
    fetch('https://railway.bookreview.techtrain.dev/public/books?offset=' + (counter*10))
    .then(res => res.json())
    .then(data => {
      setReview(data)
    })
  }
  useEffect(() => {
    fetchReview()
  }, [counter])

  const handlePagePrev = () => {
    setCounter((c) => c - 1)
  }
  const handlePageNext = () => {
      setCounter((c) => c + 1)
  }

  return (
    <>
      <Header />
      <main>
      <h1>レビュー一覧</h1>
      <ReviewList review={review} />
      <PageControl handlePagePrev={() => handlePagePrev()} handlePageNext={() => handlePageNext()} />
      </main>
    </>
  );
};

export default Home;