import React, { useState } from 'react'
import { useForm } from "react-hook-form";

import "./login.scss";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = (data) => {
    console.log(data)
    const requestOptions = {
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    };
    fetch('https://railway.bookreview.techtrain.dev/signin',requestOptions)
    .then((res) => {
      console.log(res.status)
      if(res.status == '200') {
        console.log('ログインしました')
      } else if(res.status == '400') {
        setErrorMessage(`バリデーションエラー`)
      } else if(res.status == '401') {
        setErrorMessage(`認証エラー`)
      } else if(res.status == '403') {
        setErrorMessage(`パスワードが正しくありません。`)
      } else if(res.status == '500') {
        setErrorMessage(`サーバでエラーが発生しました。`)
      } else if(res.status == '503') {
        setErrorMessage(`現在サービスを利用できません。Herokuのコールドスタートの影響の可能性もあります。もう一度お試しいただくか、1日経っても改善しない場合は、管理者にお問い合わせください。`)
      }
    })
  }

  return (
    <>
    <main>
      <h2 className='page-title'>ログイン</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate="novalidate">
        <p className='mb-10'><label htmlFor="email" aria-label="email">メールアドレス：</label><input type="email" id="email" 
        {...register("email", { 
          required: 'メールアドレスは必須です',
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/i,
            message: 'メールアドレスの形式が不正です'
          }
        })} /><br />
        <span className="error email-error">{errors.email?.message}</span></p>
        <p className='mb-10'><label htmlFor="password" aria-label="password">パスワード：</label><input type="password" id="password" 
        {...register("password", {
          required: 'パスワードは必須です',
          pattern: {
            value: /^[a-zA-Z0-9]{6,12}$/i,
            message: '半角英数字、6〜12文字で入力してください'
          }
        })} /><br />
        <span className="error password-error">{errors.password?.message}</span></p>
        
        <p className='flex justify-center'><button type="submit" aria-label='ログイン'>ログイン</button></p>
        <p className="error form-error">{errorMessage}</p>
      </form>
    </main>
    </>
  );
};

export default Login;
