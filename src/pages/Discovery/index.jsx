import React, { useEffect, useState } from 'react'
import { Carousel, Divider, Card, Table } from 'antd'
import { PlayCircleTwoTone, PlayCircleOutlined } from '@ant-design/icons'
import PubSub from 'pubsub-js'
import './index.css'
// 导入处理时间的函数
import time from '../../utils/js/timeTool.js'

const { Meta } = Card

export default function Discovery() {
  const [banners, setBanners] = useState([])
  const [playLists, setPlayLists] = useState([])
  const [musics, setMusics] = useState([])
  const [mvs, setMvs] = useState([])

  const getbanner = () => {
    React.$apis.getBanners().then((val) => {
      setBanners(val)
    })
  }

  const getMusicPlaylists = () => {
    React.$apis.getRecommandPlaylists().then((val) => {
      setPlayLists(val)
    })
  }

  const getRecommandMusic = () => {
    React.$apis.recommandMusic().then((val) => {
      setMusics(val)
    })
  }

  const getRecommandMv = () => {
    React.$apis.recommandMv().then((val) => {
      setMvs(val)
    })
  }

  const handlePlayMusic = (record) => {
    // console.log(record);
    const Info = { id: record.id, posterUrl: record.picUrl, name: record.name, artistName: record.song.artists[0].name }
    PubSub.publish('ids', Info)
  }

  const columns = [
    {
      title: '封面',
      render: (record) => {
        return (
          <div className="coverImg" style={{ width: '40px', height: '40px', borderRadius: '5px' }}>
            <img src={record.picUrl} alt="加载失败请重试" style={{ width: '100%', height: '100%', borderRadius: '5px' }} />
            <PlayCircleTwoTone className="PlayCircleTwoTone" />
          </div>
        )
      },
    },
    { width: '500px', title: '名称', dataIndex: 'name' },
    {
      title: '歌手',
      render: (text, record, index) => {
        return record.song.album.artists[0].name
      },
    },
    {
      title: '时长',
      align: 'center',
      render: (item) => {
        return <span>{time(item.song.duration)}</span>
      },
    },
  ]

  useEffect(() => {
    getbanner()
    getMusicPlaylists()
    getRecommandMusic()
    getRecommandMv()
  }, [])

  return (
    <div className="discovery">
      <div className="banner">
        <Carousel autoplay>
          {banners.map((item) => {
            return (
              <div key={item.targetId} className="disbanner">
                <img src={item.imageUrl} alt="加载失败请重试!" />
              </div>
            )
          })}
        </Carousel>
      </div>
      <Divider orientation="left" plain>
        发现歌单
      </Divider>
      <div className="recommandplaylists">
        {playLists.map((item) => {
          return (
            <div className="item" key={item.id}>
              <Card hoverable style={{ width: 200, height: 295 }} cover={<img style={{ height: 200, borderRadius: '5px' }} alt="example" src={item.picUrl} />}>
                <Meta title={item.name} description={item.copywriter} />
                <div className="playcount">
                  <i>
                    <PlayCircleOutlined /> {item.playCount}
                  </i>
                </div>
                <PlayCircleTwoTone className="PlayCircleTwoTone" />
              </Card>
            </div>
          )
        })}
      </div>
      <Divider orientation="left" plain>
        发现音乐
      </Divider>
      <div className="recommandmusic">
        <Table
          dataSource={musics}
          columns={columns}
          pagination={false}
          rowKey={(record) => record.id}
          onRow={(record) => {
            return {
              onClick: () => {
                handlePlayMusic(record)
              }, // 点击行
            }
          }}
        />
      </div>
      <Divider orientation="left" plain>
        发现MV
      </Divider>
      <div className="recommandmvs">
        {mvs.map((item) => {
          return (
            <div className="item" key={item.id}>
              <Card hoverable style={{ width: 300 }} cover={<img style={{ height: 180, borderRadius: '5px' }} alt="example" src={item.picUrl} />}>
                <Meta title={item.name} description={item.artists[0].name} />
                <PlayCircleTwoTone className="iconfont" />
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
    </div>
  )
}
