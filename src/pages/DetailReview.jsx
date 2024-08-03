import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useParams } from "react-router-dom";
import { Header } from "../components/Header"
import { DleteReviewButton } from "../components/DleteReviewButton"
import { fetchBooks } from "../fetchBooks.jsx"

export const DetailReview = () => {
  const [cookies, , ] = useCookies()
  const [bookData, setBookData] = useState({});
  const [isLoading, setIsLoading] = useState('false');
  const urlParameters = useParams();

  const fetchBooks = () => {
    setIsLoading(true)
    fetch('https://railway.bookreview.techtrain.dev/books/'+ urlParameters.id, {
      headers: {
        'Authorization': `Bearer ${cookies.token}`
      }
    })
    .then(res => res.json())
    .then(json => {
      console.log(json)
      setBookData(json)
      setIsLoading(false);
    })
    .catch(() => {
      console.log('error')
      setIsLoading(false);
    });
  }

  useEffect(() => {
    fetchBooks()
  },[])

  return (
    <>
    <Header />
    <main className={isLoading ? 'loading' : ''}>
      <h2 className='page-title'>書籍タイトル：{bookData.title}</h2>
      <p>URL:{bookData.url}</p>
      <p>{bookData.detail}</p>
      <p>レビュワー：{bookData.review}</p>
      
      {bookData.isMine && 
        <div className='flex items-center'>
        <p><Link to={'/edit/'+ bookData.id}>編集</Link></p>
        <p><DleteReviewButton bookData={bookData} /></p>
        </div>
      }
    </main>
    </>
  );
};

export default DetailReview;
