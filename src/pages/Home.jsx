import React from 'react'
import { useState } from "react";
import './Home.scss'

export const Home = () => {

  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    }) 
  }
  return (
    <>
    <h1>ログイン</h1>
    <form>
    <p><label htmlFor="email">Email:<input type="email" name="email" id="email" onChange={handleForm} value={form.email} required /></label></p>
    <p><label htmlFor="password">Password:<input type="password" name="password" id="password" onChange={handleForm} value={form.password} required /></label></p>
    <p><button type="submit">ログイン</button></p>
    </form>
    </>
  )
}

export default Home