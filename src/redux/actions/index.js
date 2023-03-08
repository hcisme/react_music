import React from 'react';
import { handleLyric } from '../../hooks/UseMusic/tools/setLyrc';
import { HEARFROM, CHANGE, HEARMUSICINFO } from '../constant';

/**
 * 
 * @param {object} record 每个歌曲的信息
 * @returns {{ id, url, lyric, dt, singer, songName, picUrl, type }} 播放器 || 音乐列表 需要的数据
 */
export const commonPlayMusicFn = async (record) => {
  // 获取歌曲url 获取歌词
  const res = await React.$apis.getMusicUrl(record.id);
  const lyrc = await React.$apis.getlyrc(record.id);

  return {
    ...record,
    id: record.id || record.resourceId.id,
    // 音乐url
    url: res[0]?.url,
    // 歌词
    lyric: handleLyric(lyrc?.lyric),
    // 播放时间
    dt: res.time,
    // 歌手名
    singer: record.singer || record.song?.artists?.[0]?.name || record.ar?.map((item) => item.name)?.join('/') || record?.al?.name,
    // 单曲名
    songName: record.name || record?.ar?.map((item) => item.name)?.join('/'),
    // 海报
    picUrl: record.picUrl || record?.album?.blurPicUrl || record?.album?.artist?.img1v1Url || record?.al?.picUrl,
    type: HEARFROM,
  };
};

// 调用此方法引起音乐列表刷新
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
