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
  }
  const showMessage = () => {
    alert('ログインしました。')
  }
  return (
    <>
    <form>
    <p><label>Email:<input type="email" name="email" onChange={handleForm} value={form.email} /></label></p>
    <p><label>Password:<input type="password" name="password"  onChange={handleForm} value={form.password} /></label></p>
    <p><button type="submit" onClick={showMessage}>ログイン</button></p>
    </form>
    </>
  )
}

export default Home