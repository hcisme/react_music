import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Table } from 'antd'
import { PlayCircleTwoTone } from '@ant-design/icons'
import PubSub from 'pubsub-js'
// 导入处理时间的函数
import { time } from '../../utils/js/timeTool.js'
import './index.css'

export default function NewSongs() {
  let navigate = useNavigate()

  const [cat, setCat] = useState('0')
  const [isHid, setIsHid] = useState(true)
  const [dataSource, setDataSource] = useState([])

  const handleClickToggle = (e) => {
    setCat(e.key)
  }

  const getMusicList = () => {
    setIsHid(true)
    React.$apis.getLists(cat).then((val) => {
      setDataSource(val)
      setIsHid(false)
    })
  }

  const handlePlayMusic = (record) => {
    React.$apis.getlyrc(record.id).then(lyrc=> {
      const Info = { id: record.id, posterUrl: record.album.picUrl, name: record.name, artistName: record.artists[0].name, lyrc: lyrc.lyric }
      PubSub.publish('ids', Info)
    })
  }

  const columns = [
    {
      title: '封面',
      align: 'center',
      render: (item) => {
        return (
          <>
            <img className="poster" src={item.album.picUrl} alt="" />
            <PlayCircleTwoTone className="PlayCircleTwoTone" />
          </>
        )
      },
    },
    {
      title: '音乐标题',
      align: 'center',
      render: (item) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>{item.name}</span>
            {item.mvid && (
              <span
                className="iconfont icon-movie-line"
                style={{ color: 'red', padding: 3, cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation()
                  e.nativeEvent.stopImmediatePropagation()
                  navigate(`/home/mv/${item.mvid}`)
                }}
              ></span>
            )}
            {item.privilege.maxbr === 999000 ? <span className="iconfont icon-wusunyinzhi" style={{ color: 'red', fontSize: 25, fontWeight: 500 }}></span> : ''}
            {item.fee === 1 ? <span className="iconfont icon-VIP" style={{ color: 'red', fontSize: 25, fontWeight: 500 }}></span> : ''}
          </div>
        )
      },
    },
    {
      title: '歌手',
      align: 'center',
      render: (item) => {
        return <span>{item.album.artists[0].name}</span>
      },
    },
    {
      title: '专辑',
      align: 'center',
      render: (item) => {
        return <span>{item.album.name}</span>
      },
    },
    {
      title: '时长',
      align: 'center',
      render: (item) => {
        return <span>{time(item.duration)}</span>
      },
    },
  ]

  useEffect(() => {
    getMusicList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        <Menu
          mode="horizontal"
          onSelect={(e) => {
            handleClickToggle(e)
          }}
          selectedKeys={cat}
        >
          <Menu.Item key="0">全部</Menu.Item>
          <Menu.Item key="7">华语</Menu.Item>
          <Menu.Item key="96">欧美</Menu.Item>
          <Menu.Item key="8">日本</Menu.Item>
          <Menu.Item key="16">韩国</Menu.Item>
        </Menu>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
        loading={isHid}
        pagination={{
          pageSize: 25,
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              handlePlayMusic(record)
            }, // 点击行
          }
        }}
      />
    </div>
  )
}
