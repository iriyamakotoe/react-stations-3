import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useForm } from "react-hook-form"
import { useRecoilState } from 'recoil'
import { tokenAtom } from "../store/atom"
import { Header } from "../components/Header"
import { InputFileItem } from "../components/InputFileItem"
import "./newreview.scss";

export const NewReview = () => {
  const [cookies, setCookie, ] = useCookies()
  const [token, setToken] = useRecoilState(tokenAtom)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = (inputData) => {
    setErrorMessage('')
    const data = { ...inputData }
    fetch('https://railway.bookreview.techtrain.dev/books', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.token}`
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) return res.json()
        else
        setErrorMessage(`エラーが発生しました：${res.status}`)
    })
    .then(json => {
        console.log('成功しました',json)
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
          required: '書籍タイトルは必須です'
        })} /><br />
        <span className="error">{errors.title?.message}</span></p>

        <p className='mb-10'><label htmlFor="url">URL：</label>
        <input type="text" 
        {...register("url")} /><br />
        <span className="error">{errors.url?.message}</span></p>

        <p className='mb-10'><label htmlFor="detail">内容：</label>
        <input type="detail" 
        {...register("detail", {
          required: '必須です'
        })} /><br />
        <span className="error">{errors.detail?.message}</span></p>

        <p className='mb-10'><label htmlFor="review">レビュワー：</label>
        <input type="text" 
        {...register("review", {
          required: '必須です'
        })} /><br />
        <span className="error">{errors.review?.message}</span></p>

        <p className='flex justify-center mt-10'><button type="submit">送信</button></p>
        <p className="error form-error mt-5 text-center">{errorMessage}</p>
      </form>
      </main>
    </>
  );
};

export default NewReview;
