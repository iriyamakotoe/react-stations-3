import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useForm } from "react-hook-form"
import { useRecoilState } from 'recoil'
import { tokenAtom } from "../store/atom"
import { Header } from "../components/Header";
import { InputFileItem } from "../components/InputFileItem"
import "./profile.scss";

export const Profile = () => {
  const [cookies, setCookie, ] = useCookies()
  const [token, setToken] = useRecoilState(tokenAtom)
  const defaultValues = {
      name: cookies.name,
      email: cookies.email,
      password: cookies.password
  }
  const {
      register,
      handleSubmit,
      formState: { isDirty, isValid, errors },
      } = useForm({ mode: "onChange",
      defaultValues,
  });

  const [errorMessage, setErrorMessage] = useState('')
  // const [successMessage, setSuccessMessage] = useState('')

  const onSubmit = (inputData) => {
    setErrorMessage('')
    // setSuccessMessage('')
    const data = { ...inputData, icon: {} }
    fetch('https://railway.bookreview.techtrain.dev/users', {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.token}`
      },
      body: JSON.stringify(data)
    })
    .then((res) => {
      if (res.ok) return res.json()
        else
        setErrorMessage(`エラーが発生しました：${res.status}`)
    })
    .then(json => {
      setCookie('name', json.name)
      setToken(cookies.token)
      // setSuccessMessage(`変更が完了しました`)
    })
  }
  return (
    <>
    <Header />
    <main>
      <h2 className='page-title'>ユーザー情報編集</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate="novalidate">
        <p id="icon" className='mb-10 text-center'><img src={cookies.iconUrl} alt="ユーザーアイコン" /></p>

        <p className='mb-10'><label htmlFor="name">お名前：</label>
        <input type="text" 
        {...register("name", {
          required: 'お名前は必須です'
        })} defaultValue={defaultValues?.name} /><br />
        <span className="error">{errors.name?.message}</span></p>

        <p className='mb-10'><label htmlFor="email">メールアドレス：</label>
        <input type="email" 
        {...register("email", { 
          required: 'メールアドレスは必須です',
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/i,
            message: 'メールアドレスの形式が不正です'
          }
        })} defaultValue={defaultValues?.email} disabled /><span className='text-gray text-s mt-3 inline-block'>&nbsp;※変更不可</span><br />
        <span className="error">{errors.email?.message}</span></p>

        <p className='mb-10'><label htmlFor="password">パスワード：</label>
        <input type="password" 
        {...register("password", {
          required: 'パスワードは必須です',
          pattern: {
            value: /^[a-zA-Z0-9]{6,12}$/i,
            message: '半角英数字、6〜12文字で入力してください'
          }
        })} defaultValue={defaultValues?.password} disabled /><span className='text-gray text-s mt-3 inline-block'>&nbsp;※変更不可</span><br />
        <span className="error">{errors.password?.message}</span></p>

        <InputFileItem errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
        
        <p className='flex justify-center mt-10'><button type="submit">送信</button></p>
        <p className="error form-error mt-5 text-center">{errorMessage}</p>
        {/* <p className="text-gray mt-5 text-center">{successMessage}</p> */}
      </form>
      </main>
    </>
  );
};

export default Profile;
