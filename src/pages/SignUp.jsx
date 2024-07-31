import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useForm } from "react-hook-form";
import Compressor from "compressorjs";
import "./signup.scss";

export const SignUp = () => {
  const navigate = useNavigate()
  const [cookies, setCookie, ] = useCookies()
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
      setCookie('token', json.token)
      uploadIcon(inputData)
    })
  }

  // 画像をアップロードする
  const uploadIcon = (inputData) =>  {
    new Compressor(inputData.iconUrl.item(0), {
      quality: 0.6,
  
      success(result) {
        const data = new FormData();
        data.append('icon', result, result.name )
        fetch('https://railway.bookreview.techtrain.dev/uploads', {
          method: 'POST',
          headers:{
            'Authorization': `Bearer ${cookies.token}`
          },
          body: data
        })
        .then((res) => {
          if(res.ok) {
            navigate('/')
          } else {
            setErrorMessage(`画像登録エラーが発生しました：${res.status}`)
          }
        })
      },
      error(err) {
        console.log(err.message);
      },
    })
  }

  // if (cookies.auth == 'isSignIn') return <Navigate to="/" />

  return (
    <>
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

        <p><label htmlFor="iconUrl">ユーザーアイコン：</label>
        <input type="file" 
        {...register("iconUrl")} accept="image/png, image/jpg" /><br />
        <span className='text-gray text-s mt-3 inline-block'>※登録できる画像：拡張子 - jpg・png、サイズ - 1MB以内</span><br />
        <span className="error">{errors.iconUrl?.message}</span></p>
        
        <p className='flex justify-center mt-10'><button type="submit">送信</button></p>
        <p className="error form-error mt-5 text-center">{errorMessage}</p>
      </form>
      </main>
    </>
  );
};

export default SignUp;
