import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import "./login.scss";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = (data) => {
    console.log(data)
    const requestOptions = {
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    };
    fetch('https://railway.bookreview.techtrain.dev/signin',requestOptions)
    .then((response) => {
      if(response.ok) {
        navigate('/')
      } else {
        setErrorMessage(`ログインに失敗しました。${response.status}`)
      }
    })
  }

  return (
    <>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p><label htmlFor="email">メールアドレス：</label><input type="email" 
        {...register("email", { 
          required: 'メールアドレスは必須です',
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/i,
            message: 'メールアドレスの形式が不正です'
          }
        })} /><br />
        <span className="error-message">{errors.email?.message}</span></p>
        <p><label htmlFor="password">パスワード：</label><input type="password" 
        {...register("password", {
          required: 'パスワードは必須です',
          pattern: {
            value: /^[a-zA-Z0-9]{6,12}$/i,
            message: 'パスワードの形式が不正です'
          }
        })} /><br />
        <span>半角英数字、6〜12文字以下で設定してください</span><br />
        <span className="error-message">{errors.password?.message}</span></p>
        
        <input type="submit" />
        <p className="error-message">{errorMessage}</p>
      </form>
    </>
  );
};

export default Login;
