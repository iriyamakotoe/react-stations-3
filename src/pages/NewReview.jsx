import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useForm } from "react-hook-form"
import { Header } from "../components/Header"
import "./newreview.scss";

export const NewReview = () => {
  const [cookies, , ] = useCookies()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState(false)

  const onSubmit = (data) => {
    setErrorMessage('')
    fetch('https://railway.bookreview.techtrain.dev/books', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.token}`
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) 
        setSuccessMessage(true)
      else
        setErrorMessage(`エラーが発生しました：${res.status}`)
    })
  }

  return (
    <>
    <Header />
    <main>
      <h2 className='page-title'>書籍レビュー登録</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate="novalidate">
        <p className='mb-10'><label htmlFor="title">書籍タイトル：</label>
        <input type="text" 
        {...register("title", {
          required: '必須です'
        })} /><br />
        <span className="error">{errors.title?.message}</span></p>

        <p className='mb-10'><label htmlFor="url">URL：</label>
        <input type="text" 
        {...register("url", {
          required: '必須です'
        })} /><br />
        <span className="error">{errors.url?.message}</span></p>

        <p className='mb-10'><label htmlFor="detail">内容：</label>
        <textarea rows="5" cols="33"
        {...register("detail", {
          required: '必須です'
        })} /><br />
        <span className="error">{errors.detail?.message}</span></p>

        <p className='mb-10'><label htmlFor="review">レビュー：</label>
        <textarea rows="5" cols="33"
        {...register("review", {
          required: '必須です'
        })} /><br />
        <span className="error">{errors.review?.message}</span></p>

        <p className='flex justify-center mt-10'><button type="submit">送信</button></p>
        <p className="error form-error mt-5 text-center">{errorMessage}</p>

        {successMessage && (<p className='success bg-orange-50 text-orange-600 mb-10 p-3'>登録しました！</p>)}
      </form>
      </main>
    </>
  );
};

export default NewReview;
