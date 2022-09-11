import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { UseCard } from '../../../hooks';
import './index.css';

export default function UserPlaylists() {
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
    <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
      {userPlaylistsInfo?.map(item => {
        const { id, coverImgUrl, name, description = '这个人很懒 什么也没留下' } = item;
        return (
          <Col xs={12} sm={8} md={6} lg={4} key={item.id}>
            <UseCard id={id} picUrl={coverImgUrl} name={name} alg={description} />
          </Col>
        );
      })}
    </Row>
  );
}
