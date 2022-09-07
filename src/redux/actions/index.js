import React from 'react';
import { handleLyric } from '../../hooks/UseMusic/tools/setLyrc';
import { HEARFROM, CHANGE, HEARMUSICINFO } from '../constant';

export const commonPlayMusicFn = async (record) => {
  // 获取歌曲url 获取歌词
  const res = await React.$apis.getMusicUrl(record.id);
  const lyrc = await React.$apis.getlyrc(record.id);

  return {
    ...record,
    // 音乐url
    url: res[0]?.url,
    // 歌词
    lyric: handleLyric(lyrc.lyric),
    // 播放时间
    dt: res.time,
    // 歌手名
    singer: record.singer || record.song?.artists?.[0]?.name || record.artists?.[0]?.name,
    // 单曲名
    songName: record.name,
    // 海报
    picUrl: record.picUrl || record?.album?.blurPicUrl || record?.album?.artist?.img1v1Url,
    type: HEARFROM,
  };
};

// 主页最近在听的音乐
export const HearFromHomeInfo = async (data) => {
  let url = '';
  let ly = '';

  const {
    resourceId: id,
    data: {
      al: { picUrl },
    },
    data: {
      al: { name },
    },
    data: { dt },
  } = data;
  // 获取歌曲url
  const val = await React.$apis.getMusicUrl(id);
  url = val[0].url;
  // 获取歌词
  const lyrc = await React.$apis.getlyrc(id);
  ly = lyrc.lyric;

  return {
    type: HEARFROM,
    id,
    url,
    name,
    songName: data.data?.ar[0]?.name,
    picUrl,
    lyric: handleLyric(ly),
    dt,
  };
};

export const statusChange = () => {
  return {
    type: CHANGE,
    num: Math.random(),
  };
};

// 点击文字需要跳转传递的信息
export const hearMusicInfo = (data) => {
  return {
    type: HEARMUSICINFO,
    data,
  };
};
