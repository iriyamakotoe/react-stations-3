import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useForm } from "react-hook-form"
import { useRecoilState } from 'recoil'
import { tokenAtom } from "../store/atom"
import { Header } from "../components/Header"
import { InputFileItem } from "../components/InputFileItem"
import "./signup.scss";

export const SignUp = () => {
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
    const data = { ...inputData, icon: {} }
    fetch('https://railway.bookreview.techtrain.dev/users', {
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) return res.json()
        else
          res.status == '409' 
          ? setErrorMessage('このメールアドレスは既に登録されています') 
          : setErrorMessage(`エラーが発生しました：${res.status}`)
    })
    .then(json => {
      setCookie('email', data.email)
      setCookie('password', data.password)
      setToken(json.token)
    })
  }

  if (cookies.token) return <Navigate to="/" />

  return (
    <>
    <Header />
    <main>
      <h2 className='page-title'>新規ユーザー登録画面</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate="novalidate">
        <p className='mb-10'><label htmlFor="name">お名前：</label>
        <input type="text" 
        {...register("name", {
          required: 'お名前は必須です'
        })} /><br />
        <span className="error">{errors.name?.message}</span></p>

        <p className='mb-10'><label htmlFor="email">メールアドレス：</label>
        <input type="email" 
        {...register("email", { 
          required: 'メールアドレスは必須です',
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/i,
            message: 'メールアドレスの形式が不正です'
          }
        })} /><br />
        <span className="error">{errors.email?.message}</span></p>

        <p className='mb-10'><label htmlFor="password">パスワード：</label>
        <input type="password" 
        {...register("password", {
          required: 'パスワードは必須です',
          pattern: {
            value: /^[a-zA-Z0-9]{6,12}$/i,
            message: '半角英数字、6〜12文字で入力してください'
          }
        })} /><br />
        <span className='text-gray text-s mt-3 inline-block'>※パスワードは半角英数字、6〜12文字で入力してください。</span><br />
        <span className="error">{errors.password?.message}</span></p>

        <InputFileItem />

        <p className='flex justify-center mt-10'><button type="submit">送信</button></p>
        <p className="error form-error mt-5 text-center">{errorMessage}</p>
      </form>
      </main>
    </>
  );
};

export default SignUp;
