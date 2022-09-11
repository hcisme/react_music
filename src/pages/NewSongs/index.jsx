import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Table, message, Row, Col } from 'antd';
import { PlayCircleTwoTone, PlusCircleOutlined } from '@ant-design/icons';
import { store } from '../../redux/store';
import { commonPlayMusicFn, hearMusicInfo } from '../../redux/actions';
// 导入处理时间的函数
import { time } from '../../utils/js/timeTool.js';
import { addMusicListFn } from '../../utils/addMusicList';
import './index.css';

export default function NewSongs() {
  let navigate = useNavigate();

  const [cat, setCat] = useState('0');
  const [dataSource, setDataSource] = useState([]);

  const handleClickToggle = e => {
    setCat(e.key);
  };

  const getMusicList = () => {
    React.$apis.getLists(cat).then(val => {
      setDataSource(val);
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
      align: 'center',
      render: item => {
        return (
          <>
            <img className="poster" src={item.album.picUrl} alt="" />
            <PlayCircleTwoTone className="PlayCircleTwoTone" />
          </>
        );
      }
    },
    {
      title: '音乐标题',
      align: 'center',
      render: item => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span
              onClick={e => {
                e.stopPropagation();
                play(item);
              }}
              className="supername anticon"
            >
              {item.name}
            </span>
            {item.mvid ? (
              <span
                className="iconfont icon-movie-line"
                style={{ color: 'red', padding: 3, cursor: 'pointer' }}
                onClick={e => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                  navigate(`/home/mv/${item.mvid}`);
                }}
              ></span>
            ) : (
              ''
            )}
            {item.privilege.maxbr === 999000 ? <span className="iconfont icon-wusunyinzhi" style={{ color: 'red', fontSize: 25, fontWeight: 500 }}></span> : ''}
            {item.fee === 1 ? <span className="iconfont icon-VIP" style={{ color: 'red', fontSize: 25, fontWeight: 500 }}></span> : ''}
          </div>
        );
      }
    },
    {
      title: '歌手',
      align: 'center',
      render: item => {
        return <span>{item.album.artists[0].name}</span>;
      }
    },
    {
      title: '专辑',
      align: 'center',
      render: item => {
        return <span>{item.album.name}</span>;
      }
    },
    {
      title: '时长',
      align: 'center',
      render: item => {
        return <span>{time(item.duration)}</span>;
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
                addMusicListFn({ e, record: item });
              }}
            />
          </div>
        );
      }
    }
  ];

  const play = async item => {
    navigate('/home/song');
    let data = await hearMusicInfo(item);
    store.dispatch(data);
  };

  useEffect(() => {
    getMusicList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat]);

  return (
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <Menu
          style={{ width: '100%' }}
          mode="horizontal"
          onSelect={e => {
            handleClickToggle(e);
          }}
          selectedKeys={cat}
        >
          <Menu.Item key="0">全部</Menu.Item>
          <Menu.Item key="7">华语</Menu.Item>
          <Menu.Item key="96">欧美</Menu.Item>
          <Menu.Item key="8">日本</Menu.Item>
          <Menu.Item key="16">韩国</Menu.Item>
        </Menu>
      </Col>
      <Col span={24}>
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="id"
          pagination={{
            pageSize: 25
          }}
          onRow={record => {
            return {
              onClick: () => {
                handlePlayMusic(record);
              } // 点击行
            };
          }}
        />
      </Col>
    </Row>
  );
}
