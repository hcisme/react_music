import React from 'react';
import { message } from 'antd';

export const getMusicUrl = async (id) => {
  const { data: res } = await React.$axios.get('/song/url', {
    params: {
      id,
    },
  });
  return res.data;
};

export const getlyrc = async (id) => {
  const { data: res } = await React.$axios.get('/lyric', {
    params: {
      id,
    },
  });
  return res.lrc;
};

//
export const request = async (method, url, parameter) => {
  try {
    if (method === 'get') {
      const { data: res } = await React.$axios.get(url, { params: parameter });
      return res;
    }
    if (method === 'post') {
      const { data: res } = await React.$axios.post(url, { data: parameter });
      return res;
    }
  } catch (err) {
    if (err.response.data.code === 301) {
      return message.info(err.response.data.msg);
    }
  }
};

// discovery页面--------------------------------------------------------------------------------------------------------------
// 轮播图
export const getBanners = async () => {
  const { data: res } = await React.$axios.get('/banner');
  return res.banners;
};

// 推荐歌单
export const getRecommandPlaylists = async () => {
  const { data: res } = await React.$axios.get('/personalized', {
    params: {
      limit: 15,
    },
  });
  return res.result;
};

// 推荐歌曲
export const recommandMusic = async () => {
  const { data: res } = await React.$axios.get('/personalized/newsong');
  return res.result;
};

// 最新mv
export const recommandMv = async () => {
  const { data: res } = await React.$axios.get('/personalized/mv');
  return res.result;
};

// playlists 界面-----------------------------------------------------------------------------------------------------------
// 顶部显示
export const topDatas = async (tag) => {
  const { data: res } = await React.$axios.get('/top/playlist/highquality', {
    params: {
      limit: 1,
      cat: tag,
    },
  });
  return res.playlists[0];
};
// 推荐歌单
export const listDatas = async (page, tag) => {
  const { data: res } = await React.$axios.get('/top/playlist', {
    params: {
      limit: 12,
      // 起始的值 （页码-1）*每页多少条数据
      offset: (page - 1) * 12,
      cat: tag,
    },
  });
  return res;
};

// newsongs
export const getLists = async (cat) => {
  const { data: res } = await React.$axios.get('/top/song', {
    params: {
      type: cat,
    },
  });
  return res.data;
};

// mvs
export const getMvLists = async (area, type, order, page) => {
  const { data: res } = await React.$axios.get('/mv/all', {
    params: {
      area,
      type,
      order,
      //  数量
      limit: 8,
      //  偏移值
      offset: (page - 1) * 8,
    },
  });
  return res;
};

// playlist 界面-------------------------------------------------------------------------------------------------------------------------------------
// 封面信息
export const getPlayListsTopInfo = async (id) => {
  const { data: res } = await React.$axios.get('/playlist/detail', {
    params: {
      id,
    },
  });
  return res.playlist;
};
// 歌单歌曲
export const getAllMusic = async (id) => {
  const { data: res } = await React.$axios.get('/playlist/track/all', {
    params: {
      id,
      limit: 100,
    },
  });
  return res.songs;
};
// 歌单热门评论
export const gethotcomment = async (id, page, time) => {
  const { data: res } = await React.$axios.get('/comment/hot', {
    params: {
      id,
      type: 2,
      limit: 20,
      offset: (page - 1) * 20,
      before: time,
    },
  });
  return res;
};
// 最新评论
export const getNewComment = async (id, page, time) => {
  const { data: res } = await React.$axios.get('/comment/playlist', {
    params: {
      id,
      limit: 15,
      offset: (page - 1) * 15,
      before: time,
    },
  });
  return res;
};

// Mv 界面
// mv 的 url
export const mvurl = async (id) => {
  const { data: res } = await React.$axios.get('/mv/url', {
    params: {
      id,
    },
  });
  return res.data.url;
};
// 获取 mv 的信息
export const mvsInfo = async (mvid) => {
  const { data: res } = await React.$axios.get('/mv/detail', {
    params: {
      mvid,
    },
  });
  return res.data;
};
// 获取评论
export const getMvNewComment = async (id, page, time) => {
  const { data: res } = await React.$axios.get('/comment/mv', {
    params: {
      id,
      limit: 15,
      offset: (page - 1) * 15,
      before: time,
    },
  });
  return res;
};
// 获取相关的mv
export const simiMvs = async (mvid) => {
  const { data: res } = await React.$axios.get('/simi/mv', {
    params: {
      mvid,
    },
  });
  return res.mvs;
};

// 搜索相关
export const defaultWord = async () => {
  const { data: res } = await React.$axios.get('/search/default');
  return res.data;
};

export const hotSearch = async () => {
  const { data: res } = await React.$axios.get('/search/hot/detail');
  return res.data;
};

export const searchSuggest = async (keywords) => {
  const { data: res } = await React.$axios.get('/search/suggest', {
    params: {
      keywords,
    },
  });
  return res.result;
};
// 搜索结果api
export const searchres = async (keywords, type, page) => {
  const { data: res } = await React.$axios.get('/cloudsearch', {
    params: {
      keywords,
      type,
      // 获取的数据量
      limit: 25,
      offset: (page - 1) * 25,
    },
  });
  return res.result;
};

// 登录
export const Login = async (phone, password) => {
  const { data: res } = await React.$axios.post('/login/cellphone', {
    phone,
    password,
  });
  return res;
};

// 登录状态
export const loginStatus = async () => {
  const { data: res } = await React.$axios.get('/login/status');
  return res.data;
};

// 用户歌单
export const getPlaylists = async (id) => {
  const { data: res } = await React.$axios.get('/user/playlist', {
    params: {
      uid: id,
    },
  });
  return res.playlist;
};

// 用户最近播放音乐
export const nearMusic = async () => {
  const { data: res } = await React.$axios.get('/record/recent/song', {
    params: {
      limit: 12,
    },
  });
  return res.data;
};

// 最近播放-视频
export const nearMV = async () => {
  const { data: res } = await React.$axios.get('/record/recent/video', {
    params: {
      limit: 8,
    },
  });
  return res.data;
};

// 最近播放-歌单
export const nearPlayLists = async () => {
  const { data: res } = await React.$axios.get('/record/recent/playlist', {
    params: {
      limit: 8,
    },
  });
  return res.data?.list;
};

// 获取账号信息
export const accountDetail = async () => {
  const { data: res } = await React.$axios.get('/user/account');
  return res;
};

// 获取账号信息
export const vip = async () => {
  const { data: res } = await React.$axios.get('/user/detail', {
    params: {
      uid: localStorage.getItem('id'),
    },
  });
  return res;
};
