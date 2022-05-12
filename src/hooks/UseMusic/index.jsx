import React, { useEffect, useState, useRef } from 'react'
import { Drawer, message } from 'antd'
import { timer } from '../../utils/js/timeTool.js'
import store from '../../redux/store/index.js'
import './index.css'

const style = { width: '2.188rem', height: '2.188rem', lineHeight: '2.188rem', textAlign: 'center', borderRadius: '.313rem' }

export default function UseMusic() {
  //#region
  const audio = useRef(null)
  const oCon = useRef(null)
  const isPlay = useRef(null)
  const progress = useRef(null)
  const lyric_btn = useRef(null)
  const restartPlay = useRef(null)
  const volume = useRef(null)
  const isMiniPlay = useRef(null)
  const minivolume = useRef(null)
  // #endregion
  let [beginTime, setBeginTime] = useState(0)
  let [overTime, setOverTime] = useState(0)
  let [n, setN] = useState(0)
  const [visible, setVisible] = useState(false)

  const [url, setUrl] = useState('')
  const [name, setName] = useState('')
  const [songName, setSongName] = useState('')
  const [picUrl, setPicUrl] = useState('')
  const [lyric, setLyric] = useState([])

  // 播放方法
  const playFunction = () => {
    isPlay.current.className = 'iconfont icon-pause chc-iconfont'
    isMiniPlay.current.className = 'iconfont icon-pause chc-iconfont'
    setOverTime(audio.current.duration.toFixed(0))
    audio.current.play()
  }
  // 暂停
  const pauseFunction = () => {
    isPlay.current.className = 'iconfont icon-play chc-iconfont'
    isMiniPlay.current.className = 'iconfont icon-play chc-iconfont'
    audio.current.pause()
  }
  // 播放 或 暂停
  const playOrPause = () => {
    if (isPlay.current.className === 'iconfont icon-play chc-iconfont') {
      playFunction()
    } else {
      pauseFunction()
    }
  }
  // 音频时间更新
  const timeUpdate = () => {
    // 每个歌词块
    const ap = document.querySelectorAll('.chc-lyrc')
    setBeginTime(parseInt(audio.current.currentTime)) // 当前播放器当前时间
    let newTime = parseInt(audio.current.currentTime)
    if (document.getElementById(newTime)) {
      for (let i = 0; i < ap.length; i++) {
        ap[i].style.color = 'black'
        ap[i].style.background = 'white'
      }
      document.getElementById(newTime).style.background = 'gray'
      document.getElementById(newTime).style.color = 'white'
      if (ap[6 + n].id === `${newTime}`) {
        oCon.current.style.top = `${-n * 45}px`
        setN((n += 1))
      }
    }
  }
  // 结束
  const ended = () => {
    isPlay.current.className = 'iconfont icon-play chc-iconfont'
    isMiniPlay.current.className = 'iconfont icon-play chc-iconfont'
    audio.current.pause()
    progress.current.value = 0
    oCon.current.style.top = `0px`
  }
  // 是否显示歌词蒙版（黑色背景）
  const showDrawer = () => {
    setVisible(true)
  }
  // 重新播放
  const resetMusic = () => {
    audio.current.currentTime = 0
    playFunction()
  }
  // 音量
  const volumn = () => {
    if (audio.current.muted === false) {
      audio.current.muted = true
      volume.current.className = 'iconfont icon-24gf-volumeCross'
      minivolume.current.className = 'iconfont icon-24gf-volumeCross'
    } else if (audio.current.muted === true) {
      audio.current.muted = false
      volume.current.className = 'iconfont icon-24gf-volumeHigh'
      minivolume.current.className = 'iconfont icon-24gf-volumeHigh'
    }
  }
  // 点击歌词指定播放位置
  const appointNode = (item) => {
    playFunction()
    let time = (item.time / 1000).toFixed(0)
    audio.current.currentTime = time
    setBeginTime(time)
    message.info('点击歌词后会失去滚动效果')
  }

  useEffect(() => {
    const { name, lyric, picUrl, songName, url } = store.getState()
    setUrl(url)
    setName(name)
    setSongName(songName)
    setPicUrl(picUrl)
    setLyric(lyric)
    if (name !== '春娇与志明/街道办GDC') {
      setTimeout(() => {
        playFunction()
      }, 1000)
    }
  }, [url])

  store.subscribe(() => {
    const { url } = store.getState()
    setUrl(url)
  })

  return (
    <div>
      <div id="aplayer">
        {/* <!-- 海报 --> */}
        <div className="pic">
          <img src={picUrl} alt="" />
        </div>
        {/* 歌曲信息 */}
        <div className="musicinfo">
          <span>{name}</span>
          <span>- {songName}</span>
        </div>
        <div style={style} className="hover love">
          <i className="iconfont icon-xihuan"></i>
        </div>
        {/* <!-- 播放插件 --> */}
        <div className="play_plug">
          <div className="restartplay hover" style={style}>
            <i
              className="iconfont icon-zhongxinkaishi"
              ref={restartPlay}
              onClick={() => {
                resetMusic()
              }}
            ></i>
          </div>
          <div className="play_pause">
            <div style={style} className="hover">
              <i className="iconfont icon-prev"></i>
            </div>
            <div style={style} className="hover">
              <i
                className="iconfont icon-play chc-iconfont"
                ref={isPlay}
                onClick={() => {
                  playOrPause()
                }}
              ></i>
            </div>
            <div style={style} className="hover">
              <i className="iconfont icon-next"></i>
            </div>
          </div>
          <div className="volumn hover" style={style}>
            <i
              ref={volume}
              className="iconfont icon-24gf-volumeHigh"
              onClick={() => {
                volumn()
              }}
              style={{ color: '#707070', fontSize: '1.25rem' }}
            ></i>
          </div>
        </div>
        {/* <!-- 歌词按钮 --> */}
        <div className="icon-lyric hover" style={style}>
          <i
            className="iconfont icon-bottom lyric_btn"
            ref={lyric_btn}
            onClick={() => {
              showDrawer()
            }}
          ></i>
        </div>
        {/* <!-- 音乐进度条 --> */}
        <progress max={overTime} value={beginTime} ref={progress}></progress>
      </div>
      <Drawer
        title={name}
        placement={'bottom'}
        height="100%"
        forceRender={true}
        onClose={() => {
          setVisible(false)
        }}
        visible={visible}
      >
        {/* 歌词蒙版 */}
        <div className="lyrc-pic lyricRef">
          <div className="lyric-poster">
            <img src={picUrl} alt="" style={{ borderRadius: '.313rem', objectFit: 'cover' }} />
            <span style={{ fontSize: '.938rem' }}>
              {name} - <span style={{ fontSize: '.75rem' }}>{songName}</span>
            </span>
            <div className="miniplugin">
              <span>{timer(beginTime)}</span>
              <progress max={overTime} value={beginTime}></progress>
              <span>{timer(overTime)}</span>
            </div>
            <div className="miniplay_pause">
              <div className="play_pause">
                <i className="iconfont icon-prev"></i>
                <i
                  className="iconfont icon-play chc-iconfont"
                  ref={isMiniPlay}
                  onClick={() => {
                    playOrPause()
                  }}
                ></i>
                <i className="iconfont icon-next"></i>
              </div>
              <div className="volumn" style={{ position: 'relative', justifySelf: 'end' }}>
                <i
                  ref={minivolume}
                  className="iconfont icon-24gf-volumeHigh"
                  onClick={() => {
                    volumn()
                  }}
                  style={{ color: '#707070', fontSize: '1.25rem' }}
                ></i>
              </div>
            </div>
          </div>
          {/* 歌词 */}
          <div className="lyric">
            <div className="content" ref={oCon} style={{ height: '100%', position: 'relative', top: 0, transition: '.7s' }}>
              {lyric.map((item, index) => {
                return (
                  <div
                    className="chc-lyrc"
                    style={{ textAlign: 'center' }}
                    id={(item.time / 1000).toFixed(0)}
                    key={index}
                    onClick={() => {
                      appointNode(item, index)
                    }}
                  >
                    {item.text}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Drawer>
      <audio
        onTimeUpdate={() => {
          timeUpdate()
        }}
        onEnded={() => {
          ended()
        }}
        ref={audio}
        src={url}
        style={{ display: 'none' }}
      ></audio>
    </div>
  )
}
