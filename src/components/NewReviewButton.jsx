import React from 'react'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'

export const NewReviewButton = () => {
  const [cookies, ,  ] = useCookies()
  return (
    <>
      {cookies.token ? (
        <p className='text-center'><Link to="/new" className='inline-block bg-orange-500 text-white p-5 rounded'>レビュー作成</Link></p>
      ) : (
        <p className='text-center'><Link to="/login" className='inline-block bg-orange-500 text-white p-5 rounded'>ログインしてレビュー作成</Link></p>
      )} 
    </>
  );
};

export default NewReviewButton;