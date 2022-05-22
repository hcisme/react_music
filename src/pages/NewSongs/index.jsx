import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Table, message, notification } from 'antd'
import { PlayCircleTwoTone, PlusCircleOutlined } from '@ant-design/icons'
import { store } from '../../redux/store'
import { HearFromNewSongInfo, statusChange, hearMusicInfo } from '../../redux/actions'
// 查重
import { distinct3 } from '../../utils/js/timeTool.js'
// 导入处理时间的函数
import { time } from '../../utils/js/timeTool.js'
import './index.css'

export default function NewSongs() {
  let navigate = useNavigate()

  const [cat, setCat] = useState('0')
  const [dataSource, setDataSource] = useState([])

  const handleClickToggle = (e) => {
    setCat(e.key)
  }

  const getMusicList = () => {
    React.$apis.getLists(cat).then((val) => {
      setDataSource(val)
    })
  }

  const handlePlayMusic = async (record) => {
    const musicInfo = await HearFromNewSongInfo(record)
    store.dispatch(musicInfo)
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
      render: (item) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span
              onClick={(e) => {
                e.stopPropagation()
                play(item)
              }}
              className="supername anticon"
            >
              {item.name}
            </span>
            {item.mvid ? (
              <span
                className="iconfont icon-movie-line"
                style={{ color: 'red', padding: 3, cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation()
                  e.nativeEvent.stopImmediatePropagation()
                  navigate(`/home/mv/${item.mvid}`)
                }}
              ></span>
            ) : (
              ''
            )}
            {item.privilege.maxbr === 999000 ? <span className="iconfont icon-wusunyinzhi" style={{ color: 'red', fontSize: 25, fontWeight: 500 }}></span> : ''}
            {item.fee === 1 ? <span className="iconfont icon-VIP" style={{ color: 'red', fontSize: 25, fontWeight: 500 }}></span> : ''}
          </div>
        )
      },
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
    {
      title: '',
      render: (item) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center', columnGap: '1.25rem' }}>
            <i
              className="iconfont icon-xihuan"
              onClick={(e) => {
                isLove(e, item)
              }}
            ></i>
            <PlusCircleOutlined
              onClick={(e) => {
                addMusicList(e, item)
              }}
            />
          </div>
        )
      },
    },
  ]

  const play = async (item) => {
    navigate('/home/song')
    let data = await hearMusicInfo(item)
    store.dispatch(data)
  }

  const addMusicList = async (e, item) => {
    e.stopPropagation()
    let initData = await HearFromNewSongInfo(item)
    let localData = JSON.parse(localStorage.getItem('musicList'))
    if (localData !== null) {
      localData.unshift(initData)
      // 数组中 对象 查重
      let newArr = distinct3(localData)
      localStorage.setItem('musicList', JSON.stringify(newArr))

      if (newArr[0].id !== 6666666) {
        notification.success({
          message: '已成功添加到音乐列表',
        })
      }
    }
    store.dispatch(statusChange())
  }

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
          <Menu.Item key="0">全部</Menu.Item>
          <Menu.Item key="7">华语</Menu.Item>
          <Menu.Item key="96">欧美</Menu.Item>
          <Menu.Item key="8">日本</Menu.Item>
          <Menu.Item key="16">韩国</Menu.Item>
        </Menu>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
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
    </div>
  )
}
