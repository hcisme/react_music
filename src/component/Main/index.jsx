import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Menu, BackTop } from 'antd'
import { SendOutlined, BgColorsOutlined } from '@ant-design/icons'
import PubSub from 'pubsub-js'
// import ReactAplayer from 'react-aplayer'
import './index.css'

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

  const [musicUrl, setMusicUrl] = useState('')
  // const [posterUrl, setPosterUrl] = useState('')
  // const [artistName, setArtistName] = useState('')
  // const [name, setName] = useState('')

  useEffect(() => {
    PubSub.subscribe('ids', async (msg, data) => {
      // const { posterUrl, artistName, name } = data
      React.$apis.getMusicUrl(data.id).then((val) => {
        setMusicUrl(val[0].url)
      })
      // setPosterUrl(posterUrl)
      // setArtistName(artistName)
      // setName(name)
      PubSub.unsubscribe('ids')
    })
  }, [musicUrl])

  const handleClick = (e) => {
    navigate(e.key)
  }

  // const source = {
  //   theme: '#F57F17',
  //   lrcType: 3,
  //   audio: [
  //     {
  //       name,
  //       artist: artistName,
  //       url: musicUrl,
  //       cover: posterUrl,
  //       lrc: '',
  //       theme: '#ebd0c2',
  //     },
  //   ],
  // }

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
        <Outlet />
      </div>

      {/* <ReactAplayer className="aplayer" {...source} /> */}
      <audio className='aplayer' src={musicUrl} controls autoPlay></audio>

      <BackTop style={{ marginBottom: 20 }}>
        <div style={style}>UP</div>
      </BackTop>
    </div>
  )
}
