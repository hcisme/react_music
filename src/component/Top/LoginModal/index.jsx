import React, { useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

export default function LoginModal(props) {
  const [isLoading, setIsLoading] = useState(false)

  const onFinish = (values) => {
    setIsLoading(true)
    React.$apis.Login(values.phone, values.password).then((val) => {
      if (val.code === 200) {
        message.success('登录成功')
        setIsLoading(false)
        props.getBool(false)
        localStorage.setItem('token', val.token)
        localStorage.setItem('id', val.account?.id)
        setTimeout(() => {
          window.top.location.reload(true)
        }, 1000)
      } else if (val.code === 509) {
        setIsLoading(false)
        return message.error('密码次数超过限制, 请到移动端查看')
      } else if (val.code === 502) {
        setIsLoading(false)
        return message.error('账号或密码错误')
      }
    })
  }

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="phone"
        rules={[
          {
            required: true,
            message: 'Please input your phone!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="手机号" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" loading={isLoading}>
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}
