import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, Avatar, Dropdown, Menu, message, Tooltip } from 'antd'
import { ImportOutlined, GithubOutlined } from '@ant-design/icons'
import './index.css'
import Search from './Search'
import LoginModal from './LoginModal'

export default function Top() {
  let navigate = useNavigate()
  const [isLoginVisible, setIsLoginVisible] = useState(false)
  const [displayText, setDisPlayText] = useState('block')
  const [displayAvatar, setDisPlayAvatar] = useState('none')
  const [userInfo, setUserInfo] = useState({})

  const getChildBool = (val) => {
    setIsLoginVisible(val)
  }

  const loginState = () => {
    React.$apis.loginStatus().then((val) => {
      if (val.account === null && val.profile === null) {
        // 离线
        setDisPlayText('block')
        setDisPlayAvatar('none')
      } else {
        // 在线
        setUserInfo(val)
        setDisPlayText('none')
        setDisPlayAvatar('block')
      }
    })
  }

  useEffect(() => {
    loginState()
  }, [isLoginVisible])

  const menu = (
    <Menu
      onClick={(key) => {
        handleCheck(key)
      }}
    >
      <Menu.Item key="userInfo">主页</Menu.Item>
      <Menu.Item key="logout" style={{ borderBottom: '1px solid #e8e8e8' }}>
        退出登录
      </Menu.Item>
      <Menu.Item key="github">
        <GithubOutlined />
        &nbsp; Github仓库
      </Menu.Item>
    </Menu>
  )

  const handleCheck = ({ key }) => {
    switch (key) {
      case 'userInfo':
        navigate(`/userinfo`)
        break
      case 'logout':
        React.$axios.get('/api/logout')
        localStorage.clear()
        // 离线
        setDisPlayText('block')
        setDisPlayAvatar('none')
        message.success('已退出登录')
        break
      case 'github':
        window.open('https://github.com/TristesAnima/react_music')
        break
      default:
        break
    }
  }

  return (
    <div className="top">
      <div className="sign">
        <Tooltip title={<span style={{ fontSize: 12, fontWeight: 400 }}>点我返回首页</span>} color={'#2db7f5'} placement="bottomRight">
          <img src="http://chcmusic.cloud/images/Cat.svg" alt="" onClick={() => navigate('/home/discovery')} style={{ cursor: 'pointer' }} />
        </Tooltip>
      </div>

      {/* 前进后退路由 */}
      <div className="direction">
        <i
          className="iconfont icon-right"
          onClick={() => {
            window.history.go(-1)
          }}
        ></i>
        <i
          className="iconfont icon-tubiaozhizuo--"
          onClick={() => {
            window.history.go(1)
          }}
        ></i>
      </div>

      <div className="search">
        <Search></Search>
      </div>

      <div
        className="login"
        onClick={() => {
          setIsLoginVisible(true)
        }}
        style={{ display: displayText }}
      >
        <span>登录 </span>
        <ImportOutlined />
      </div>

      {/* 登录成功后显示的头像 */}
      <div style={{ display: displayAvatar }} className="chc-avatar">
        <div style={{ display: 'flex', alignItems: 'end', gap: '0 5px' }}>
          <Dropdown overlay={menu}>
            <Avatar size={'large'} src={userInfo.profile?.avatarUrl} />
          </Dropdown>
          <div className="chc-name">{userInfo.profile?.nickname}</div>
        </div>
      </div>

      {/* 登录模态框 */}
      <Modal
        title="登录"
        visible={isLoginVisible}
        onCancel={() => {
          setIsLoginVisible(false)
        }}
        mask={false}
        footer={null}
        destroyOnClose={true}
      >
        <LoginModal getBool={getChildBool}></LoginModal>
      </Modal>
    </div>
  )
}
