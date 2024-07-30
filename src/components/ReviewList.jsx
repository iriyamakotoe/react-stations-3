import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { reviewAtom, counterAtom } from "../store/atom";
import "./reviewlist.scss";

export const ReviewList = () => {
  const [review, setReview] = useRecoilState(reviewAtom)
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
      <ul className="review-list">
      {review.map((obj) => <li key={obj.id} className=''>{obj.title}</li>)}
      </ul>
    </>
  );
};

export default ReviewList;