import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useRecoilState } from 'recoil'
import { profileAtom } from "../store/atom"
import './header.scss'

export const Header = () => {
  const navigate = useNavigate()
  const [cookies, , removeCookie ] = useCookies()
  const [profile, setProfile ] = useRecoilState(profileAtom)
  const isSignIn = () => {
    console.log('isSignIn')
    fetch('https://railway.bookreview.techtrain.dev/users', {
      headers:{
        'Authorization': `Bearer ${cookies.token}`
      }
    })
    .then(res => res.json())
    .then(json => {
      setProfile(json)
      // console.log(profile)
    })
  }
  useEffect(() => {
    if(cookies.token) {
      isSignIn()
    }
  }, [])
  const isSignOut = () => {
    console.log("isSignOut")
    removeCookie('token')
    navigate('/login')
  }

  return (
    <>
    <header className="header">
      <h1><Link to="/">書籍レビューアプリ</Link></h1>
      {cookies.token ? (
        <ul>
          <li>こんにちは、{profile.name}さん！</li>
          <li><Link to="/profile">ユーザー情報編集</Link></li>
          <li><button onClick={isSignOut} className="sign-out-button">ログアウト</button></li>
        </ul>
      ) : (
        <ul>
          <li><Link to="/signup">新規ユーザー登録</Link></li>
          <li><Link to="/login">ログイン</Link></li>
        </ul>
      )} 
    </header>
    </>
  )
}