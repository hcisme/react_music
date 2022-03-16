import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ImportOutlined } from '@ant-design/icons'
import './index.css'
import Search from './Search'

export default function Top() {
  let navigate = useNavigate()

  const login = () => {
    navigate('/login')
  }

  return (
    <div className="top">
      <div className="sign">
        <img src="http://chcmusic.cloud/images/Cat.svg" alt="" onClick={() => navigate('/home/discovery')} />
      </div>

      <div className="search">
        <Search></Search>
      </div>

      <div className="login" onClick={() => login()}>
        <span>登录 </span>
        <ImportOutlined />
      </div>
    </div>
  )
}
