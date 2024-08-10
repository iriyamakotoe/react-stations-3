import React, { useState,useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom";
import { Header } from "../components/Header"
import { InputItem } from "../components/InputItem"
import { DleteReviewButton } from "../components/DleteReviewButton"

export const EditReview = () => {
  const [cookies, , ] = useCookies()
  const [bookData, setBookData] = useState({});
  const urlParameters = useParams();

  const fetchBooks = () => {
    fetch('https://railway.bookreview.techtrain.dev/books/'+ urlParameters.id, {
      headers: {
        'Authorization': `Bearer ${cookies.token}`
      }
    })
    .then(res => res.json())
    .then(json => {
      console.log(json)
      setBookData(json)
    })
    .catch(() => {
      console.log('error')
    });
  }

  useEffect(() => {
    fetchBooks()
  },[])
  

  const defaultValues = {
    title: bookData.title,
    url: bookData.url,
    detail: bookData.detail,
    review: bookData.review
  }

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
    } = useForm({ mode: "all",
    defaultValues,
  });

  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = (data) => {
    console.log(data)
    setErrorMessage('')
    fetch('https://railway.bookreview.techtrain.dev/books/'+ urlParameters.id, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.token}`
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        setErrorMessage(`エラーが発生しました：${res.status}`)
      }
    })
    .then(json => {
      console.log(json)
      setBookData(json)
    })
    .catch(() => {
      console.log('error')
    });
  }

  return (
    <>
    <Header />
    <main>
      <h2 className='page-title'>書籍レビュー編集</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate="novalidate">
        <InputItem 
        register={register} 
        type='text' 
        id='title' 
        label='書籍タイトル' 
        pattern={{}} 
        errors={errors.title} 
        defaultValues={defaultValues.title}
        disabled={false} />

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
        defaultValues={defaultValues.url}
        disabled={false} />

        <InputItem 
        register={register} 
        type='text' 
        id='detail' 
        label='書籍詳細' 
        pattern={{}} 
        errors={errors.detail} 
        defaultValues={defaultValues.detail}
        disabled={false} />

        <InputItem 
        register={register} 
        type='text' 
        id='review' 
        label='レビュー' 
        pattern={{}} 
        errors={errors.review} 
        defaultValues={defaultValues.review}
        disabled={false} />
        
        <p className='flex justify-center mt-10'><button type="submit">更新</button></p>
        <p className="error form-error mt-5 text-center">{errorMessage}</p>
        {/* <p className="text-gray mt-5 text-center">{successMessage}</p> */}
      </form>

      <DleteReviewButton bookData={bookData} />
    </main>
    </>
  );
};

export default EditReview;
