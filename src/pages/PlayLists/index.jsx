import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Card, Image, Skeleton, Pagination } from 'antd'
import { PlayCircleTwoTone, PlayCircleOutlined } from '@ant-design/icons'
import './index.css'

const { Meta } = Card

export default function PlayLists() {
  let navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [cat, setCat] = useState('全部')
  const [topData, setTopData] = useState({})
  const [listData, setListData] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(null)

  // 获取头部信息
  const getTopData = () => {
    React.$apis.topDatas(cat).then((val) => {
      setTopData(val)
    })
  }
  // 获取歌单列表
  const getListData = () => {
    React.$apis.listDatas(page, cat).then((val) => {
      setListData(val.playlists)
      setTotal(val.total)
      setLoading(false)
    })
  }

  useEffect(() => {
    getListData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    getTopData()
    getListData()
    setPage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat])

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      getTopData()
      setLoading(false)
    }, 700)
    getListData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="playlists">
      <div className="header">
        <Card>
          <Skeleton loading={loading} avatar active>
            <Meta avatar={<Image src={topData.coverImgUrl} style={{ width: 165, height: 165, borderRadius: 5 }} alt="加载失败请重试" />} title={topData.name} description={topData.description} />
          </Skeleton>
        </Card>
      </div>
      <div className="navigate">
        <Menu
          mode="horizontal"
          selectedKeys={cat}
          onSelect={(e) => {
            setCat(e.key)
          }}
        >
          <Menu.Item key="全部">全部</Menu.Item>
          <Menu.Item key="欧美">欧美</Menu.Item>
          <Menu.Item key="华语">华语</Menu.Item>
          <Menu.Item key="流行">流行</Menu.Item>
          <Menu.Item key="说唱">说唱</Menu.Item>
          <Menu.Item key="摇滚">摇滚</Menu.Item>
          <Menu.Item key="民谣">民谣</Menu.Item>
          <Menu.Item key="电子">电子</Menu.Item>
          <Menu.Item key="轻音乐">轻音乐</Menu.Item>
          <Menu.Item key="影视原声">影视原声</Menu.Item>
          <Menu.Item key="ACG">ACG</Menu.Item>
          <Menu.Item key="怀旧">怀旧</Menu.Item>
          <Menu.Item key="治愈">治愈</Menu.Item>
          <Menu.Item key="旅行">旅行</Menu.Item>
        </Menu>
      </div>
      <div className="items">
        {listData.map((item) => {
          return (
            <div
              className="item"
              key={item.id}
              onClick={() => {
                navigate(`/home/playlist/${item.id}`)
              }}
            >
              <Card hoverable className="chc-card" style={{ width: 200, height: 300 }} cover={<Image height={180} src={item.coverImgUrl} fallback="http://chcmusic.cloud/images/error.png" />}>
                <Meta className="chc-meta" title={item.name} description={item.description} />
                <div className="playcount">
                  <i>
                    <PlayCircleOutlined /> {item.playCount}
                  </i>
                </div>
                <PlayCircleTwoTone className="play" />
              </Card>
            </div>
          )
        })}
      </div>
      <div className="page">
        <Pagination
          current={page}
          total={total}
          showSizeChanger={false}
          onChange={(current) => {
            setPage(current)
          }}
        />
      </div>
    </div>
  )
}
