import React, { useEffect, useState } from 'react'
import { Menu, Table } from 'antd'
import { PlayCircleTwoTone } from '@ant-design/icons'
// 导入处理时间的函数
import time from '../../utils/js/timeTool.js'
import './index.css'

export default function NewSongs() {
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
      dataIndex: 'name',
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
          <Menu.Item key='0'>全部</Menu.Item>
          <Menu.Item key='7'>华语</Menu.Item>
          <Menu.Item key='96'>欧美</Menu.Item>
          <Menu.Item key='8'>日本</Menu.Item>
          <Menu.Item key='16'>韩国</Menu.Item>
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
      />
    </div>
  )
}
