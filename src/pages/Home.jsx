import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { counterAtom } from "../store/atom";
import { ReviewList } from "../components/ReviewList"
import { Pagenation } from "../components/Pagenation";
import "./home.scss";

export const Home = () => {
  const [review, setReview] = useState([])
  const [counter, ] = useRecoilState(counterAtom)
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

  return (
    <>
      <main>
      <h2 className="page-title">レビュー一覧</h2>
      <ReviewList review={review} />
      <Pagenation />
      </main>
    </>
  );
};

export default Home;