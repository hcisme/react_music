import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Pagination, Descriptions, Table } from 'antd'
import { time } from '../../utils/js/timeTool'
import PubSub from 'pubsub-js'

export default function Result() {
  let params = useParams()
  let navigate = useNavigate()

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(null)
  const [dataSource, setDataSource] = useState([])
  const [isHid, setIsHid] = useState(true)

  const getSearchResult = () => {
    React.$apis.searchres(params.searchword, page).then((val) => {
      setDataSource(val.songs)
      setTotal(val.songCount)
      setIsHid(false)
      console.log(val.songs)
    })
  }

  const columns = [
    {
      title: '歌曲',
      width: 400,
      render: (item) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>{item.name}</span>
            {item.mv && (
              <span
                className="iconfont icon-movie-line"
                style={{ color: 'red', padding: 3, cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation()
                  e.nativeEvent.stopImmediatePropagation()
                  navigate(`/home/mv/${item.mv}`)
                }}
              ></span>
            )}
            {item.privilege.maxbr === 999000 ? <span className="iconfont icon-wusunyinzhi" style={{ color: 'red', fontSize: 25, fontWeight: 500 }}></span> : ''}
            {item.fee === 1 ? <span className='iconfont icon-VIP' style={{ color: 'red', fontSize: 25, fontWeight: 500 }}></span> : ''}
          </div>
        )
      },
    },
    {
      title: '歌手',
      render: (item) => {
        return item.ar?.map((record) => {
          return <div key={record.id}>{record.name}</div>
        })
      },
    },
    {
      title: '专辑',
      render: (item) => {
        return item.al?.name
      },
    },
    {
      title: '时长',
      render: (item) => {
        return time(item.dt)
      },
    },
  ]

  useEffect(() => {
    getSearchResult()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    getSearchResult()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.searchword])

  return (
    <div>
      <Descriptions title={params.searchword} style={{ padding: '0 70px' }}>
        <Descriptions.Item label="结果">{total}首</Descriptions.Item>
      </Descriptions>

      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
        pagination={false}
        loading={isHid}
        onRow={(record) => {
          return {
            onClick: () => {
              PubSub.publish('ids', { id: record.id })
            }, // 点击行
          }
        }}
      />

      <div className="page" style={{ width: '100%', textAlign: 'center', marginTop: 20 }}>
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
