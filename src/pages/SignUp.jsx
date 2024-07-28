import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import "./SignUp.scss";

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = (data) => {
    console.log(data)
    const requestOptions = {
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    };
    fetch('https://railway.bookreview.techtrain.dev/users',requestOptions)
    .then((response) => {
      if(response.ok) {
        console.log('ユーザー登録に成功しました！');
      } else {
        setErrorMessage(`ユーザー登録に失敗しました。${response.status}`)
      }
    })
  }

  return (
    <>
      <h1>ユーザー新規登録画面</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p><label htmlFor="name">お名前：</label><input type="text" 
        {...register("name", {
          required: 'お名前は必須です'
        })} /><br />
        <span className="error">{errors.name?.message}</span></p>
        <p><label htmlFor="email">メールアドレス：</label><input type="email" 
        {...register("email", { 
          required: 'メールアドレスは必須です',
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/i,
            message: 'メールアドレスの形式が不正です'
          }
        })} /><br />
        <span className="error">{errors.email?.message}</span></p>
        <p><label htmlFor="password">パスワード：</label><input type="password" 
        {...register("password", {
          required: 'パスワードは必須です',
          pattern: {
            value: /^[a-zA-Z0-9]{6,12}$/i,
            message: 'パスワードの形式が不正です'
          }
        })} /><br />
        <span>半角英数字、6〜12文字以下で設定してください</span><br />
        <span className="error">{errors.password?.message}</span></p>
        
        <input type="submit" />
        <p className="error-message">{errorMessage}</p>
      </form>
    </>
  );
};

export default SignUp;
