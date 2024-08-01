import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import './header.scss'

export const Header = () => {
  const [cookies, setCookie, removeCookie ] = useCookies()
  const isSignIn = () => {
    console.log('isSignIn')
    fetch('https://railway.bookreview.techtrain.dev/users', {
      headers:{
        'Authorization': `Bearer ${cookies.token}`
      }
    })
    .then(res => res.json())
    .then(json => {
      setCookie('name', json.name)
      setCookie('iconUrl', json.iconUrl)
    })
  }
  const isSignOut = () => {
    console.log("isSignOut")
    removeCookie('token', { path: '/' }, { httpOnly: true })
    removeCookie('name', { path: '/' }, { httpOnly: true })
    removeCookie('email', { path: '/' }, { httpOnly: true })
    removeCookie('password', { path: '/' }, { httpOnly: true })
    removeCookie('iconUrl', { path: '/' }, { httpOnly: true })
  }

  useEffect(() => {
    if(cookies.token) return isSignIn()
  }, [])

  return (
    <>
    <header className="header">
      <h1><Link to="/">書籍レビューアプリ</Link></h1>
      {cookies.token ? (
        <ul>
          <li>こんにちは、{cookies.name}さん！</li>
          <li><Link to="/profile">ユーザー情報編集</Link></li>
          <li><Link to="/login" onClick={isSignOut}>ログアウト</Link></li>
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