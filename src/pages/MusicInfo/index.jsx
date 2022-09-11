import React, { useEffect, useState } from 'react';
import { PageHeader, Descriptions, Button, message, Row, Col, Space } from 'antd';
import { store } from '../../redux/store';
import { commonPlayMusicFn } from '../../redux/actions';
import { handleLyric } from '../../hooks/UseMusic/tools/setLyrc';
import './index.css';

export default function MusicInfo() {
  const [musicObj, setMusicObj] = useState({});
  const [musicLyric, setMusicLyric] = useState({});
  const [showRow, setShowRow] = useState(10);

  const getLyric = async () => {
    const data = await React.$apis.request('get', '/lyric', { id: store.getState()?.deliverMusicInfo?.data?.id });
    console.log(store.getState()?.deliverMusicInfo?.data);
    setMusicLyric(data);
  };

  const showAllRow = () => {
    showRow === 10 ? setShowRow(handleLyric(musicLyric?.lrc?.lyric)?.length) : setShowRow(10);
  };

  // 播放
  const play = async () => {
    const musicInfo = await commonPlayMusicFn(store.getState()?.deliverMusicInfo?.data);
    store.dispatch(musicInfo);
  };

  // 喜欢
  const isLove = async () => {
    const res = await React.$apis.request('get', '/like', { id: musicObj.id, like: 'true' });
    if (res.code === 200) message.success('该音乐已添加到喜欢列表');
    message.info('您的操作有误');
  };

  useEffect(() => {
    setTimeout(() => {
      setMusicObj(store.getState()?.deliverMusicInfo?.data);
      getLyric();
    }, 500);

    return () => {
      setMusicObj({});
      setMusicLyric({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
      <Col span={12}>
        <Row justify="end">
          <Row justify="center" align="middle" style={{ width: '14rem', height: '14rem', borderRadius: '50%', background: '#f5f5f5' }}>
            <img
              src={musicObj?.picUrl || musicObj?.al?.picUrl || musicObj?.album?.blurPicUrl}
              alt=""
              style={{ width: '10.125rem', height: '10.125rem', borderRadius: '50%' }}
            />
          </Row>
        </Row>
      </Col>
      {/* 歌曲介绍 */}
      <Col span={12} className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          title={musicObj?.song?.name || musicObj?.name}
          subTitle={
            musicObj?.song?.artists[0]?.name ||
            musicObj?.ar?.map(item => <span key={item.id}>{item.name}&nbsp;&nbsp;&nbsp;</span>) ||
            musicObj?.artists?.map(item => <span key={item.id}>{item.name}&nbsp;&nbsp;&nbsp;</span>)
          }
        >
          <Descriptions size="small" column={1}>
            <Descriptions.Item label="专辑">{musicObj?.song?.album.name || musicObj?.al?.name || musicObj?.album?.name}</Descriptions.Item>
            <Descriptions.Item label="歌词翻译">{musicLyric?.transUser?.nickname ? musicLyric?.transUser?.nickname : '暂无'}</Descriptions.Item>
            <Descriptions.Item>
              <Space size="large">
                <Button
                  type="primary"
                  onClick={() => {
                    play();
                  }}
                >
                  <Space align="small" size={3}>
                    <span>播放</span>
                    <i className="iconfont icon-play"></i>
                  </Space>
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    isLove();
                  }}
                >
                  喜欢 ❤
                </Button>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item>
              {/* 歌词 */}
              <Space direction="vertical">
                {handleLyric(musicLyric?.lrc?.lyric)
                  ?.slice(0, showRow)
                  .map((item, index) => {
                    return (
                      <Col key={index} style={{ fontSize: 17 }}>
                        {item.text}
                      </Col>
                    );
                  })}
              </Space>
            </Descriptions.Item>
            <Descriptions>
              <span
                style={{ cursor: 'pointer', color: '#40a9ff' }}
                onClick={() => {
                  showAllRow();
                }}
              >
                {showRow === 10 ? (
                  <div style={{ textAlign: 'center' }}>
                    展开 <i className="iconfont icon-bottom"></i>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    收起 <i className="iconfont icon-bottom" style={{ display: 'inline-block', transform: 'rotate(180deg)' }}></i>
                  </div>
                )}
              </span>
            </Descriptions>
          </Descriptions>
        </PageHeader>
      </Col>
    </Row>
  );
}
