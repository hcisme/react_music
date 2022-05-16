import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Popover, List, Typography, Avatar, message, Spin } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import store, { Store } from '../../../redux/store'
import { HearFromSearchSuggestInfo } from '../../../redux/actions'
import './index.css'

const { Search } = Input

export default function SearchPage() {
  let navigate = useNavigate()

  const [defaultWord, setDefaultWord] = useState({})
  const [HotWord, setHotWord] = useState([])
  const [occs, setOccs] = useState({})
  const [isHid, setIsHid] = useState('block')
  const [isShow, setIsShow] = useState(true)
  const [timer, setTimer] = useState(null)

  const handleSubmit = (e) => {
    if (e === '') return message.info('请写入搜索信息')
    navigate(`/home/result/${e}`)
    setIsHid('none')
  }

  const getDefauoltword = () => {
    React.$apis.defaultWord().then((val) => {
      setDefaultWord(val)
    })
  }

  const showList = () => {
    React.$apis.hotSearch().then((val) => {
      setHotWord(val)
      setIsShow(false)
    })
  }

  const getSuggestion = (e) => {
    setIsShow(true)
    setIsHid('none')
    if (e.target.value === '') {
      setIsHid('block')
    }
    React.$apis.searchSuggest(e.target.value).then((val) => {
      setOccs(val)
      setIsShow(false)
    })
  }

  useEffect(() => {
    getDefauoltword()
  }, [])

  const content = (
    <Spin spinning={isShow}>
      <List
        style={{ width: 260, height: 400, overflowY: 'scroll', display: isHid }}
        itemLayout="horizontal"
        dataSource={HotWord}
        className="chc-list"
        renderItem={(item, index) => (
          <List.Item>
            <span className="chc-span" style={{ padding: 5 }}>
              {index + 1}.
            </span>
            <List.Item.Meta avatar={item.iconUrl === null ? '' : <img src={item.iconUrl} alt="" style={{ width: 27, height: 20, display: 'block' }} />} title={<a href={`/home/result/${item.searchWord}`}>{item.searchWord}</a>} description={item.content === '' ? '' : item.content} />
            <div className="iconfont icon-zuixinhuodong" style={{ color: 'red' }}></div>
            <div style={{ color: '#dd5356' }}>{item.score}</div>
          </List.Item>
        )}
      />
    </Spin>
  )

  const searchArticle = (
    <Spin spinning={isShow}>
      <List style={{ height: 400, overflowY: 'scroll' }}>
        <List
          style={{ width: 260 }}
          header={<div>单曲</div>}
          bordered
          dataSource={occs?.songs}
          renderItem={(item) => (
            <List.Item
              onClick={ async () => {
                let data = await HearFromSearchSuggestInfo(item)
                store.dispatch(data)
              }}
              style={{ cursor: 'pointer' }}
            >
              <Typography.Text mark>{item.name}</Typography.Text>
              <div>
                {item.artists?.map((record) => {
                  return record.name
                })}
              </div>
            </List.Item>
          )}
        />
        <List
          style={{ width: 260 }}
          header={<div>歌单</div>}
          bordered
          dataSource={occs?.playlists}
          renderItem={(item) => (
            <List.Item onClick={() => navigate(`/home/playlist/${item.id}`)} style={{ cursor: 'pointer' }}>
              <Typography.Text mark>{item.name}</Typography.Text>
            </List.Item>
          )}
        />
        <List
          style={{ width: 260 }}
          header={<div>歌手</div>}
          bordered
          dataSource={occs?.artists}
          renderItem={(item) => (
            <List.Item>
              <Avatar src={item.img1v1Url} />
              <Typography.Text mark>{item.name}</Typography.Text>
            </List.Item>
          )}
        />
        <List
          style={{ width: 260 }}
          header={<div>专辑</div>}
          bordered
          dataSource={occs?.albums}
          renderItem={(item) => (
            <List.Item onClick={() => message.info('暂未开发')} style={{ cursor: 'pointer' }}>
              <Typography.Text mark>{item.name}</Typography.Text>
              <Avatar style={{ marginLeft: 'auto' }} src={item.artist.picUrl} />
              <div style={{ padding: 2 }}>{item.artist.name}</div>
            </List.Item>
          )}
        />
      </List>
    </Spin>
  )

  return (
    <div className="search">
      <Popover className="chc-popover" placement="bottom" content={isHid === 'none' ? searchArticle : content} title={isHid === 'none' ? '猜你想搜' : '热搜'} trigger="focus">
        <Search
          placeholder={defaultWord.showKeyword}
          suffix={<SearchOutlined />}
          onSearch={(e) => {
            handleSubmit(e)
          }}
          onFocus={() => {
            showList()
          }}
          onChange={(e) => {
            // 防抖
            if (timer !== null) {
              clearTimeout(timer)
            }
            setTimer(
              setTimeout(() => {
                getSuggestion(e)
              }, 500)
            )
          }}
        />
      </Popover>
    </div>
  )
}
