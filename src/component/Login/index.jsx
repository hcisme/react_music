import React, { useEffect } from 'react'
import { message } from 'antd'

export default function Login() {
  useEffect(() => {
    return message.info('该功能暂未开发 近期开发')
  }, [])

  return <div>登陆界面</div>
}
