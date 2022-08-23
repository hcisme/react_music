import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Pagination, Descriptions, Table, Tabs, Skeleton, message, notification } from 'antd';
import { PlayCircleTwoTone, PlusCircleOutlined } from '@ant-design/icons';
import { time } from '../../utils/js/timeTool';
import { HearFromResultInfo, statusChange, hearMusicInfo } from '../../redux/actions';
import { distinct3 } from '../../utils/js/timeTool.js';
import { store } from '../../redux/store';
import './index.css';

const { TabPane } = Tabs;

export default function Result() {
  let params = useParams();
  let navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [isHid, setIsHid] = useState(true);
  const [tabsPage, setTabsPage] = useState('songs');
  const [loading, setLoading] = useState(true);

  const getSearchResult = () => {
    React.$apis.searchres(params.searchword, tabsPage === 'songs' ? 1 : tabsPage === 'mvs' ? 1004 : tabsPage === 'playlists' ? 1000 : '', page).then((val) => {
      if (val.songs) {
        setDataSource(val.songs);
        setTotal(val.songCount);
        setLoading(false);
      } else if (val.mvs) {
        setDataSource(val.mvs);
        setTotal(val.mvCount);
      } else if (val.playlists) {
        setDataSource(val.playlists);
        setTotal(val.playlistCount);
      }
      setLoading(false);
      setIsHid(false);
    });
  };

  const isLove = async (e, item) => {
    e.stopPropagation();
    const res = await React.$apis.request('get', '/like', { id: item.id, like: 'true' });
    if (res.code === 200) return message.success('该音乐已添加到喜欢列表');
  };

  const columns = [
    {
      title: '歌曲',
      render: (item) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span
              onClick={(e) => {
                e.stopPropagation();
                play(item);
              }}
              className="supername anticon"
            >
              {item.name}
            </span>
            {item.mv ? (
              <span
                className="iconfont icon-movie-line"
                style={{ color: 'red', padding: 3, cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                  navigate(`/home/mv/${item.mv}`);
                }}
              ></span>
            ) : (
              ''
            )}
            {item.privilege?.maxbr === 999000 ? <span className="iconfont icon-wusunyinzhi" style={{ color: 'red', fontSize: 25, fontWeight: 500 }}></span> : ''}
            {item.fee === 1 ? <span className="iconfont icon-VIP" style={{ color: 'red', fontSize: 25, fontWeight: 500 }}></span> : ''}
          </div>
        );
      },
    },
    {
      title: '歌手',
      render: (item) => {
        return item.ar?.map((record) => {
          return <div key={record.id}>{record.name}</div>;
        });
      },
    },
    {
      title: '专辑',
      render: (item) => {
        return item.al?.name;
      },
    },
    {
      title: '时长',
      render: (item) => {
        return time(item.dt);
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
                isLove(e, item);
              }}
            ></i>
            <PlusCircleOutlined
              onClick={(e) => {
                addMusicList(e, item);
              }}
            />
          </div>
        );
      },
    },
  ];

  const addMusicList = async (e, item) => {
    e.stopPropagation();
    let initData = await HearFromResultInfo(item);
    let localData = JSON.parse(localStorage.getItem('musicList'));
    if (localData !== null) {
      localData.unshift(initData);
      // 数组中 对象 查重
      let newArr = distinct3(localData);
      localStorage.setItem('musicList', JSON.stringify(newArr));

      if (newArr[0].id !== 6666666) {
        notification.success({
          message: '已成功添加到音乐列表',
        });
      }
    }
    store.dispatch(statusChange());
  };

  useEffect(() => {
    getSearchResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, tabsPage]);

  useEffect(() => {
    getSearchResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.searchword]);

  const callback = (e) => {
    setPage(1);
    setLoading(true);
    setTabsPage(e);
  };

  // mvs
  const renderMvsList = (
    <div className="mvs">
      {dataSource.map((item) => {
        return (
          <Skeleton style={{ width: 300 }} loading={loading} avatar active key={item.id}>
            <div
              className="item cursor"
              onClick={() => {
                navigate(`/home/mv/${item.id}`);
              }}
            >
              <div className="posterImg" style={{ position: 'relative' }}>
                <img src={item.cover} alt="https://chcmusic.cloud/images/error.png" style={{ width: '100%', height: '9.688rem', borderRadius: '0.75rem' }} />
                <PlayCircleTwoTone className="hover1" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0, fontSize: '1.65rem' }} />
              </div>
              <div className="text" style={{ marginTop: '.5rem' }}>
                <div className="title wordbreak" style={{ fontSize: '15px' }}>
                  {item.name}
                </div>
                <div className="info" style={{ fontSize: '.75rem', opacity: 0.6, marginTop: '.125rem' }}>
                  {item.artistName}
                </div>
              </div>
            </div>
          </Skeleton>
        );
      })}
    </div>
  );

  // playlists
  const renderPlaylistsLst = (
    <div className="playlists">
      {dataSource.map((item) => {
        return (
          <div
            className="item cursor"
            key={item.id}
            onClick={() => {
              navigate(`/home/playlist/${item.id}`);
            }}
          >
            <div className="posterImg" style={{ position: 'relative' }}>
              <img src={item.coverImgUrl} alt="https://chcmusic.cloud/images/error.png" style={{ width: '100%', height: '100%', borderRadius: '0.75rem' }} />
              <PlayCircleTwoTone className="hover1" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0, fontSize: '1.65rem' }} />
            </div>
            <div className="text" style={{ marginTop: '.5rem' }}>
              <div className="title wordbreak" style={{ fontSize: '15px' }}>
                {item.name}
              </div>
              <div className="info" style={{ fontSize: '.75rem', opacity: 0.6, marginTop: '.125rem' }}>
                {item.creator?.nickname}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const play = async (item) => {
    navigate('/home/song');
    let data = await hearMusicInfo(item);
    store.dispatch(data);
  };

  return (
    <div className="result">
      <div style={{ display: 'grid', gridTemplateColumns: '4.375rem 21.875rem' }}>
        <img src={dataSource[0]?.al?.picUrl || dataSource[0]?.cover || dataSource[0]?.coverImgUrl} alt="" style={{ width: '4.375rem', height: '4.375rem', borderRadius: '.313rem' }} />
        <Descriptions title={params.searchword} style={{ padding: '0 70px' }}>
          <Descriptions.Item label="结果">{total}首</Descriptions.Item>
        </Descriptions>
      </div>

      <Tabs
        activeKey={tabsPage}
        onChange={(e) => {
          callback(e);
        }}
      >
        <TabPane tab="单曲" key="songs">
          <Table
            dataSource={dataSource}
            columns={columns}
            rowKey={(item) => item.id}
            pagination={false}
            loading={isHid}
            onRow={(record) => {
              return {
                // 点击行
                onClick: async () => {
                  const musicInfo = await HearFromResultInfo(record);
                  store.dispatch(musicInfo);
                },
              };
            }}
          />
        </TabPane>
        <TabPane tab="MV" key="mvs">
          {renderMvsList}
        </TabPane>
        <TabPane tab="歌单" key="playlists">
          {renderPlaylistsLst}
        </TabPane>
      </Tabs>

      <div className="page" style={{ width: '100%', textAlign: 'center', marginTop: 20 }}>
        <Pagination
          current={page}
          total={total}
          showSizeChanger={false}
          onChange={(current) => {
            setPage(current);
          }}
        />
      </div>
    </div>
  );
}
