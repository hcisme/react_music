import React from "react"
import { handleLyric } from "../../hooks/UseMusic/tools/setLyrc"
import { HEARFROM, CHANGE } from '../constant'

// 首页音乐播放
export const HearFromDisInfo = async (data) => {
  let url = ''
  let ly = ''

  const { id, picUrl, name, song: { duration: dt } } = data
  // 获取歌曲url
  const val = await React.$apis.getMusicUrl(id)
  url = val[0].url
  // 获取歌词
  const lyrc = await React.$apis.getlyrc(id)
  ly = lyrc.lyric

  return {
    type: HEARFROM,
    id,
    url,
    name,
    songName: data.song?.artists[0]?.name,
    picUrl,
    lyric: handleLyric(ly),
    dt
  }
}

// 搜索结果音乐 歌单音乐
export const HearFromResultInfo = async (data) => {
  let url = ''
  let ly = ''

  const { id, al: { picUrl }, name, dt } = data
  // 获取歌曲url
  const val = await React.$apis.getMusicUrl(id)
  url = val[0].url
  // 获取歌词
  const lyrc = await React.$apis.getlyrc(id)
  ly = lyrc.lyric

  return {
    type: HEARFROM,
    id,
    url,
    name,
    songName: data.ar[0]?.name,
    picUrl,
    lyric: handleLyric(ly),
    dt
  }
}

// 最新音乐
export const HearFromNewSongInfo = async (data) => {
  let url = ''
  let ly = ''

  const { id, album: { picUrl }, name, duration: dt } = data
  // 获取歌曲url
  const val = await React.$apis.getMusicUrl(id)
  url = val[0].url
  // 获取歌词
  const lyrc = await React.$apis.getlyrc(id)
  ly = lyrc.lyric

  return {
    type: HEARFROM,
    id,
    url,
    name,
    songName: data.artists[0]?.name,
    picUrl,
    lyric: handleLyric(ly),
    dt
  }
}

// 搜索建议时提示的音乐
export const HearFromSearchSuggestInfo = async (data) => {
  let url = ''
  let ly = ''

  const { id, album: { artist: { picUrl } }, name, duration: dt } = data
  // 获取歌曲url
  const val = await React.$apis.getMusicUrl(id)
  url = val[0].url
  // 获取歌词
  const lyrc = await React.$apis.getlyrc(id)
  ly = lyrc.lyric

  return {
    type: HEARFROM,
    id,
    url,
    name,
    songName: data.artists[0]?.name,
    picUrl,
    lyric: handleLyric(ly),
    dt
  }
}

// 主页最近在听的音乐
export const HearFromHomeInfo = async (data) => {
  let url = ''
  let ly = ''

  const { resourceId: id, data: { al: { picUrl } }, data: { al: { name } }, data: { dt } } = data
  // 获取歌曲url
  const val = await React.$apis.getMusicUrl(id)
  url = val[0].url
  // 获取歌词
  const lyrc = await React.$apis.getlyrc(id)
  ly = lyrc.lyric

  return {
    type: HEARFROM,
    id,
    url,
    name,
    songName: data.data?.ar[0]?.name,
    picUrl,
    lyric: handleLyric(ly),
    dt
  }
}

export const statusChange = () => {
  return {
    type: CHANGE,
    num: Math.random()
  }
}
