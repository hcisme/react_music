import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Avatar, Descriptions, Tabs, Pagination } from 'antd'
import { PlayCircleTwoTone } from '@ant-design/icons'
import './index.css'
import Commmnt from '../../hooks/Comment'
import { time } from '../../utils/js/timeTool.js'

const { Meta } = Card
const { TabPane } = Tabs

export default function Mv() {
  let params = useParams()
  let navigate = useNavigate()

  const [mvUrl, setMvUrl] = useState('')
  const [mvInfo, setMvInfo] = useState({})
  const [hotComments, setHotComments] = useState([])
  const [comments, setComments] = useState([])
  const [simiMvs, setSimiMv] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [key, setKey] = useState('hot')
  const [pagetime, setTime] = useState(null)

  const getMvUrl = () => {
    React.$apis.mvurl(params.id).then((val) => {
      setMvUrl(val)
    })
  }

  const mvsInfo = () => {
    React.$apis.mvsInfo(params.id).then((val) => {
      setMvInfo(val)
    })
  }

  const getComment = () => {
    React.$apis.getMvNewComment(params.id, page, pagetime).then((val) => {
      setHotComments(val.hotComments)
      setComments(val.comments)
      setTotal(val.total)
      setTime(val.comments[14]?.time)
    })
  }

  const getSimiMvs = () => {
    React.$apis.simiMvs(params.id).then((val) => {
      setSimiMv(val)
    })
  }

  useEffect(() => {
    getComment()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    getMvUrl()
    mvsInfo()
    getComment()
    getSimiMvs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  return (
    <div className="mv-container">
      <div className="mvbox">
        <video src={mvUrl} controls autoPlay></video>
        <Card style={{ width: '100%' }}>
          <Meta avatar={<Avatar src={mvInfo.cover} size={65} />} title={mvInfo.artistName} description={`作品：${mvInfo.name}`} />
          <Descriptions title="" style={{ marginTop: 20 }}>
            <Descriptions.Item label="发布">{mvInfo.publishTime}</Descriptions.Item>
            <Descriptions.Item label="播放次数">{mvInfo.playCount}次</Descriptions.Item>
          </Descriptions>
        </Card>

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
            <Commmnt comment={hotComments}></Commmnt>
          </TabPane>
          <TabPane
            tab={
              <span>
                <i className="iconfont icon-zuixinhuodong" style={{ padding: 5 }}></i>
                最新评论{`(${total})`}
              </span>
            }
            key="new"
          >
            <Commmnt comment={comments}></Commmnt>

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
          </TabPane>
        </Tabs>
      </div>

      <div className="simimv">
        <div className="title" style={{ paddingBottom: 10 }}>
          相关MV
        </div>
        <div className="items" style={{ display: 'flex', flexDirection: 'column' }}>
          {simiMvs.map((item) => {
            return (
              <Card
                onClick={() => {
                  navigate(`/home/mv/${item.id}`)
                }}
                key={item.id}
                style={{ display: 'flex', width: '100%', marginBottom: 10, overflow: 'hidden' }}
                cover={
                  <div className='imges' style={{width: 265}}>
                    <img alt="example" src={item.cover} style={{ cursor: 'pointer', width: '100%', height: '100%' }} />
                    <PlayCircleTwoTone className="PlayCircleTwoTone" style={{ cursor: 'pointer' }} />
                  </div>
                }
              >
                <Meta title={item.name} description={`作者：${item.artistName}`} />
                <Meta title={`播放：${item.playCount}次`} />
                <Meta title={`时长：${time(item.duration)}`} />
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
