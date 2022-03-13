import React from 'react'
import { Avatar, Comment, Tooltip } from 'antd'
import { LikeOutlined, LikeFilled } from '@ant-design/icons'
import { dayjs } from '../../utils/js/timeTool.js'

export default function Commmnt(props) {
  const renderAction = (item) => {
    return [
      <Tooltip key="comment-basic-like" title="Like">
        <span>
          {React.createElement(1 === 'liked' ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{item.likedCount}</span>
        </span>
      </Tooltip>,
    ]
  }

  return props?.comment?.length === 0 ? (
    <div style={{ width: '100%', textAlign: 'center', fontSize: 16 }}>目前该歌单没有热评</div>
  ) : (
    props?.comment?.map((item) => {
      return (
        <Comment key={item.commentId} actions={renderAction(item)} author={item.user?.nickname} avatar={<Avatar src={item.user?.avatarUrl} alt="Han Solo" />} content={<p>{item.content}</p>} datetime={<span>{dayjs(item.time)}</span>}>
          {item.beReplied.length === 0 ? '' : <Comment key={item.beReplied[0]?.beRepliedCommentId} author={item.beReplied[0]?.user?.nickname} avatar={<Avatar src={item.beReplied[0]?.user?.avatarUrl} alt="" />} content={<p>{item.beReplied[0]?.content}</p>} />}
        </Comment>
      )
    })
  )
}
