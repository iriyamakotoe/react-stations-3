import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useRecoilState } from 'recoil'
import { reviewAtom, counterAtom } from "../store/atom";
import "./reviewlist.scss";

export const ReviewList = () => {
  const [cookies, , ] = useCookies()
  const [review, setReview] = useRecoilState(reviewAtom)
  const [counter, ] = useRecoilState(counterAtom)

  useEffect(() => {
    fetchReview()
  }, [counter])
  
  const fetchReview = () => {
    console.log(counter)
    let request
    if (cookies.token) {
      request = new Request('https://railway.bookreview.techtrain.dev/books?offset=' + (counter*10), {
        headers: {
          'Authorization': `Bearer ${cookies.token}`
          }
      });
    } else {
      request = new Request('https://railway.bookreview.techtrain.dev/public/books?offset=' + (counter*10), {
      });
    }
    fetch(request)
    .then(res => res.json())
    .then(json => {
      setReview(json)
    })
  }

  const handleClick = (selectBookId) => {
    fetch('https://railway.bookreview.techtrain.dev/logs', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.token}`
      },
      body: JSON.stringify({'selectBookId': selectBookId})
    })
    .then((res) => {
      console.log(res)
      if (res.ok) return console.log(`ログ送信成功`)
      else
      console.log(`ログ送信失敗：${res.status}`)
    })
  }

  return (
    <>
      {cookies.token ? (
        <ul className="review-list">
        {review.map((obj) => <li key={obj.id} className=''><Link to={'/detail/' + obj.id} onClick={(e) => handleClick(obj.id)}>{obj.title}</Link></li>)}
        </ul>
      ) : (
        <ul className="review-list">
        {review.map((obj) => <li key={obj.id} className=''>{obj.title}</li>)}
        </ul>
      )}
    </>
  );
};

export default ReviewList;