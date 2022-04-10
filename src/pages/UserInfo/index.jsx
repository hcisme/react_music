import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { Avatar, Card, Comment, Menu, Divider, BackTop, Spin, Popover, Descriptions } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import { time, dayjs } from '../../utils/js/timeTool'
import PubSub from 'pubsub-js'
import './index.css'
import UseMusic from '../../hooks/UseMusic'

const { Meta } = Card
const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
  marginLeft: 90,
}

export default function UserInfo() {
  let location = useLocation()
  let navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({})
  const [lovePlaylistsInfo, setLovePlaylistsInfo] = useState({})
  const [accountInfo, setAccountInfo] = useState({})
  const [nearMusic, setNearMusic] = useState([])
  const [isshow, setIsShow] = useState(true)
  const [userDetail, setUserDetail] = useState({})

  const getStatus = () => {
    React.$apis.loginStatus().then((val) => {
      setUserInfo(val)
    })
  }

  const getPlaylists = () => {
    setIsShow(true)
    React.$apis.getPlaylists(localStorage.getItem('id')).then((val) => {
      val && setLovePlaylistsInfo(val[0])
      setIsShow(false)
    })
  }

  const nearMusics = () => {
    React.$apis.nearMusic().then((val) => {
      setNearMusic(val.list)
    })
  }

  const toPlay = (record) => {
    React.$apis.getlyrc(record.resourceId).then((lyrc) => {
      const Info = { id: record.resourceId, posterUrl: record.data?.al?.picUrl, name: record.data?.al?.name, artistName: record.data?.ar[0]?.name, lyrc: lyrc.lyric }
      PubSub.publish('ids', Info)
    })
  }

  const handleClick = (e) => {
    navigate(e.key)
  }

  const getDetailInfo = async () => {
    const val = await React.$apis.accountDetail()
    setAccountInfo(val)
  }

  const getUserDetail = async () => {
    const val = await React.$apis.vip()
    setUserDetail(val)
  }

  useEffect(() => {
    getStatus()
    getPlaylists()
    nearMusics()
    getDetailInfo()
    getUserDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const personInfo = (
    <Descriptions>
      <Descriptions.Item label="昵称">{accountInfo.profile?.nickname}</Descriptions.Item>
      <Descriptions.Item label="性别">{accountInfo.profile?.gender === 1 ? '男' : accountInfo.profile?.gender === 2 ? '女' : '保密'}</Descriptions.Item>
      <Descriptions.Item label="生日">{dayjs(accountInfo.profile?.birthday)}</Descriptions.Item>
      <Descriptions.Item label="等级">{userDetail.level}</Descriptions.Item>
      <Descriptions.Item label="UID">{accountInfo.profile?.userId}</Descriptions.Item>
      <Descriptions.Item label="网龄">{userDetail.createDays}&nbsp;天</Descriptions.Item>
      <Descriptions.Item label="累计听歌">{userDetail.listenSongs}&nbsp;首</Descriptions.Item>
      <Descriptions.Item label="注册时间">{dayjs(accountInfo.profile?.createTime)}</Descriptions.Item>
      <Descriptions.Item label="LastLoginTime">{dayjs(accountInfo.profile?.lastLoginTime)}</Descriptions.Item>
      <Descriptions.Item label="个性签名">{accountInfo.profile?.signature}</Descriptions.Item>
    </Descriptions>
  )

  return (
    <div className="userinfo">
      {/* 前进后退路由 */}
      <div className="direction">
        <i
          className="iconfont icon-fl-jia"
          onClick={() => {
            navigate('/home/discovery')
          }}
        ></i>
        <i
          className="iconfont icon-right"
          onClick={() => {
            window.history.go(-1)
          }}
        ></i>
        <i
          className="iconfont icon-tubiaozhizuo--"
          onClick={() => {
            window.history.go(1)
          }}
        ></i>
      </div>
      <div className="info" style={{ marginBottom: 20 }}>
        <Popover placement="bottomLeft" title="详细信息" content={personInfo} trigger="hover" overlayClassName={'pop'}>
          <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} src={userInfo.profile?.avatarUrl} style={{ marginRight: 20, cursor: 'pointer' }} />
        </Popover>
        <span style={{ fontSize: 25 }}>{userInfo.profile?.nickname}</span>
      </div>
      <div className="user-playlists" style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Spin spinning={isshow}>
          <Card
            style={{ width: 250, marginRight: 30, cursor: 'pointer' }}
            cover={<img alt="example" src={lovePlaylistsInfo.coverImgUrl} />}
            onClick={() => {
              navigate(`/home/playlist/${lovePlaylistsInfo.id}`)
            }}
          >
            <Meta avatar={<Avatar src={lovePlaylistsInfo.creator?.avatarUrl} />} title={lovePlaylistsInfo.name} description={lovePlaylistsInfo.description ? lovePlaylistsInfo.description : '这个人很懒 什么也没留下'} />
          </Card>
        </Spin>
        <div className="near-music">
          <span>最近播放-歌曲</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {nearMusic.map((item) => {
              return (
                <Comment
                  key={item.resourceId}
                  author={<span>{item.data?.al?.name}</span>}
                  avatar={<Avatar src={item.data?.al?.picUrl} alt="Han Solo" />}
                  content={<p>{item.data?.ar[0]?.name}</p>}
                  datetime={<span>{time(item.data?.dt)}</span>}
                  onClick={() => {
                    toPlay(item)
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>
      <Divider />
      <div className="own">
        <Menu
          onClick={(e) => {
            handleClick(e)
          }}
          selectedKeys={[location.pathname]}
          mode="horizontal"
        >
          <Menu.Item key="/userinfo/playlists" icon={<i className="iconfont icon-a-2_wodegedan2" style={{ fontSize: 16 }} />}>
            我的歌单
          </Menu.Item>
          <Menu.Item key="/userinfo/recent" icon={<i className="iconfont icon-zuijinliulan" style={{ fontSize: 16 }} />}>
            最近
          </Menu.Item>
        </Menu>

        <div style={{ padding: '15px 10px' }}>
          <Outlet></Outlet>

          <div className="thanks" style={{ display: 'flex', justifyContent: 'center', paddingTop: 10 }}>
            <div>
              <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_black">
                辽ICP备2021010497号-2
              </a>
            </div>
            <div>
              <a href="https://github.com/Binaryify/NeteaseCloudMusicApi" target="_black">
                感谢 <GithubOutlined />
                @binaryify
              </a>
            </div>
            <div>
              <a href="https://github.com/DIYgod/APlayer" target="_black">
                感谢 <GithubOutlined />
                @DIYgod
              </a>
            </div>
          </div>
        </div>
      </div>

      <UseMusic></UseMusic>

      <BackTop style={{ marginBottom: 40 }}>
        <div style={style}>UP</div>
      </BackTop>
    </div>
  )
}
