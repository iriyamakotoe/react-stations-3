import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useForm } from "react-hook-form"
import { Header } from "../components/Header"
import { InputItem } from "../components/InputItem"
import "./login.scss"

export const Login = () => {
  const [cookies, setCookie, ] = useCookies()
  const defaultValues = {
    email: '',
    password: ''
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = (data) => {
    setErrorMessage('')
    fetch('https://railway.bookreview.techtrain.dev/signin', {
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) return res.json()
      else
        res.status == '403' 
        ? setErrorMessage('パスワードが正しくありません。') 
        : setErrorMessage(`エラーが発生しました：${res.status}`)
    })
    .then(json => {
      setCookie('token', json.token)
    })
  }

  if (cookies.token) return <Navigate to="/" />

  return (
    <>
    <Header />
    <main>
      <h2 className='page-title'>ログイン</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate="novalidate">
        <InputItem 
        register={register} 
        type='email' 
        id='email' 
        label='メールアドレス' 
        pattern={{
          value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/i,
          message: 'メールアドレスの形式が不正です'
        }} 
        errors={errors.email}
        defaultValue={defaultValues.email} />

        <InputItem 
        register={register} 
        type='password' 
        id='password' 
        label='パスワード' 
        pattern={{
          value: /^[a-zA-Z0-9]{6,12}$/i,
          message: '半角英数字、6〜12文字で入力してください'
        }} 
        errors={errors.password}
        defaultValue={defaultValues.password} />
        
        <p className='flex justify-center mt-10'>
          <button type="submit" aria-label='ログイン'>ログイン</button>
        </p>
        <p className="error form-error mt-5 text-center">{errorMessage}</p>
      </form>
    </main>
    </>
  );
};

export default Login;
