import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useForm } from "react-hook-form"
import { useRecoilState } from 'recoil'
import { iconAtom } from "../store/atom"
import { Header } from "../components/Header"
import { InputItem } from "../components/InputItem"
import { InputFileItem } from "../components/InputFileItem"
import "./signup.scss";

export const SignUp = () => {
  const [cookies, setCookie, ] = useCookies()
  const [iconToken, setIconToken ] = useRecoilState(iconAtom)
  const defaultValues = {
    name: '',
    email: '',
    password: ''
}
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all",
    defaultValues,
   });

  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = (data) => {
    setErrorMessage('')
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
      setCookie('token', json.token)
      console.log(json.token)
      setCookie('email', data.email)
      setCookie('password', data.password)
      setIconToken(json.token)
    })
  }

  if (cookies.token) return <Navigate to="/" />

  return (
    <>
    <Header />
    <main>
      <h2 className='page-title'>新規ユーザー登録</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate="novalidate">

      <InputItem 
        register={register} 
        type='text' 
        id='name' 
        label='お名前' 
        pattern={{}} 
        errors={errors.name} 
        defaultValue={defaultValues.name}
        disabled={false} />

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
        defaultValue={defaultValues.email}
        disabled={false} />
        
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
        defaultValue={defaultValues.password}
        disabled={false} />
        <p><span className='text-gray text-s mt-3 inline-block'>※パスワードは半角英数字、6〜12文字で入力してください。</span></p>

        <InputFileItem errorMessage={errorMessage} setErrorMessage={setErrorMessage} />

        <p className='flex justify-center mt-10'><button type="submit">登録</button></p>
        <p className="error form-error mt-5 text-center">{errorMessage}</p>
      </form>
      </main>
    </>
  );
};

export default SignUp;
