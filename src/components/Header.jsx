import React from 'react'
import './header.scss'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className="header">
      <h1><Link to="/">書籍レビューアプリ</Link></h1>
      <ul>
        <li><Link to="/signup">新規会員登録</Link></li>
        <li><Link to="/login">ログイン</Link></li>
      </ul>
    </header>
  )
}