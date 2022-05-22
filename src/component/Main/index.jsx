import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Menu, BackTop, Spin } from 'antd'
import { SendOutlined, BgColorsOutlined, GithubOutlined } from '@ant-design/icons'
import UseMusic from '../../hooks/UseMusic'
import './index.css'
import { store } from '../../redux/store'

const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
  marginLeft: 90,
}

export default function Main() {
  let location = useLocation()
  let navigate = useNavigate()
  const [show, setShow] = useState(false)

  const handleClick = (e) => {
    navigate(e.key)
  }

  store.subscribe(() => {
    setShow(store.getState()?.showReducer?.bool)
  })

  return (
    <div className="main">
      <div className="main-menu">
        <Menu
          onClick={(e) => {
            handleClick(e)
          }}
          selectedKeys={[location.pathname]}
          mode="horizontal"
        >
          <Menu.Item key="/home/discovery" icon={<SendOutlined />}>
            发现首页
          </Menu.Item>
          <Menu.Item key="/home/playlists" icon={<BgColorsOutlined />}>
            推荐歌单
          </Menu.Item>
          <Menu.Item key="/home/newsongs" icon={<i className="iconfont icon-yinle" />}>
            最新音乐
          </Menu.Item>
          <Menu.Item key="/home/mvs" icon={<i className="iconfont icon-movie-line"></i>}>
            Mv
          </Menu.Item>
        </Menu>
      </div>
      <div className="mainArticle">
        <Spin spinning={show}>
        <Outlet />
        </Spin>

        <div className="thanks" style={{ display: 'flex', justifyContent: 'center', paddingTop: 10 }}>
          <div>
            <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_black">
              辽ICP备2021010497号-2
            </a>
          </div>
          <div>
            <a href="https://github.com/Binaryify/NeteaseCloudMusicApi" target="_black">
              感谢 <GithubOutlined />
              @binaryify
            </a>
          </div>
          <div>
            <a href="https://github.com/DIYgod/APlayer" target="_black">
              感谢 <GithubOutlined />
              @DIYgod
            </a>
          </div>
        </div>
      </div>

      <UseMusic></UseMusic>

      <BackTop style={{ marginBottom: 40 }}>
        <div style={style}>UP</div>
      </BackTop>
    </div>
  )
}
