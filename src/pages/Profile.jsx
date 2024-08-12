import React, { useState, useEffect, useRef } from 'react'
import { useCookies } from 'react-cookie'
import { useForm } from "react-hook-form"
import { useRecoilState } from 'recoil'
import { profileAtom } from "../store/atom"
import { UploadFile } from "../uploadfile.jsx"
import { Header } from "../components/Header";
import { InputItem } from "../components/InputItem"
import iconUser from "../assets/icon_user.png"
import "./profile.scss";

export const Profile = () => {
  const [cookies, , ] = useCookies()
  const inputFileRef = useRef(null)
  const [profile, setProfile ] = useRecoilState(profileAtom)
  const defaultValues = {
    name: profile.name,
  }
  const values = {...defaultValues}
  const {
      register,
      handleSubmit,
      formState: { errors },
      } = useForm({ mode: "all",
      defaultValues,
      values,
  });

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState(false)

  const onSubmit = (data) => {
    setErrorMessage('')
    UploadFile(inputFileRef.current.files[0], cookies.token,profile)

    fetch('https://railway.bookreview.techtrain.dev/users', {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.token}`
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        setErrorMessage(`エラーが発生しました：${res.status}`)
      }
    })
    .then(json => {
      setProfile({
        'name': json.name,
        // 'iconUrl': icon
      })
      setSuccessMessage(true)
      setTimeout(() => {
        setSuccessMessage(false)
      }, '3000')
    })
  }

  return (
    <>
    <Header />
    <main>
      <h2 className='page-title'>ユーザー情報編集</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate="novalidate">
        
        <div className='flex items-center justify-center mb-10'>
          <p id="icon" className='mr-5'><img src={profile.iconUrl ? profile.iconUrl : iconUser} alt="ユーザーアイコン" /></p>
          <p>{profile.name}</p>  
        </div>

        <InputItem 
        register={register} 
        type='text' 
        id='name' 
        label='お名前' 
        pattern={{}} 
        errors={errors.name} 
        defaultValues={defaultValues.name} />

        <p className='mt-10'><label htmlFor="iconUrl">ユーザーアイコン：</label>
        <input type="file" accept="image/png, image/jpg" ref={inputFileRef} /><br />
        <span className='text-gray sqtext-s mt-3 inline-block'>※登録できる画像：拡張子 - jpg・png、サイズ - 1MB以内</span></p>
        
        <p className='flex justify-center mt-10'><button type="submit">更新</button></p>
        <p className="error form-error mt-5 text-center">{errorMessage}</p>

        {successMessage && (<p className='success bg-orange-50 text-orange-600 mb-10 p-3'>更新しました！</p>)}
      </form>
      </main>
    </>
  );
};

export default Profile;
