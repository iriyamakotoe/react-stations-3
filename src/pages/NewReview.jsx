import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useForm } from "react-hook-form"
import { Header } from "../components/Header"
import { InputItem } from "../components/InputItem"
import { TextAreaItem } from "../components/TextAreaItem"
import "./newreview.scss";

export const NewReview = () => {
  const [cookies, , ] = useCookies()

  const defaultValues = {
    title: '',
    url: '',
    detail: '',
    review: ''
  }
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
      if (res.ok) {
        setSuccessMessage(true)
        setTimeout(() => {
          setSuccessMessage(false)
        }, "3000")
      } else {
        setErrorMessage(`エラーが発生しました：${res.status}`)
      }
    })
  }

  return (
    <>
    <Header />
    <main>
      <h2 className='page-title'>書籍レビュー登録</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate="novalidate">
        <InputItem 
        register={register} 
        type='text' 
        id='title' 
        label='書籍タイトル' 
        pattern={{}} 
        errors={errors.title} 
        defaultValues={defaultValues.title} />

        <InputItem 
        register={register} 
        type='text' 
        id='url' 
        label='URL' 
        pattern={{
          value: /[\w!?/+\-_~=;.,*&@#$%()'[\]]+$/i,
          message: 'URLの形式が不正です'
        }} 
        errors={errors.url} 
        defaultValues={defaultValues.url} />

        <TextAreaItem 
        register={register} 
        type='text' 
        id='detail' 
        label='概要' 
        pattern={{}} 
        errors={errors.detail} 
        defaultValues={defaultValues.detail} />

        <TextAreaItem 
        register={register} 
        type='text' 
        id='review' 
        label='レビュー' 
        pattern={{}} 
        errors={errors.review} 
        defaultValues={defaultValues.review} />

        <p className='flex justify-center mt-10'><button type="submit">送信</button></p>
        <p className="error form-error mt-5 text-center">{errorMessage}</p>

        {successMessage && (<p className='success bg-orange-50 text-orange-600 mb-10 p-3'>登録しました！</p>)}
      </form>
      </main>
    </>
  );
};

export default NewReview;
