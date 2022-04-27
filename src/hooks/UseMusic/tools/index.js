import { handleLyric } from './setLyrc.js'

let lyricses = [`[00:00.000] 作词 : Aline\n[00:01.000] 作曲 : Aline\n[00:02.000] 编曲 : Aline\n[00:20.330]Jcool：\n[00:22.329]有个女仔令我思想变得大过\n[00:25.029]当初\n[00:25.879]我幼稚行为对你犯下大错\n[00:27.579]你话我唔识淋 用钱买无用饰品\n[00:30.329]你慢慢心淡觉得我对感情唔认真\n[00:33.330]要知道男人系天生的小朋友\n[00:36.329]小朋友弱点会忽略另一半感受\n[00:39.080]要改正好简单我只系欠调教\n[00:42.330]经历得多反而可以令到爱意浓厚\n[00:42.830]Vai：\n[00:44.581]志明的世界永远好动带着可爱\n[00:47.330]但有时间迷茫 爱情错过却唔可再\n[00:50.081]从开始走到结尾哪个不会变大个\n[00:53.081]但春娇想要那个你又有谁可以劝阻\n[00:55.831]等待 UFO 纵有变数\n[00:58.079]最普通慨佢哋世上遍布\n[01:01.576]爱漫春天散落每个季节慨消耗\n[01:04.325]看着花瓣跌落过程撑得过衰老\n[01:04.575]欧：\n[01:09.825]重新出发吗 huh 更渴望未来\n[01:12.825]以往这少年懂爱吗\n[01:16.328]仿佛不够\n[01:21.328]成长会进化吗 也信念自由\n[01:25.078]我爱这少年讽刺吗\n[01:28.021]这花开吗\n[01:28.521]留：\n[01:30.271]我爱你 你是唱将我做配合\n[01:32.521]但你予我这过程细致给我培训\n[01:35.524]情与爱 太过复杂 我要太多喘息\n[01:38.274]但你爱我慨以后不会太过忐忑\n[01:41.274]当拥有慨时候 又接近放手\n[01:44.024]循环播放剧情有多少个然后\n[01:46.524]如果系现实我会选择打破现实\n[01:49.274]喺你慨世界里面我会选择慢慢渐入\n[01:49.774]Vai：\n[01:52.527]志明慨世界永远好动带着可爱\n[01:55.024]佢冇时间迷茫 爱情错过却唔可再\n[01:57.774]从开始走到结尾哪个不会变大个\n[02:00.774]但春娇想要那个你又有谁可以劝阻\n[02:03.274]等待 UFO 纵有变数\n[02:06.027]最普通慨佢哋世上遍布\n[02:09.276]爱漫春天散落每个季节慨消耗\n[02:12.026]看着花瓣跌落过程撑得过衰老\n[02:13.026]欧：\n[02:18.026]重新出发吗 huh 更渴望未来\n[02:21.276]以往这少年懂爱吗\n[02:24.526]仿佛不够\n[02:29.027]成长会进化吗 也信念自由\n[02:32.777]我爱这少年讽刺吗\n[02:34.777]这花开吗\n[02:35.527]Garyu：\n[02:37.277]破碎婚姻里出身逼出佢慨硬净\n[02:40.027]佢再牺牲佢慨率真改变佢慨硬颈\n[02:42.780]戴眼镜慨佢明白波珠解决唔到逃避\n[02:45.780]要长大要负责任缩短两个人慨距离\n[02:49.479]美梦里学会感慨\n[02:51.229]你亦放肆你的爱\n[02:53.729]用力转载 越过比赛\n[02:58.729]为我掩盖 都因为爱\n[02:58.979]欧：\n[03:02.979]重新出发吗 huh 更渴望未来\n[03:06.729]以往这少年懂爱吗\n[03:09.479]仿佛不够\n[03:14.229]成长会进化吗 也信念自由\n[03:17.479]我爱这少年讽刺吗\n[03:19.223]这花开吗\n`]

  // audio
  let audio = document.querySelector('audio')

  // 存歌词的容器
  let oCon = document.querySelector('.content')
  // 是否播放图标
  let isPlay = document.querySelector('.chc-iconfont')
  // 进度条
  let progress = document.querySelector('progress')
  // 展示隐藏歌词按钮
  let lyric_btn = document.querySelector('.lyric_btn')
  // 歌词蒙版（黑色背景）
  let lyricRef = document.querySelector('.lyricRef')
  // 重新播放按钮
  let restartPlay = document.querySelector('.icon-zhongxinkaishi')
  // 音量
  let volume = document.querySelector('.icon-24gf-volumeHigh')

  // 控制歌词页面 加载 与 隐藏
  let flag = true
  let lyrics = []
  // 起始
  let beginTime = 0
  // 结束
  let overTime = 0
  let n = 0

  window.addEventListener('load', () => {
    lyrics = handleLyric(lyricses[0])
    for (let i = 0; i < lyrics.length; i++) {
      oCon.innerHTML += `<div class="chc-lyrc" style="text-align: center;" id="${(lyrics[i].time / 1000).toFixed(0)}">${lyrics[i].text}</div>`
    }
  })

  // 控制按钮旋转方法
  function rotate() {
    if (flag) {
      lyric_btn.style.transform = `rotate(180deg)`
      flag = false
    } else {
      lyric_btn.style.transform = `rotate(0deg)`
      flag = true
    }
  }

  // 播放方法
  function playFunction() {
    isPlay.className = 'iconfont icon-pause chc-iconfont'
    audio.play()
    overTime = audio.duration.toFixed(0)
    progress.max = overTime
  }

  function pauseFunction() {
    isPlay.className = 'iconfont icon-play chc-iconfont'
    audio.pause()
  }

  // 音频播放时
  isPlay.addEventListener('click', () => {
    if (isPlay.className === 'iconfont icon-play chc-iconfont') {
      playFunction()
    } else {
      pauseFunction()
    }
  })

  audio.addEventListener('timeupdate', () => {
    // 每个歌词块
    const ap = document.querySelectorAll('.chc-lyrc')
    beginTime = audio.currentTime.toFixed(0) // 当前播放器当前时间
    progress.value = beginTime
    if (document.getElementById(audio.currentTime.toFixed(0))) {
      for (let i = 0; i < ap.length; i++) {
        ap[i].style.cssText = 'color: black; text-align: center;'
      }
      document.getElementById(beginTime).style.color = 'white'
      if (ap[5 + n].id === beginTime) {
        oCon.style.top = `${-n * 62}px`
        n++
      }
    }
  })

  audio.addEventListener('ended', () => {
    isPlay.className = 'iconfont icon-play chc-iconfont'
    audio.pause()
    progress.value = 0
  })

  // 是否显示歌词蒙版（黑色背景）
  lyric_btn.addEventListener('click', () => {
    rotate()
    flag === false ? lyricRef.classList.add('ani') : lyricRef.classList.remove('ani')
  })

  // 重新播放监听事件
  restartPlay.addEventListener('click', () => {
    audio.load()
    isPlay.className = 'iconfont icon-pause chc-iconfont'
    audio.play()
  })

  // 音量
  volume.addEventListener('click', () => {
    if (audio.muted === false) {
      audio.muted = true
      volume.className = 'iconfont icon-24gf-volumeCross'
    } else if (audio.muted === true) {
      audio.muted = false
      volume.className = 'iconfont icon-24gf-volumeHigh'
    }
  })

// 点击歌词跳到指定的音乐节点
// window.addEventListener('load', () => {
//   const ap = document.querySelectorAll('.chc-lyrc')
//   for (let i = 0; i < ap.length; i++) {
//     ap[i].addEventListener('click', (e) => {
//       let newTime = Number(e.target.id)
//       audio.currentTime = newTime
//       playFunction()
//       progress.value = newTime
//     })
//   }
// })
