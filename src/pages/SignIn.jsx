import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useForm } from "react-hook-form"
import "./signin.scss";

export const SignIn = () => {
  const navigate = useNavigate()
  const [cookies, setCookie, ] = useCookies()
  console.log(cookies)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = (data) => {
    setErrorMessage('')
    const requestOptions = {
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    };
    fetch('https://railway.bookreview.techtrain.dev/signin',requestOptions)
    .then((res) => {
      if (res.ok) return res.json()
      else
        res.status == '403' 
        ? setErrorMessage('パスワードが正しくありません。') 
        : setErrorMessage(`ログインに失敗しました：${res.status}`)
    })
    .then(json => {
      setCookie('token', json.token)
      navigate('/')
    })
  }

  // if (cookies.token) return <Navigate to="/" />

  return (
    <>
    <main>
      <h2 className='page-title'>ログイン</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate="novalidate">
        <p className='mb-10'>
          <label htmlFor="email" aria-label="email">メールアドレス：</label>
          <input type="email" id="email" 
        {...register("email", { 
          required: 'メールアドレスは必須です',
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/i,
            message: 'メールアドレスの形式が不正です'
          }
        })} /><br />
          <span className="error email-error">{errors.email?.message}</span>
        </p>
        <p className='mb-10'>
          <label htmlFor="password" aria-label="password">パスワード：</label>
          <input type="password" id="password" 
        {...register("password", {
          required: 'パスワードは必須です',
          pattern: {
            value: /^[a-zA-Z0-9]{6,12}$/i,
            message: '半角英数字、6〜12文字で入力してください'
          }
        })} /><br />
          <span className="error password-error">{errors.password?.message}</span>
        </p>
        
        <p className='flex justify-center'>
          <button type="submit" aria-label='ログイン'>ログイン</button>
        </p>
        <p className="error form-error mt-5 text-center">{errorMessage}</p>
      </form>
    </main>
    </>
  );
};

export default SignIn;
