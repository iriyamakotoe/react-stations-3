import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useForm } from "react-hook-form"
import { useRecoilState } from 'recoil'
import { iconAtom } from "../store/atom"
import { Header } from "../components/Header";
import { InputItem } from "../components/InputItem"
import { InputFileItem } from "../components/InputFileItem"
import "./profile.scss";

export const Profile = () => {
  const navigate = useNavigate()
  const [cookies, setCookie, ] = useCookies()
  const [iconToken, setIconToken ] = useRecoilState(iconAtom)
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
      setIconToken(cookies.token)
      navigate('/profile')
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

        <p className='mt-10'>メールアドレス：{cookies.email}</p>

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
