import React, { useEffect, useState } from 'react';
import { PageHeader, Descriptions, Button, message } from 'antd';
import { store } from '../../redux/store';
import { HearFromDisInfo, HearFromResultInfo, HearFromNewSongInfo } from '../../redux/actions';
import { handleLyric } from '../../hooks/UseMusic/tools/setLyrc';
import './index.css';

export default function MusicInfo() {
  const [musicObj, setMusicObj] = useState({});
  const [musicLyric, setMusicLyric] = useState({});
  const [showRow, setShowRow] = useState(10);

  const getLyric = async () => {
    const data = await React.$apis.request('get', '/lyric', { id: store.getState()?.deliverMusicInfo?.data?.id });
    setMusicLyric(data);
  };

  const showAllRow = () => {
    showRow === 10 ? setShowRow(handleLyric(musicLyric?.lrc?.lyric)?.length) : setShowRow(10);
  };

  // 播放
  const play = async () => {
    if (store.getState()?.deliverMusicInfo?.data?.alg) {
      const musicInfo = await HearFromDisInfo(store.getState()?.deliverMusicInfo?.data);
      store.dispatch(musicInfo);
    } else if (store.getState()?.deliverMusicInfo?.data?.al) {
      const musicInfo = await HearFromResultInfo(store.getState()?.deliverMusicInfo?.data);
      store.dispatch(musicInfo);
    } else if (store.getState()?.deliverMusicInfo?.data?.bMusic) {
      const musicInfo = await HearFromNewSongInfo(store.getState()?.deliverMusicInfo?.data);
      store.dispatch(musicInfo);
    }
  };

  // 喜欢
  const isLove = async () => {
    const res = await React.$apis.request('get', '/like', { id: musicObj.id, like: 'true' });
    if (res.code === 200) {
      message.success('该音乐已添加到喜欢列表');
    }
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
    <div className="singermusicinfo">
      <div className="header">
        <div className="picyrl" style={{ width: '14rem', height: '14rem', borderRadius: '50%', background: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={musicObj?.picUrl || musicObj?.al?.picUrl || musicObj?.album?.blurPicUrl} alt="" style={{ width: '10.125rem', height: '10.125rem', borderRadius: '50%' }} />
        </div>
        {/* 歌曲介绍 */}
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            ghost={false}
            title={musicObj?.song?.name || musicObj?.name}
            subTitle={
              musicObj?.song?.artists[0]?.name ||
              musicObj?.ar?.map((item) => <span key={item.id}>{item.name}&nbsp;&nbsp;&nbsp;</span>) ||
              musicObj?.artists?.map((item) => <span key={item.id}>{item.name}&nbsp;&nbsp;&nbsp;</span>)
            }
          >
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="专辑" style={{ display: 'block' }}>
                {musicObj?.song?.album.name || musicObj?.al?.name || musicObj?.album?.name}
              </Descriptions.Item>
              <Descriptions.Item label="歌词翻译" style={{ display: 'block' }}>
                {musicLyric?.transUser?.nickname ? musicLyric?.transUser?.nickname : '暂无'}
              </Descriptions.Item>
              <Descriptions.Item style={{ display: 'block', marginTop: '1.563rem', marginBottom: '3.125rem' }}>
                <Button
                  type="primary"
                  style={{ marginRight: '1.563rem' }}
                  onClick={() => {
                    play();
                  }}
                >
                  播放 <i className="iconfont icon-play" style={{ paddingLeft: '.375rem' }}></i>
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
              </Descriptions.Item>
              <Descriptions.Item label="" style={{ display: 'block' }}>
                {/* 歌词 */}
                <div>
                  {handleLyric(musicLyric?.lrc?.lyric)
                    ?.slice(0, showRow)
                    .map((item) => {
                      return (
                        <div key={Math.random()} style={{ fontSize: '.938rem', padding: '.313rem' }}>
                          {item.text}
                        </div>
                      );
                    })}
                </div>
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>
        </div>
      </div>
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
    </div>
  );
}
