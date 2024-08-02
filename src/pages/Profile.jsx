import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useForm } from "react-hook-form"
import { useRecoilState } from 'recoil'
import { tokenAtom } from "../store/atom"
import { Header } from "../components/Header";
import { InputItem } from "../components/InputItem"
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

        <InputItem 
        register={register} 
        type='text' 
        id='name' 
        label='お名前' 
        pattern={{}} 
        errors={errors.name} 
        defaultValues={defaultValues.name}
        disabled={false} />

        <InputItem 
        register={register} 
        type='email' 
        id='email' 
        label='メールアドレス' 
        pattern={{}} 
        errors={errors.email}
        defaultValues={defaultValues.email}
        disabled={true} />
        <p><span className='text-gray text-s mt-3 inline-block'>※変更不可</span></p>
        
        <InputItem 
        register={register} 
        type='password' 
        id='password' 
        label='パスワード' 
        pattern={{}} 
        errors={errors.password}
        defaultValues={defaultValues.password}
        disabled={true} />
        <p><span className='text-gray text-s mt-3 inline-block'>※変更不可</span></p>

        <InputFileItem errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
        
        <p className='flex justify-center mt-10'><button type="submit">登録</button></p>
        <p className="error form-error mt-5 text-center">{errorMessage}</p>
        {/* <p className="text-gray mt-5 text-center">{successMessage}</p> */}
      </form>
      </main>
    </>
  );
};

export default Profile;
