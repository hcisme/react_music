import React, { useState, useEffect } from 'react'
import { Menu, Card, Skeleton, Pagination } from 'antd'
import { PlayCircleTwoTone } from '@ant-design/icons'
import time from '../../utils/js/timeTool.js'
import './index.css'

const { Meta } = Card

export default function Mvs() {
  const [area, setArea] = useState('全部')
  const [type, setType] = useState('全部')
  const [order, setOrder] = useState('上升最快')
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(null)
  const [source, setSource] = useState([])

  const getMvList = () => {
    React.$apis.getMvLists(area, type, order, page).then((val) => {
      setSource(val.data)
      setLoading(false)
    })
  }

  const getMvCount = () => {
    React.$apis.getMvLists(area, type, order, page).then((val) => {
      setTotal(val.count)
    })
  }

  useEffect(() => {
    getMvCount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setLoading(true)
    getMvList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [area, type, order, page, total])

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <Menu
          mode="horizontal"
          onSelect={(e) => {
            setArea(e.key)
            setPage(1)
          }}
          selectedKeys={area}
        >
          <Menu.Item key="全部">全部</Menu.Item>
          <Menu.Item key="内地">内地</Menu.Item>
          <Menu.Item key="港台">港台</Menu.Item>
          <Menu.Item key="韩国">韩国</Menu.Item>
          <Menu.Item key="欧美">欧美</Menu.Item>
          <Menu.Item key="日本">日本</Menu.Item>
        </Menu>
        <Menu
          mode="horizontal"
          onSelect={(e) => {
            setType(e.key)
            setPage(1)
          }}
          selectedKeys={type}
        >
          <Menu.Item key="全部">全部</Menu.Item>
          <Menu.Item key="官方版">官方版</Menu.Item>
          <Menu.Item key="原生">原生</Menu.Item>
          <Menu.Item key="现场版">现场版</Menu.Item>
          <Menu.Item key="网易出品">网易出品</Menu.Item>
        </Menu>
        <Menu
          mode="horizontal"
          onSelect={(e) => {
            setOrder(e.key)
            setPage(1)
          }}
          selectedKeys={order}
        >
          <Menu.Item key="上升最快">上升最快</Menu.Item>
          <Menu.Item key="最热">最热</Menu.Item>
          <Menu.Item key="最新">最新</Menu.Item>
        </Menu>
      </div>

      <div className="items" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {source.map((item) => {
          return (
            <Skeleton style={{ width: 300 }} loading={loading} avatar active key={item.id}>
              <div style={{overflow: 'hidden'}}>
                <Card className="mvCard" style={{ width: 300, position: 'relative' }} cover={<img alt="加载失败请刷新尝试" src={item.cover} />}>
                  <Meta title={item.name} description={item.artistName} />
                  <PlayCircleTwoTone className="PlayCircleTwoTone" />
                  <div className="playcount">{item.playCount}</div>
                  <div className="duration">{time(item.duration)}</div>
                </Card>
              </div>
            </Skeleton>
          )
        })}
      </div>

      <div className="page" style={{ marginTop: '25px', textAlign: 'center' }}>
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
