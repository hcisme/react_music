import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'


export default function UserPlaylists() {
  let navigate = useNavigate()

  const [userPlaylistsInfo, setUserPlaylistsInfo] = useState([])

  const getPlaylists = () => {
    React.$apis.getPlaylists(localStorage.getItem('id')).then((val) => {
      setUserPlaylistsInfo(val)
    })
  }

  useEffect(() => {
    getPlaylists()
  }, [])

  return (
    <div className="userplaylists">
      {userPlaylistsInfo?.map((item) => {
        return (
          <div
            className="item cursor"
            key={item.id}
            onClick={() => {
              navigate(`/home/playlist/${item.id}`)
            }}
          >
            <div className="posterImg">
              <img src={item.coverImgUrl} alt="" style={{ width: '100%', maxHeight: '12.5rem', borderRadius: '0.75rem' }} />
            </div>
            <div className="text" style={{ marginTop: '.5rem' }}>
              <div className="title wordbreak" style={{ fontSize: '15px' }}>
                {item.name}
              </div>
              <div className="info wordbreak" style={{ fontSize: '.75rem', opacity: 0.6, marginTop: '.125rem' }}>
                {item.description ? item.description : '这个人很懒 什么也没留下'}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
