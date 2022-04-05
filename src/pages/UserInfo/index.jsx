import React, { useState, useEffect } from 'react'
import { Avatar, Card } from 'antd'
import { useSearchParams } from 'react-router-dom'
import './index.css'

const { Meta } = Card

export default function UserInfo() {
  let [params] = useSearchParams()
  const [userInfo, setUserInfo] = useState({})
  const [ playlistsInfo, setPlaylistsInfo ] = useState({})

  const getStatus = () => {
    React.$apis.loginStatus().then((val) => {
      // console.log(val)
      setUserInfo(val)
    })
  } 

  const getPlaylists = () => {
    React.$apis.getPlaylists(params.getAll('id')[0]).then((val) => {
      console.log(val)
      setPlaylistsInfo(val)
    })
  }

  useEffect(() => {
    getStatus()
    getPlaylists()
  }, [])

  return (
    <div className="userinfo">
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
      <div className="info" style={{ marginBottom: 20 }}>
        <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} src={userInfo.profile?.avatarUrl} style={{ marginRight: 20 }} />
        <span style={{ fontSize: 25 }}>{userInfo.profile?.nickname}</span>
      </div>
      <div className="user-playlists" style={{display: 'flex', justifyContent: 'flex-start'}}>
        <Card style={{ width: 250, marginRight: 30 }} cover={<img alt="example" src={playlistsInfo.playlist[0]?.coverImgUrl} />}>
          <Meta avatar={<Avatar src={playlistsInfo.playlist[0]?.creator?.avatarUrl} />} title={playlistsInfo.playlist[0]?.name} description="This is the description" />
        </Card>
        <div className="near-music">
          最近播放
        </div>
      </div>
    </div>
  )
}
