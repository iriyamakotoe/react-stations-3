import React from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import './header.scss'

export const Header = () => {
  const [cookies, , removeCookie ] = useCookies()
  const signOut = () => {
    removeCookie('token', { path: '/' }, { httpOnly: true });
    console.log("ログアウトしました")
  }
  return (
    <>
    <header className="header">
      <h1><Link to="/">書籍レビューアプリ</Link></h1>
      {cookies.token ? (
        <ul>
          <li><Link to="/signup">ユーザー情報編集</Link></li>
          <li><Link to="/login" onClick={signOut}>ログアウト</Link></li>
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