import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import "./signup.scss";

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = (data) => {
    console.log(data)
    setErrorMessage('')
    // const data_icon = data.icon // フォームのデータからアイコンを取得
    // delete data.icon // フォームのデータからアイコンを削除
    // console.log(data,data_icon)

    fetch('https://railway.bookreview.techtrain.dev/users', {
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then((res) => {
      if(res.ok) {
        // 画像をアップロードする
        // uploadIcon(data_icon)
        console.log('ユーザー登録に成功しました！');
        navigate('/login')
      } else {
        setErrorMessage(`ユーザー登録に失敗しました。${res.status}`)
      }
    })
  }

  // 画像をアップロードする
  // const uploadIcon = (data) =>  {
  //   fetch('https://railway.bookreview.techtrain.dev/uploads', {
  //     method: 'POST',
  //     headers:{
  //       'accept': 'application/json',
  //       'Content-Type': 'multipart/form-data',
  //       'Authorization': ''
  //     },
  //     body: data
  //   })
  //   .then((res) => {
  //     if(!res.ok) {
  //       setErrorMessage(`画像登録に失敗しました。${res.status}`)
  //       return false
  //     }
  //   })
  // }

  return (
    <>
    <main>
      <h2 className='page-title'>ユーザー新規登録画面</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate="novalidate">
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
            message: '半角英数字、6〜12文字で入力してください'
          }
        })} /><br />
        <span>※パスワードは半角英数字、6〜12文字で入力してください。</span><br />
        <span className="error">{errors.password?.message}</span></p>

        {/* <p><label htmlFor="icon">ユーザーアイコン：</label><input type="file" 
        {...register("icon")} /><br /><br />
        <span>jpg, pngファイルサイズは1MB以下</span><br />
        <span className="error">{errors.icon?.message}</span></p> */}
        

        <input type="submit" />
        <p className="error">{errorMessage}</p>
      </form>
      </main>
    </>
  );
};

export default SignUp;
