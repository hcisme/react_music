import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Divider, Card, Avatar, message } from 'antd'
import { time } from '../../../utils/js/timeTool'
import './index.css'

const { Meta } = Card

export default function NearListen() {
  let navigate = useNavigate()
  const [recentMv, setRecentMv] = useState([])
  const [recentPlaylists, setRecentPlaylists] = useState([])

  const getRecentMv = () => {
    React.$apis.nearMV().then((val) => {
      setRecentMv(val.list)
    })
  }

  const getRecentPlayLists = () => {
    React.$apis.nearPlayLists().then((val) => {
      setRecentPlaylists(val)
    })
  }

  useEffect(() => {
    getRecentMv()
    getRecentPlayLists()
  }, [])

  return (
    <div>
      <div className="nearlisten">
        <Divider orientation="left">最近播放-视频</Divider>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '20px 0' }}>
          {recentMv.map((item) => {
            return (
              <Card
                style={{ width: 300, position: 'relative', cursor: 'pointer' }}
                cover={<img alt="example" src={item.data?.coverUrl} style={{ width: 300, height: 170, objectFit: 'cover' }} />}
                key={item.data?.id}
                onClick={() => {
                  typeof item.data?.id === 'string' ? message.info('暂缺资源 请到移动端查看') : navigate(`/home/mv/${item.data?.id}`)
                }}
              >
                <Meta
                  avatar={<Avatar style={{ display: item.data?.creator ? 'block' : 'none' }} src={item.data?.creator?.avatarUrl} />}
                  title={item.data.name || item.data.title}
                  description={item.data?.artists?.map((items) => (
                    <div key={items.id}>{items.name}</div>
                  ))}
                />
                <div className="dt">{time(item.data?.duration)}</div>
              </Card>
            )
          })}
        </div>
      </div>

      <div className="">
        <Divider orientation="left">最近播放-歌单</Divider>
        <div className="items" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '20px 0' }}>
          {recentPlaylists.map((item) => {
            return (
              <Card
                style={{ width: 300, cursor: 'pointer' }}
                cover={<img alt="example" src={item.data?.coverImgUrl} />}
                key={item.data?.id}
                onClick={() => {
                  navigate(`/home/playlist/${item.data?.id}`)
                }}
              >
                <Meta avatar={<Avatar src={item.data?.creator?.avatarUrl} />} title={item.data?.name} description={`最新歌曲：${item.data?.lastSong?.name}`} />
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
