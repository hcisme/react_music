import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel, Divider, Table, Image, message, notification } from 'antd';
import { PlayCircleTwoTone, PlusCircleOutlined } from '@ant-design/icons';
import { store } from '../../redux/store';
import { commonPlayMusicFn, statusChange, hearMusicInfo } from '../../redux/actions';
import { distinct3 } from '../../utils/js/timeTool.js';
import { UseCard } from '../../hooks';
import './index.css';
// 导入处理时间的函数
import { time } from '../../utils/js/timeTool.js';

export default function Discovery() {
  let navigate = useNavigate();

  const [banners, setBanners] = useState([]);
  const [playLists, setPlayLists] = useState([]);
  const [musics, setMusics] = useState([]);
  const [mvs, setMvs] = useState([]);

  const getbanner = () => {
    React.$apis.getBanners().then(val => {
      setBanners(val);
    });
  };

  const getMusicPlaylists = () => {
    React.$apis.getRecommandPlaylists().then(val => {
      setPlayLists(val);
    });
  };

  const getRecommandMusic = () => {
    React.$apis.recommandMusic().then(val => {
      setMusics(val);
    });
  };

  const getRecommandMv = () => {
    React.$apis.recommandMv().then(val => {
      setMvs(val);
    });
  };

  const handlePlayMusic = async record => {
    const musicInfo = await commonPlayMusicFn(record);
    store.dispatch(musicInfo);
  };

  const isLove = async (e, item) => {
    e.stopPropagation();
    const res = await React.$apis.request('get', '/like', { id: item.id, like: 'true' });
    if (res.code === 200) {
      message.success('该音乐已添加到喜欢列表');
    }
  };

  const columns = [
    {
      title: '封面',
      render: record => {
        return (
          <div className="coverImg" style={{ width: '40px', height: '40px', borderRadius: '5px' }}>
            <img src={record.picUrl} alt="加载失败请重试" style={{ width: '100%', height: '100%', borderRadius: '5px' }} />
            <PlayCircleTwoTone className="PlayCircleTwoTone" />
          </div>
        );
      }
    },
    {
      title: '名称',
      render: item => {
        return (
          <div
            className="supername anticon"
            style={{ transition: '0.3s' }}
            onClick={async e => {
              let ev = e || window.event;
              ev.stopPropagation();
              ev.nativeEvent.stopImmediatePropagation();
              navigate('/home/song');
              let data = await hearMusicInfo(item);
              store.dispatch(data);
            }}
          >
            {item.name}
          </div>
        );
      }
    },
    {
      title: '歌手',
      render: (text, record, index) => {
        return record.song?.album?.artists[0]?.name;
      }
    },
    {
      title: '时长',
      align: 'center',
      render: item => {
        return <span>{time(item.song?.duration)}</span>;
      }
    },
    {
      title: '',
      render: item => {
        return (
          <div style={{ display: 'flex', alignItems: 'center', columnGap: '1.25rem' }}>
            <i
              className="iconfont icon-xihuan"
              onClick={e => {
                isLove(e, item);
              }}
            ></i>
            <PlusCircleOutlined
              onClick={e => {
                addMusicList(e, item);
              }}
            />
          </div>
        );
      }
    }
  ];

  const addMusicList = async (e, item) => {
    e.stopPropagation();
    let localData = JSON.parse(localStorage.getItem('musicList'));
    if (localData !== null) {
      localData.unshift(item);
      // 数组中 对象 查重
      const newArr = distinct3(localData);
      // 单曲名 歌手名 时长 id
      const dealMusicList = newArr.map(item => {
        if (item.id !== 6666666) {
          return {
            ...item,
            songName: item.name,
            singer: item.song?.artists?.map(v => v.name).join(' / '),
            dt: item.song?.duration,
            picUrl: item.picUrl
          };
        }
        return item;
      });

      localStorage.setItem('musicList', JSON.stringify(dealMusicList));

      if (newArr[0].id !== 6666666) {
        notification.success({
          message: '已成功添加到音乐列表'
        });
      }
    }
    store.dispatch(statusChange());
  };

  useEffect(() => {
    getbanner();
    getMusicPlaylists();
    getRecommandMusic();
    getRecommandMv();
  }, []);

  return (
    <div className="discovery">
      {/* 轮播 */}
      <div className="banner">
        <Carousel autoplay effect="fade">
          {banners.map(item => {
            return (
              <div
                key={item.targetId}
                className="disbanner"
                // onClick={async () => {
                //   navigate(`/home/song`)
                //   let data = await hearMusicInfo(item)
                //   store.dispatch(data)
                // }}
              >
                <Image src={item.imageUrl} fallback="http://chcmusic.cloud/images/error.png" />
              </div>
            );
          })}
        </Carousel>
      </div>
      <Divider orientation="left" plain>
        发现歌单
      </Divider>
      <div className="recommandplaylists">
        {playLists.map(item => (
          <div key={item.id}>
            <UseCard id={item.id} picUrl={item.picUrl} name={item.name} alg={item.alg} />
          </div>
        ))}
      </div>
      <Divider orientation="left" plain>
        发现音乐
      </Divider>
      <div className="recommandmusic">
        <Table
          dataSource={musics}
          columns={columns}
          pagination={false}
          rowKey={record => record.id}
          onRow={record => {
            return {
              onClick: () => {
                handlePlayMusic(record);
              } // 点击行
            };
          }}
        />
      </div>
      <Divider orientation="left" plain>
        发现MV
      </Divider>
      <div className="recommandmvs">
        {mvs.map(item => {
          return (
            <div
              className="item cursor"
              key={item.id}
              onClick={() => {
                navigate(`/home/mv/${item.id}`);
              }}
            >
              <div className="posterImg" style={{ position: 'relative' }}>
                <img src={item.picUrl} alt="https://chcmusic.cloud/images/error.png" style={{ width: '100%', height: '9.688rem', borderRadius: '0.75rem' }} />
                <PlayCircleTwoTone
                  className="hover1"
                  style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0, fontSize: '1.65rem' }}
                />
              </div>
              <div className="text" style={{ marginTop: '.5rem' }}>
                <div className="title wordbreak" style={{ fontSize: '15px' }}>
                  {item.name}
                </div>
                <div className="info" style={{ fontSize: '.75rem', opacity: 0.6, marginTop: '.125rem' }}>
                  {item.artists[0]?.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
