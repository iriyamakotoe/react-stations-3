import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useForm } from "react-hook-form"
import "./profile.scss";

export const Profile = () => {
  const [cookies, setCookie, ] = useCookies()

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

    const onSubmit = (form) => {
        setErrorMessage('')
        const data = { ...form, icon: {} }

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
          if (form.iconUrl.item(0)) return uploadIcon(form)
        })
      }
    
      // 画像をアップロードする
      const uploadIcon = (form) =>  {
        const data = new FormData();
        data.append('icon', form.iconUrl.item(0))
        fetch('https://railway.bookreview.techtrain.dev/uploads', {
          method: 'POST',
          headers:{
            'Authorization': `Bearer ${cookies.token}`
          },
          body: data
        })
        .then((res) => {
          if(res.ok) {
            console.log('画像登録成功しました');
          } else {
            setErrorMessage(`画像登録エラーが発生しました：${res.status}`)
          }
        })
      }

  return (
    <>
    <main>
      <h2 className='page-title'>ユーザー情報編集</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate="novalidate">
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
        })} defaultValue={defaultValues?.email} /><br />
        <span className="error">{errors.email?.message}</span></p>

        <p className='mb-10'><label htmlFor="password">パスワード：</label>
        <input type="password" 
        {...register("password", {
          required: 'パスワードは必須です',
          pattern: {
            value: /^[a-zA-Z0-9]{6,12}$/i,
            message: '半角英数字、6〜12文字で入力してください'
          }
        })} defaultValue={defaultValues?.password} /><br />
        <span className='text-gray text-s mt-3 inline-block'>※パスワードは半角英数字、6〜12文字で入力してください。</span><br />
        <span className="error">{errors.password?.message}</span></p>

        <p><img src={cookies.iconUrl} alt="" /></p>
        <p><label htmlFor="iconUrl">ユーザーアイコン：</label>
        <input type="file" 
        {...register("iconUrl")} /><br /><br />
        <span>※jpg, png、ファイルサイズは1MB以下</span><br />
        <span className="error">{errors.iconUrl?.message}</span></p>
        
        <p className='flex justify-center'><button type="submit">送信</button></p>
        <p className="error form-error mt-5 text-center">{errorMessage}</p>
      </form>
      </main>
    </>
  );
};

export default Profile;
