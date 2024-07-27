import { useState } from "react";
import './Home.scss'

function Home() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
    enableButton()
  }
  // :invalid要素が存在しない場合、ボタンのdisable属性を削除する
  const enableButton = () => {
    document.querySelector('button').removeAttribute('disabled');
  }
  const showMessage = () => {
    alert('ログインしました。')
  }
  return (
    <>
    <form>
    <p><label htmlFor="email">Email:<input type="email" name="email" id="email" onChange={handleForm} value={form.email} required /></label></p>
    <p><label htmlFor="password">Password:<input type="password" name="password" id="password" onChange={handleForm} value={form.password} required /></label></p>
    <p><button type="submit" onClick={showMessage} disabled>ログイン</button></p>
    </form>
    </>
  )
}

export default Home