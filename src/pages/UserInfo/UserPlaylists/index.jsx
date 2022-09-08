import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseCard } from '../../../hooks';
import './index.css';

export default function UserPlaylists() {
  let navigate = useNavigate();

  const [userPlaylistsInfo, setUserPlaylistsInfo] = useState([]);

  const getPlaylists = () => {
    React.$apis.getPlaylists(localStorage.getItem('id')).then(val => {
      setUserPlaylistsInfo(val);
    });
  };

  useEffect(() => {
    getPlaylists();
  }, []);

  return (
    <div className="userplaylists">
      {userPlaylistsInfo?.map(item => {
        const { id, coverImgUrl, name, description = '这个人很懒 什么也没留下' } = item;
        return <UseCard id={id} picUrl={coverImgUrl} name={name} alg={description} />;
      })}
    </div>
  );
}
