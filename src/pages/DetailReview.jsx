import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom"
import { Helmet } from 'react-helmet'
import { Header } from "../components/Header"
import { DleteReviewButton } from "../components/DleteReviewButton"
import { useFetchBook } from "../components/useFetchBook"

export const DetailReview = () => {
  const urlParameters = useParams()
  const [bookData, , isLoading] = useFetchBook(urlParameters)

  if(isLoading) {
    return (
      <>
      <Header />
      <main>
      <p className='text-center'>Loading...</p>
      </main>
      </>
    )
  }

  return (
    <>
    <Helmet>
    <title>詳細画面：{bookData.title}</title>
    <meta name="description" content={bookData.title+'のレビュー詳細'} />
    </Helmet>
    <Header />
    <main>
      <h2 className='page-title'>書籍タイトル：{bookData.title}</h2>
      <p>URL:{bookData.url}</p>
      <p>{bookData.detail}</p>
      <p>レビュー：{bookData.review}</p>
      <p>レビュワー：{bookData.reviewer}</p>
      
      {bookData.isMine && 
        <div className='flex items-center mt-10 justify-center'>
        <p><Link to={'/edit/'+ bookData.id} className='btn'>編集</Link></p>
        <p><DleteReviewButton bookData={bookData} /></p>
        </div>
      }
    </main>
    </>
  );
};

export default DetailReview;
