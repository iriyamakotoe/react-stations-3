import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useRecoilState } from 'recoil'
import { reviewAtom, counterAtom } from "../store/atom";
import "./reviewlist.scss";

export const ReviewList = () => {
  const [cookies, setCookie, ] = useCookies()
  const [review, setReview] = useRecoilState(reviewAtom)
  const [counter, ] = useRecoilState(counterAtom)

  const fetchReview = () => {
    console.log(counter)
    var request
    if (cookies.token) {
      request = new Request('https://railway.bookreview.techtrain.dev/public/books?offset=' + (counter*10), {
      });
    } else {
      request = new Request('https://railway.bookreview.techtrain.dev/books?offset=' + (counter*10), {
        headers: {
          'Authorization': `Bearer ${cookies.token}`
          }
      });
    }
    fetch(request)
    .then(res => res.json())
    .then(json => {
      setReview(json)
    })
  }
  useEffect(() => {
    fetchReview()
  }, [counter])

  return (
    <>
      <ul className="review-list">
      {review.map((obj) => <li key={obj.id} className=''><Link to={'/books/' + obj.id}>{obj.title}</Link></li>)}
      </ul>
    </>
  );
};

export default ReviewList;