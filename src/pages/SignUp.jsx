import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useForm } from "react-hook-form";
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

  const onSubmit = (formData) => {
    setErrorMessage('')
    const data = { ...formData, icon: {} }
    // console.log(formData,data)

    fetch('https://railway.bookreview.techtrain.dev/users', {
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then((res) => {
      if(res.status == '200') {
        return res.json()
      } else if(res.status == '400') {
        setErrorMessage(`バリデーションエラー`)
      } else if(res.status == '401') {
        setErrorMessage(`認証エラー`)
      } else if(res.status == '409') {
        setErrorMessage(`このメールアドレスは既に登録されています`)
      } else if(res.status == '500') {
        setErrorMessage(`サーバでエラーが発生しました。`)
      } else if(res.status == '503') {
        setErrorMessage(`現在サービスを利用できません。Herokuのコールドスタートの影響の可能性もあります。もう一度お試しいただくか、1日経っても改善しない場合は、管理者にお問い合わせください。`)
      }
    })
    .then(json => {
      setCookie('token', json.token)
      uploadIcon(formData)
    })
  }

  // 画像をアップロードする
  const uploadIcon = (formData) =>  {
    const data = new FormData();
    data.append('icon', formData.icon.item(0))

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
        setErrorMessage(`画像登録に失敗しました。${res.status}`)
      }
    })
  }

  // if (cookies.token) return <Navigate to="/" />

  return (
    <>
    <main>
      <h2 className='page-title'>新規ユーザー登録</h2>
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

        <p><label htmlFor="icon">ユーザーアイコン：</label>
        <input type="file" 
        {...register("icon")} /><br /><br />
        <span>※jpg, png、ファイルサイズは1MB以下</span><br />
        <span className="error">{errors.icon?.message}</span></p>
        
        <p className='flex justify-center'><button type="submit">送信</button></p>
        <p className="error form-error mt-5 text-center">{errorMessage}</p>
      </form>
      </main>
    </>
  );
};

export default SignUp;
