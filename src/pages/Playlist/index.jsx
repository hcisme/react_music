import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Avatar, Table, Tabs, Pagination, Image, message } from 'antd'
import { PlayCircleTwoTone } from '@ant-design/icons'
import PubSub from 'pubsub-js'
import './index.css'
import { dayjs, time } from '../../utils/js/timeTool.js'
import Commmnt from '../../hooks/UseComment'

const { Meta } = Card
const { TabPane } = Tabs

export default function PlayList() {
  let params = useParams()
  let navigate = useNavigate()

  const [topPoster, setTopPoster] = useState({})
  const [key, setKey] = useState('hot')
  const [dataSource, setDataSource] = useState([])
  const [hotComment, setHotComment] = useState([])
  const [newComment, setNewComment] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [isHid, setIsHid] = useState(true)
  const [pagetime, setTime] = useState(null)
  const [tabsPage, setTabsPage] = useState('music')

  const getTopPoster = () => {
    React.$apis.getPlayListsTopInfo(params.id).then((val) => {
      setTopPoster(val)
    })
  }

  const getMusic = () => {
    React.$apis.getAllMusic(params.id).then((val) => {
      setDataSource(val)
      setIsHid(false)
    })
  }

  const getHotComment = () => {
    React.$apis.gethotcomment(params.id, page, pagetime).then((val) => {
      setHotComment(val.hotComments)
      setTotal(val.total)
      setTime(val.hotComments[14]?.time)
    })
  }

  const getNewComments = () => {
    React.$apis.getNewComment(params.id, page, pagetime).then((val) => {
      setNewComment(val.comments)
      setTotal(val.total)
      setTime(val.comments[14]?.time)
    })
  }

  const isLove = async (e, item) => {
    e.stopPropagation()
    const res = await React.$apis.request('get', '/api/like', { id: item.id, like: 'true' })
    if (res.code === 200) {
      message.success('该音乐已添加到喜欢列表')
    }
  }

  const columns = [
    {
      title: '封面',
      render: (item) => {
        return (
          <div style={{ position: 'relative', width: 50, height: 50 }}>
            <Avatar size={50} src={item.al?.picUrl} />
            <PlayCircleTwoTone className="PlayCircleTwoTone" />
          </div>
        )
      },
    },
    {
      title: '标题',
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
            {item.fee === 1 ? <span className="iconfont icon-VIP" style={{ color: 'red', fontSize: 25, fontWeight: 500 }}></span> : ''}
          </div>
        )
      },
    },
    {
      title: '歌手',
      render: (item) => {
        return item.ar.map((record) => record.name)
      },
    },
    {
      title: '专辑',
      render: (item) => {
        return item.al.name
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
        return <i className='iconfont icon-xihuan' onClick={(e) => {
          isLove(e, item)
        }}></i>
      }
    }
  ]

  const handlePlayMusic = (record) => {
    React.$apis.getlyrc(record.id).then((lyrc) => {
      const Info = { id: record.id, posterUrl: record.al?.picUrl, name: record.name, artistName: record.ar[0]?.name, lyrc: lyrc.lyric }
      PubSub.publish('ids', Info)
    })
  }

  useEffect(() => {
    if (key === 'hot') {
      getHotComment()
    } else if (key === 'new') {
      getNewComments()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    setIsHid(true)
    getTopPoster()
    getMusic()
    getHotComment()
    getNewComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="playlist">
      <Card style={{ display: 'flex', alignItems: 'center', width: '100%', height: '240px' }} cover={<Image width={240} height={240} src={topPoster.coverImgUrl} fallback="http://chcmusic.cloud/images/error.png" />}>
        <div>{topPoster.name}</div>
        <Meta avatar={<Avatar src={topPoster.creator?.avatarUrl} />} title={topPoster.creator?.nickname} description={`创建时间：${dayjs(topPoster.createTime)}`} />
        <Meta title={`标签：${topPoster.tags ? '这个人很懒 什么也没留下' : topPoster.tags?.join(' / ')}`} description={<div className="overflow">{`简介：${topPoster.description ? topPoster.description : '这个人很懒 什么也没留下'}`}</div>} />
      </Card>
      <Tabs
        activeKey={tabsPage}
        style={{ marginTop: 20 }}
        onChange={(e) => {
          setTabsPage(e)
        }}
      >
        <TabPane tab="音乐" key="music">
          <Table
            dataSource={dataSource}
            columns={columns}
            rowKey={(record) => record.id}
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
        </TabPane>
        <TabPane tab="评论" key="comment" style={{ padding: '0 10px' }}>
          <Tabs
            activeKey={key}
            onChange={(key) => {
              setKey(key)
              setPage(1)
            }}
          >
            <TabPane
              tab={
                <span>
                  <i className="iconfont icon-jingcaishike" style={{ padding: 5 }}></i>
                  精彩评论
                </span>
              }
              key="hot"
            >
              <Commmnt comment={hotComment}></Commmnt>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <i className="iconfont icon-zuixinhuodong" style={{ padding: 5 }}></i>
                  最新评论 {`(${total})`}
                </span>
              }
              key="new"
            >
              <Commmnt comment={newComment}></Commmnt>
            </TabPane>
          </Tabs>

          <div className="page" style={{ width: '100%', textAlign: 'center', marginTop: 20, display: hotComment.length === 0 ? 'none' : 'block' }}>
            <Pagination
              current={page}
              total={total}
              showSizeChanger={false}
              onChange={(current) => {
                setPage(current)
              }}
            />
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}
