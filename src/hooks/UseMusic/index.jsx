import React, { useEffect, useState, useRef } from 'react';
import { Drawer, message, Popover, Table, Button, notification, Slider } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { time, timer } from '../../utils/js/timeTool.js';
import { handleLyric } from './tools/setLyrc.js';
import { store } from '../../redux/store/index.js';
import { commonPlayMusicFn } from '../../redux/actions/index.js';
import './index.css';

const style = { width: '2.188rem', height: '2.188rem', lineHeight: '2.188rem', textAlign: 'center', borderRadius: '.313rem' };
// localStorage 初始化数据
const initState = {
  type: 'HEARFROM',
  id: 6666666,
  url: 'https://chcmusic.cloud/images/%E6%98%A5%E5%A8%87%E4%B8%8E%E5%BF%97%E6%98%8E.mp3',
  songName: '春娇与志明',
  singer: '街道办GOC',
  picUrl: 'https://p2.music.126.net/0KC-cAFqdJHDomIl3dSv4Q==/109951166676094043.jpg',
  lyric: handleLyric(
    '[00:00.000] 作词 : Aline\n[00:01.000] 作曲 : Aline\n[00:02.000] 编曲 : Aline\n[00:20.330]Jcool：\n[00:22.329]有个女仔令我思想变得大过\n[00:25.029]当初\n[00:25.879]我幼稚行为对你犯下大错\n[00:27.579]你话我唔识淋 用钱买无用饰品\n[00:30.329]你慢慢心淡觉得我对感情唔认真\n[00:33.330]要知道男人系天生的小朋友\n[00:36.329]小朋友弱点会忽略另一半感受\n[00:39.080]要改正好简单我只系欠调教\n[00:42.330]经历得多反而可以令到爱意浓厚\n[00:42.830]Vai：\n[00:44.581]志明的世界永远好动带着可爱\n[00:47.330]但有时间迷茫 爱情错过却唔可再\n[00:50.081]从开始走到结尾哪个不会变大个\n[00:53.081]但春娇想要那个你又有谁可以劝阻\n[00:55.831]等待 UFO 纵有变数\n[00:58.079]最普通慨佢哋世上遍布\n[01:01.576]爱漫春天散落每个季节慨消耗\n[01:04.325]看着花瓣跌落过程撑得过衰老\n[01:04.575]欧：\n[01:09.825]重新出发吗 huh 更渴望未来\n[01:12.825]以往这少年懂爱吗\n[01:16.328]仿佛不够\n[01:21.328]成长会进化吗 也信念自由\n[01:25.078]我爱这少年讽刺吗\n[01:28.021]这花开吗\n[01:28.521]留：\n[01:30.271]我爱你 你是唱将我做配合\n[01:32.521]但你予我这过程细致给我培训\n[01:35.524]情与爱 太过复杂 我要太多喘息\n[01:38.274]但你爱我慨以后不会太过忐忑\n[01:41.274]当拥有慨时候 又接近放手\n[01:44.024]循环播放剧情有多少个然后\n[01:46.524]如果系现实我会选择打破现实\n[01:49.274]喺你慨世界里面我会选择慢慢渐入\n[01:49.774]Vai：\n[01:52.527]志明慨世界永远好动带着可爱\n[01:55.024]佢冇时间迷茫 爱情错过却唔可再\n[01:57.774]从开始走到结尾哪个不会变大个\n[02:00.774]但春娇想要那个你又有谁可以劝阻\n[02:03.274]等待 UFO 纵有变数\n[02:06.027]最普通慨佢哋世上遍布\n[02:09.276]爱漫春天散落每个季节慨消耗\n[02:12.026]看着花瓣跌落过程撑得过衰老\n[02:13.026]欧：\n[02:18.026]重新出发吗 huh 更渴望未来\n[02:21.276]以往这少年懂爱吗\n[02:24.526]仿佛不够\n[02:29.027]成长会进化吗 也信念自由\n[02:32.777]我爱这少年讽刺吗\n[02:34.777]这花开吗\n[02:35.527]Garyu：\n[02:37.277]破碎婚姻里出身逼出佢慨硬净\n[02:40.027]佢再牺牲佢慨率真改变佢慨硬颈\n[02:42.780]戴眼镜慨佢明白波珠解决唔到逃避\n[02:45.780]要长大要负责任缩短两个人慨距离\n[02:49.479]美梦里学会感慨\n[02:51.229]你亦放肆你的爱\n[02:53.729]用力转载 越过比赛\n[02:58.729]为我掩盖 都因为爱\n[02:58.979]欧：\n[03:02.979]重新出发吗 huh 更渴望未来\n[03:06.729]以往这少年懂爱吗\n[03:09.479]仿佛不够\n[03:14.229]成长会进化吗 也信念自由\n[03:17.479]我爱这少年讽刺吗\n[03:19.223]这花开吗\n'
  ),
  dt: 205000
};

export default function UseMusic() {
  //#region
  const audio = useRef(null);
  const oCon = useRef(null);
  // 所有事件
  let [overTime, setOverTime] = useState(0);
  // 当前时间
  let [currentTime, setCurrentTime] = useState(0);
  let [n, setN] = useState(0);
  const [visible, setVisible] = useState(false);

  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [songName, setSongName] = useState('');
  const [picUrl, setPicUrl] = useState('https://p2.music.126.net/wjuaGcB2k4I6PqY-cPHCFQ==/109951166889767357.jpg');
  const [lyric, setLyric] = useState([]);
  const [musicList, setMusicList] = useState([]);
  // 引起页面更新的值
  const [num, setNum] = useState(0);
  // 播放类型
  const [playType, setPlayType] = useState('icon-order');
  // 获取当前播放的歌曲索引
  const [currentIndex, setCurrentIndex] = useState(0);
  // 当前播放列表的歌曲id
  const [currentId, setCurrentId] = useState(6666666);
  // 音量
  const [currentVolume, setCurrentVolume] = useState(50);
  const [colIcon, setVolIcon] = useState('iconfont icon-24gf-volumeHigh');
  // 是否播放
  const [isPlay, setIsPlay] = useState('iconfont icon-play chc-iconfont');
  // #endregion

  const fn = ({ singer, lyric, picUrl, songName, url }) => {
    setUrl(url);
    setName(singer);
    setSongName(songName);
    setPicUrl(picUrl);
    setLyric(lyric);
    setTimeout(() => {
      playFunction();
    }, 1500);
  };

  // 播放方法
  const playFunction = () => {
    setIsPlay('iconfont icon-pause chc-iconfont');
    setOverTime(audio.current.duration.toFixed(0));
    audio.current.play();
    if (!audio.current.src) {
      pauseFunction();
      return message.info('此歌曲暂时没有版权, 以为您切换');
    }
    if (audio.current.error?.code === 4) return notification.error({ message: '由于音频在列表存放时间较长，链接已失效，请重新获取有效的音频链接' });
  };
  // 暂停方法
  const pauseFunction = () => {
    setIsPlay('iconfont icon-play chc-iconfont');
    audio.current.pause();
  };
  // 播放 或 暂停
  const playOrPause = () => {
    if (isPlay === 'iconfont icon-play chc-iconfont') {
      playFunction();
    } else {
      pauseFunction();
    }
  };
  // 音频时间更新
  const timeUpdate = () => {
    // 每个歌词块
    const ap = document.querySelectorAll('.chc-lyrc');
    setCurrentTime(parseInt(audio.current.currentTime)); // 当前播放器当前时间
    let newTime = parseInt(audio.current.currentTime);
    if (document.getElementById(newTime)) {
      for (let i = 0; i < ap.length; i++) {
        ap[i].style.color = 'black';
        ap[i].style.background = 'white';
      }
      document.getElementById(newTime).style.background = 'gray';
      document.getElementById(newTime).style.color = 'white';
      if (ap[6 + n]?.id === `${newTime}`) {
        oCon.current.style.top = `${-n * 45}px`;
        setN((n += 1));
      }
      // 改变当前播放时间 获取当前时间进入用户视图
      for (let i = 0; i < ap.length; i++) {
        if (ap[i]?.id === `${newTime}`) {
          oCon.current.style.top = `${-(i - 6) * 45}px`;
        }
      }
    }
  };
  // 播放结束
  const ended = async () => {
    setIsPlay('iconfont icon-play chc-iconfont');
    audio.current.pause();
    setCurrentTime(0);
    oCon.current.style.top = `0px`;
    switch (playType) {
      // 顺序播放
      case 'icon-order':
        if (musicList.length > 1) {
          let index = musicList.findIndex(item => item.url === audio.current.id * 1);
          if (index === musicList.length - 1) {
            setCurrentId(musicList[0].id);
            const { url, picUrl, songName, singer, lyric } = await commonPlayMusicFn(musicList[0]);
            return fn({ url, picUrl, songName, singer, lyric });
          }
          setCurrentId(musicList[index + 1].id);
          const { url, picUrl, songName, singer, lyric } = await commonPlayMusicFn(musicList[0]);
          return fn({ url, picUrl, songName, singer, lyric });
        }
        break;
      // 随机播放
      case 'icon-random':
        const randIndex = Math.round(Math.random() * (musicList.length - 0)) + 0;
        setCurrentId(musicList[randIndex].id);
        const { url, picUrl, songName, singer, lyric } = await commonPlayMusicFn(musicList[randIndex]);
        return fn({ url, picUrl, songName, singer, lyric });
      default:
        break;
    }
  };

  // 重新播放
  const resetMusic = () => {
    audio.current.currentTime = 0;
    playFunction();
  };
  // 音量
  const volumn = () => {
    if (audio.current.muted === false) {
      // 点击后静音
      setCurrentVolume(0);
      audio.current.volume = 0;
      setVolIcon('iconfont icon-24gf-volumeCross');
      audio.current.muted = true;
    } else if (audio.current.muted === true) {
      // 不静音
      setCurrentVolume(50);
      audio.current.volume = 0.5;
      setVolIcon('iconfont icon-24gf-volumeHigh');
      audio.current.muted = false;
    }
  };
  // 点击歌词指定播放位置
  const appointNode = item => {
    playFunction();
    let time = (item.time / 1000).toFixed(0);
    audio.current.currentTime = time;
    setCurrentTime(time);
    message.info('点击歌词后会失去滚动效果');
  };

  // 下一首 ok
  const nextMusic = async () => {
    // 获取当前播放的歌曲索引
    const index = musicList.findIndex(item => item.id === audio.current.id * 1);
    if (index === musicList.length - 1) {
      const { url, picUrl, songName, singer, lyric } = await commonPlayMusicFn(musicList[0]);
      setCurrentId(musicList[0].id);
      return fn({ url, picUrl, songName, singer, lyric });
    }
    setCurrentId(musicList[index + 1].id);
    const { url, picUrl, songName, singer, lyric } = await commonPlayMusicFn(musicList[index + 1]);
    return fn({ url, picUrl, songName, singer, lyric });
  };

  // 上一首 ok
  const prevMusic = async () => {
    // 获取当前播放的歌曲索引
    const index = musicList.findIndex(item => item.id === audio.current.id * 1);
    if (index === 0) {
      return message.info('已经是第一首了哦！');
    }
    setCurrentId(musicList[index - 1].id);
    const { url, picUrl, songName, singer, lyric } = await commonPlayMusicFn(musicList[index - 1]);
    return fn({ url, picUrl, songName, singer, lyric });
  };

  useEffect(() => {
    const { singer, lyric, picUrl, songName, url } = store.getState()?.mainReducer;
    setUrl(url);
    setName(singer);
    setSongName(songName);
    setPicUrl(picUrl);
    setLyric(lyric);

    setMusicList(JSON.parse(localStorage.getItem('musicList')));

    if (!localStorage.getItem('musicList')) {
      localStorage.setItem('musicList', JSON.stringify([initState]));
      setMusicList(JSON.parse(localStorage.getItem('musicList')));
    }

    setTimeout(() => {
      // 页面初始化 获取当前播放的歌曲索引
      let index = musicList.findIndex(item => item.id === audio.current.id * 1);
      setCurrentIndex(index);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  store.subscribe(() => {
    if (store.getState()?.mainReducer?.id && store.getState()?.mainReducer?.id !== 6666666) {
      const { singer, lyric, picUrl, songName, url } = store.getState()?.mainReducer;
      setUrl(url);
      setName(songName);
      setSongName(singer);
      setPicUrl(picUrl || 'https://p2.music.126.net/wjuaGcB2k4I6PqY-cPHCFQ==/109951166889767357.jpg');
      setLyric(lyric);
      setMusicList(JSON.parse(localStorage.getItem('musicList')));
      setTimeout(() => {
        playFunction();
      }, 1000);
    } else {
      setNum(store.getState()?.mainReducer.num);
    }
  });

  useEffect(() => {
    if (num !== 0) {
      setMusicList(JSON.parse(localStorage.getItem('musicList')));
    }
  }, [num]);

  // 音乐列表
  const columns = [
    {
      title: '',
      width: '15%',
      render: (text, record, index) => index + 1
    },
    {
      title: '单曲',
      dataIndex: 'songName'
    },
    {
      title: '歌手',
      dataIndex: 'singer'
    },
    {
      title: '',
      width: '10%',
      render: item => time(item.dt)
    },
    {
      title: '',
      width: '5%',
      render: (text, item, index) => {
        return (
          item.id !== 6666666 && (
            <CloseCircleOutlined
              style={{ cursor: 'pointer' }}
              onClick={e => {
                delMusic(e, index);
              }}
            />
          )
        );
      }
    }
  ];

  const content = (
    <div>
      <Button
        type="dashed"
        size="small"
        onClick={() => {
          clearAll();
        }}
        style={{ display: 'flex', flexDirection: 'column', marginLeft: 'auto' }}
      >
        Clear All
      </Button>
      <Table
        size="small"
        scroll={{ y: 300 }}
        dataSource={musicList}
        pagination={false}
        columns={columns}
        rowKey="id"
        onRow={record => {
          return {
            onClick: () => {
              toplay(record);
              setCurrentId(record.id);
            }
          };
        }}
      />
    </div>
  );

  const toplay = async record => {
    if (record.id !== 6666666) {
      const { url, picUrl, songName, singer, lyric } = await commonPlayMusicFn(record);
      return fn({ url, picUrl, songName, singer, lyric });
    }
    console.log(record);
    return fn({ url: record.url, picUrl: record.picUrl, songName: record?.songName, singer: record?.singer, lyric: record.lyric });
  };

  // 删除音乐
  const delMusic = (e, index) => {
    e.stopPropagation();
    let arr = JSON.parse(localStorage.getItem('musicList'));
    arr.splice(index, 1);
    localStorage.setItem('musicList', JSON.stringify(arr));
    let arrList = JSON.parse(localStorage.getItem('musicList'));
    setMusicList(arrList);
    notification.success({
      message: '已删除'
    });
  };

  // 清空播放列表
  const clearAll = () => {
    localStorage.removeItem('musicList');
    localStorage.setItem('musicList', JSON.stringify([initState]));
    setMusicList([]);
    notification.success({
      message: '已清空'
    });
  };

  // 切换播放模式
  const changePlayType = () => {
    switch (playType) {
      case 'icon-order':
        setPlayType('icon-random');
        break;
      case 'icon-random':
        setPlayType('icon-order');
        break;
      default:
        break;
    }
  };

  // 喜欢音乐
  const isLove = async () => {
    if (musicList[musicList.length - 1]?.id === 6666666) return message.info('该歌曲暂不支持添加到喜欢');
    const res = await React.$apis.request('get', '/like', { id: musicList[currentIndex]?.id, like: 'true' });
    if (res.code === 200) return message.success('该音乐已添加到喜欢列表');
  };

  // 改变音量
  const changeVolume = (
    <Slider
      onChange={value => {
        Volume(value);
      }}
      max={100}
      min={0}
      value={currentVolume}
    />
  );

  const Volume = value => {
    setCurrentVolume(value);
    audio.current.volume = value / 100;
    if (value === 0) {
      setVolIcon('iconfont icon-24gf-volumeCross');
      return;
    } else if (value !== 0) {
      setVolIcon('iconfont icon-24gf-volumeHigh');
    }
  };

  return (
    <div>
      <div id="aplayer">
        {/* <!-- 海报 --> */}
        <div
          className="pic"
          onClick={() => {
            setVisible(true);
          }}
        >
          <img src={picUrl || 'https://p2.music.126.net/wjuaGcB2k4I6PqY-cPHCFQ==/109951166889767357.jpg'} alt="" />
        </div>
        {/* 歌曲信息 */}
        <div className="musicinfo">
          <span className="wordbreaks">{songName}</span>
          <span className="wordbreaks">- {name}</span>
        </div>
        {/* <!-- 播放插件 --> */}
        <div className="play_plug">
          <div
            className="restartplay hover"
            style={style}
            onClick={() => {
              resetMusic();
            }}
          >
            <i className="iconfont icon-zhongxinkaishi"></i>
          </div>
          {/* 喜欢按钮 */}
          <div
            style={style}
            className="hover love"
            onClick={() => {
              isLove();
            }}
          >
            <i className="iconfont icon-xihuan" style={{ fontSize: '1.25rem' }}></i>
          </div>
          <div className="play_pause">
            <div
              style={style}
              className="hover"
              onClick={() => {
                prevMusic();
              }}
            >
              <i className="iconfont icon-prev"></i>
            </div>
            <div
              style={style}
              className="hover"
              onClick={() => {
                playOrPause();
              }}
            >
              <i className={isPlay}></i>
            </div>

            <div
              style={style}
              className="hover"
              onClick={() => {
                nextMusic();
              }}
            >
              <i className="iconfont icon-next"></i>
            </div>
          </div>
          <div
            className="playOrder order hover"
            onClick={() => {
              changePlayType();
            }}
            style={style}
          >
            <i className={`iconfont ${playType}`} style={{ color: '#707070' }}></i>
          </div>
          <div className="volumn hover" style={style}>
            <Popover content={changeVolume} title="音量" trigger="hover">
              <i
                className={colIcon}
                style={{ color: '#707070', fontSize: '1.25rem' }}
                onClick={() => {
                  volumn();
                }}
              ></i>
            </Popover>
          </div>
          <div className="hover chc-music-list" style={style}>
            <Popover content={content} title="音乐列表" trigger="hover" placement="topRight" overlayClassName="chc-popover-list">
              <i className="iconfont icon-24gf-playlistMusic5"></i>
            </Popover>
          </div>
        </div>
        {/* <!-- 歌词按钮 --> */}
        <div
          className="icon-lyric hover"
          style={style}
          onClick={() => {
            setVisible(true);
          }}
        >
          <i className="iconfont icon-bottom lyric_btn"></i>
        </div>
        {/* <!-- 音乐进度条 --> */}
        <Slider
          max={overTime}
          min={0}
          value={currentTime}
          className="progress"
          tipFormatter={() => {
            return timer(currentTime);
          }}
          onChange={value => {
            setCurrentTime(value);
            audio.current.currentTime = value;
          }}
        />
      </div>

      <Drawer
        title={name}
        placement={'bottom'}
        height="100%"
        forceRender={true}
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
      >
        {/* 歌词蒙版 */}
        <div className="lyrc-pic lyricRef">
          <div className="lyric-poster">
            <img src={picUrl} alt="https://p2.music.126.net/wjuaGcB2k4I6PqY-cPHCFQ==/109951166889767357.jpg" style={{ borderRadius: '.313rem', objectFit: 'cover' }} />
            <span style={{ fontSize: '.938rem' }}>
              {name} - <span style={{ fontSize: '.75rem' }}>{songName}</span>
            </span>
            <div className="miniplugin">
              <span>{timer(currentTime)}</span>
              <Slider
                max={overTime}
                min={0}
                value={currentTime}
                className="progress"
                tipFormatter={null}
                onChange={value => {
                  setCurrentTime(value);
                  audio.current.currentTime = value;
                }}
              />
              <span>{timer(overTime)}</span>
            </div>
            <div className="miniplay_pause">
              <div className="play_pause">
                <div style={style} className="hover">
                  <i
                    className="iconfont icon-prev"
                    onClick={() => {
                      prevMusic();
                    }}
                  ></i>
                </div>
                <div style={style} className="hover">
                  <i
                    className={isPlay}
                    onClick={() => {
                      playOrPause();
                    }}
                  ></i>
                </div>
                <div style={style} className="hover">
                  <i
                    className="iconfont icon-next"
                    onClick={() => {
                      nextMusic();
                    }}
                  ></i>
                </div>
              </div>
              <div className="volumn" style={{ position: 'relative', justifySelf: 'end' }}>
                <i
                  className={colIcon}
                  onClick={() => {
                    volumn();
                  }}
                  style={{ color: '#707070', fontSize: '1.25rem' }}
                ></i>
              </div>
            </div>
          </div>
          {/* 歌词 */}
          <div className="lyric">
            <div className="content" ref={oCon} style={{ height: '100%', position: 'relative', top: 0, transition: '.7s' }}>
              {lyric?.map((item, index) => {
                return (
                  <div
                    className="chc-lyrc"
                    style={{ textAlign: 'center' }}
                    id={(item.time / 1000).toFixed(0)}
                    key={index}
                    onClick={() => {
                      appointNode(item, index);
                    }}
                  >
                    {item.text}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Drawer>
      <audio
        onTimeUpdate={() => {
          timeUpdate();
        }}
        onEnded={() => {
          ended();
        }}
        ref={audio}
        src={url}
        id={currentId}
        style={{ display: 'none' }}
      ></audio>
    </div>
  );
}
