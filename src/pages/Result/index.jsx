import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Pagination, Descriptions, Table, Tabs, Skeleton, Card, Image, Spin, message } from 'antd'
import { PlayCircleTwoTone, PlayCircleOutlined } from '@ant-design/icons'
import { time } from '../../utils/js/timeTool'
import PubSub from 'pubsub-js'
import './index.css'

const { TabPane } = Tabs
const { Meta } = Card

export default function Result() {
  let params = useParams()
  let navigate = useNavigate()

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(null)
  const [dataSource, setDataSource] = useState([])
  const [isHid, setIsHid] = useState(true)
  const [tabsPage, setTabsPage] = useState('songs')
  const [loading, setLoading] = useState(true)

  const getSearchResult = () => {
    React.$apis.searchres(params.searchword, tabsPage === 'songs' ? 1 : tabsPage === 'mvs' ? 1004 : tabsPage === 'playlists' ? 1000 : '', page).then((val) => {
      if (val.songs) {
        setDataSource(val.songs)
        setTotal(val.songCount)
        setLoading(false)
      } else if (val.mvs) {
        setDataSource(val.mvs)
        setTotal(val.mvCount)
      } else if (val.playlists) {
        setDataSource(val.playlists)
        setTotal(val.playlistCount)
      }
      setLoading(false)
      setIsHid(false)
    })
  }

  const isLove = async (e, item) => {
    e.stopPropagation()
    const res = await React.$apis.request('get', '/api/like', { id: item.id, like: 'true' })
    if (res.code === 200) return message.success('该音乐已添加到喜欢列表')
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
            {item.privilege?.maxbr === 999000 ? <span className="iconfont icon-wusunyinzhi" style={{ color: 'red', fontSize: 25, fontWeight: 500 }}></span> : ''}
            {item.fee === 1 ? <span className="iconfont icon-VIP" style={{ color: 'red', fontSize: 25, fontWeight: 500 }}></span> : ''}
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
    {
      title: '',
      render: (item) => {
        return (
          <i
            className="iconfont icon-xihuan"
            onClick={(e) => {
              isLove(e, item)
            }}
          ></i>
        )
      },
    },
  ]

  useEffect(() => {
    getSearchResult()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, tabsPage])

  useEffect(() => {
    getSearchResult()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.searchword])

  const callback = (e) => {
    setPage(1)
    setLoading(true)
    setTabsPage(e)
  }

  // mvs
  const renderMvsList = (
    <div className="items mvs" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      {dataSource.map((item) => {
        return (
          <Skeleton style={{ width: 300 }} loading={loading} avatar active key={item.id}>
            <div
              style={{ overflow: 'hidden' }}
              onClick={() => {
                navigate(`/home/mv/${item.id}`)
              }}
            >
              <Card
                className="mvCard"
                style={{ width: 300, marginBottom: 25 }}
                cover={
                  <div style={{ width: 300 }}>
                    <Image width={'100%'} src={item.cover} fallback="http://chcmusic.cloud/images/error.png" />
                    <div className="duration">{time(item.duration)}</div> <PlayCircleTwoTone className="PlayCircleTwoTone" />
                  </div>
                }
              >
                <Meta title={item.name} description={item.artistName} />
                <div className="playcount">
                  <i style={{ paddingRight: 2 }} className="iconfont icon-bofang"></i>
                  <i>{item.playCount}</i>
                </div>
              </Card>
            </div>
          </Skeleton>
        )
      })}
    </div>
  )

  // playlists
  const renderPlaylistsLst = (
    <Spin spinning={loading} style={{ width: '100% !import' }}>
      <div className="items playlists" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {dataSource.map((item) => {
          return (
            <div
              className="item"
              key={item.id}
              onClick={() => {
                navigate(`/home/playlist/${item.id}`)
              }}
            >
              <Card
                hoverable
                className="chc-card"
                style={{ width: 200, height: 300 }}
                cover={
                  <div style={{ height: 180, position: 'relative' }}>
                    <Image height={'100%'} src={item.coverImgUrl} fallback="http://chcmusic.cloud/images/error.png" />
                    <PlayCircleTwoTone className="play" />
                  </div>
                }
              >
                <Meta className="chc-meta" title={item.name} description={item.description} />
                <div className="playcount">
                  <i>
                    <PlayCircleOutlined /> {item.playCount}
                  </i>
                </div>
              </Card>
            </div>
          )
        })}
      </div>
    </Spin>
  )

  return (
    <div className="result">
      <Descriptions title={params.searchword} style={{ padding: '0 70px' }}>
        <Descriptions.Item label="结果">{total}首</Descriptions.Item>
      </Descriptions>

      <Tabs
        activeKey={tabsPage}
        onChange={(e) => {
          callback(e)
        }}
      >
        <TabPane tab="单曲" key="songs">
          <Table
            dataSource={dataSource}
            columns={columns}
            rowKey={(item) => item.id}
            pagination={false}
            loading={isHid}
            onRow={(record) => {
              return {
                onClick: () => {
                  React.$apis.getlyrc(record.id).then((lyrc) => {
                    PubSub.publish('ids', { id: record.id, posterUrl: record.al?.picUrl, name: record.name, artistName: record.ar[0]?.name, lyrc: lyrc.lyric })
                  })
                }, // 点击行
              }
            }}
          />
        </TabPane>
        <TabPane tab="MV" key="mvs">
          {renderMvsList}
        </TabPane>
        <TabPane tab="歌单" key="playlists">
          {renderPlaylistsLst}
        </TabPane>
      </Tabs>

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
