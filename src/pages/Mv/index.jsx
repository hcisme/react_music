import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Avatar, Descriptions, Tabs, Pagination } from 'antd'
import './index.css'
import Commmnt from '../../hooks/Comment'

const { Meta } = Card
const { TabPane } = Tabs

export default function Mv() {
  let params = useParams()

  const [mvUrl, setMvUrl] = useState('')
  const [ mvInfo, setMvInfo] = useState({})
  const [hotComments, setHotComments] = useState([])
  const [comments, setComments] = useState([])
  // const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [key, setKey] = useState('hot')

  const getMvUrl = () => {
    React.$apis.mvurl(params.id).then((val) => {
      setMvUrl(val)
    })
  }

  const mvsInfo = () => {
    React.$apis.mvsInfo(params.id).then(val=> {
      setMvInfo(val)
    })
  }

  const getComment = () => {
    React.$apis.getMvNewComment(params.id).then(val=> {
      setHotComments(val.hotComments)
      setComments(val.comments)
      setTotal(val.total)
    })
  }

  // useEffect(() => {
  //   getComment()
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [page])

  useEffect(() => {
    getMvUrl()
    mvsInfo()
    getComment()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mv-container">
      <div className="mvbox">
        <video src={mvUrl} controls></video>
        <Card style={{ width: '100%' }}>
          <Meta avatar={<Avatar src={mvInfo.cover} size={65} />} title={mvInfo.artistName} description={mvInfo.name} />
          <Descriptions title="" style={{ marginTop: 20 }}>
            <Descriptions.Item label="发布">{mvInfo.publishTime}</Descriptions.Item>
            <Descriptions.Item label="播放次数">{mvInfo.playCount}次</Descriptions.Item>
          </Descriptions>
        </Card>

        <Tabs
          activeKey={key}
          onChange={(key) => {
            setKey(key)
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
            {/* <MvCommmnt comment={hotComments}></MvCommmnt> */}
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
            {/* <div className="page" style={{ width: '100%', textAlign: 'center', marginTop: 20 }}>
              <Pagination
                current={page}
                total={total}
                showSizeChanger={false}
                onChange={(current) => {
                  setPage(current)
                }}
              />
            </div> */}
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}
