import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

export const DleteReviewButton = (props) => {
  const navigate = useNavigate();
  const [cookies, , ] = useCookies()

  const handleDeleteClick = (selectBookId) => {
    fetch('https://railway.bookreview.techtrain.dev/books/' + selectBookId, {
      method: 'DELETE',
      headers:{
        'Authorization': `Bearer ${cookies.token}`
      }
    })
    .then((res) => {
      if (res.ok) {
        navigate("/")
      }
    })
  }

  return (
    <>
    <button onClick={(e) => handleDeleteClick(props.bookData.id)}>削除</button>
    </>
  );
};

export default DleteReviewButton;
