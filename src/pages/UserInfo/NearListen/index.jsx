import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider, Card, Avatar, message } from 'antd';
import { time } from '../../../utils/js/timeTool';
import './index.css';

const { Meta } = Card;

export default function NearListen() {
  let navigate = useNavigate();
  const [recentMv, setRecentMv] = useState([]);
  const [recentPlaylists, setRecentPlaylists] = useState([]);

  const getRecentMv = () => {
    React.$apis.nearMV().then(val => {
      setRecentMv(val.list);
    });
  };

  const getRecentPlayLists = () => {
    React.$apis.nearPlayLists().then(val => {
      setRecentPlaylists(val);
    });
  };

  useEffect(() => {
    getRecentMv();
    getRecentPlayLists();
  }, []);

  return (
    <div>
      <div className="nearlisten">
        <Divider orientation="left">最近播放-视频</Divider>
        <div className="recentmv">
          {recentMv.map(item => {
            return (
              <Card
                style={{ width: 300, position: 'relative', cursor: 'pointer' }}
                cover={<img alt="example" src={item.data?.coverUrl} style={{ width: '100%', maxHeight: 170, objectFit: 'cover' }} />}
                key={item.data?.id}
                onClick={() => {
                  typeof item.data?.id === 'string' ? message.info('暂缺资源 请到移动端查看') : navigate(`/home/mv/${item.data?.id}`);
                }}
              >
                <Meta
                  avatar={<Avatar style={{ display: item.data?.creator ? 'block' : 'none' }} src={item.data?.creator?.avatarUrl} />}
                  title={item.data.name || item.data.title}
                  description={item.data?.artists?.map(items => (
                    <div key={items.id}>{items.name}</div>
                  ))}
                />
                <div className="dt">{time(item.data?.duration)}</div>
              </Card>
            );
          })}
        </div>
      </div>

      <div>
        <Divider orientation="left">最近播放-歌单</Divider>
        <div className="recentplaylists">
          {recentPlaylists.map(item => {
            return (
              <div
                className="item cursor"
                key={item.data?.id}
                onClick={() => {
                  navigate(`/home/playlist/${item.data?.id}`);
                }}
              >
                <div className="posterImg">
                  <img src={item.data?.coverImgUrl} alt="" style={{ width: '100%', height: '12.5rem', borderRadius: '0.75rem' }} />
                </div>
                <div className="text" style={{ marginTop: '.5rem' }}>
                  <div className="title wordbreak" style={{ fontSize: '15px' }}>
                    {item.data?.name}
                  </div>
                  <div className="info" style={{ fontSize: '.75rem', opacity: 0.6, marginTop: '.125rem' }}>
                    {`最新歌曲：${item.data?.lastSong?.name}`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
