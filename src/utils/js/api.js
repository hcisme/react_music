import React from 'react'

export const getMusicUrl = async (id) => {
  const { data: res } = await React.$axios.get('/api/song/url', {
    params: {
      id,
    },
  })
  return res.data
}

// discovery页面--------------------------------------------------------------------------------------------------------------
// 轮播图
export const getBanners = async () => {
  const { data: res } = await React.$axios.get('/api/banner')
  return res.banners
}

// 推荐歌单
export const getRecommandPlaylists = async () => {
  const { data: res } = await React.$axios.get('/api/personalized', {
    params: {
      limit: 15,
    },
  })
  return res.result
}

// 推荐歌曲
export const recommandMusic = async () => {
  const { data: res } = await React.$axios.get('/api/personalized/newsong')
  return res.result
}

// 最新mv
export const recommandMv = async () => {
  const { data: res } = await React.$axios.get('/api/personalized/mv')
  return res.result
}

// playlists 界面-----------------------------------------------------------------------------------------------------------
// 顶部显示
export const topDatas = async (tag) => {
  const { data: res } = await React.$axios.get('/api/top/playlist/highquality', {
    params: {
      limit: 1,
      cat: tag,
    },
  })
  return res.playlists[0]
}
// 推荐歌单
export const listDatas = async (page, tag) => {
  const { data: res } = await React.$axios.get('/api/top/playlist', {
    params: {
      limit: 10,
      // 起始的值 （页码-1）*每页多少条数据
      offset: (page - 1) * 10,
      cat: tag,
    },
  })
  return res
}

// newsongs
export const getLists = async (cat) => {
  const { data: res } = await React.$axios.get('/api/top/song', {
    params: {
      type: cat,
    },
  })
  return res.data
}

// mvs
export const getMvLists = async (area, type, order, page) => {
  const { data: res } = await React.$axios.get('/api/mv/all', {
    params: {
      area,
      type,
      order,
      //  数量
      limit: 8,
      //  偏移值
      offset: (page - 1) * 8,
    },
  })
  return res
}

// playlist 界面-------------------------------------------------------------------------------------------------------------------------------------
// 封面信息
export const getPlayListsTopInfo = async (id) => {
  const { data: res } = await React.$axios.get('/api/playlist/detail', {
    params: {
      id,
    },
  })
  return res.playlist
}
// 歌单歌曲
export const getAllMusic = async (id) => {
  const { data: res } = await React.$axios.get('/api/playlist/track/all', {
    params: {
      id,
      limit: 100,
    },
  })
  return res.songs
}
// 歌单热门评论
export const gethotcomment = async (id) => {
  const { data: res } = await React.$axios.get('/api/comment/hot', {
    params: {
      id,
      type: 2,
    },
  })
  return res
}
// 最新评论
export const getNewComment = async (id, page) => {
  const { data: res } = await React.$axios.get('/api/comment/playlist', {
    params: {
      id,
      limit: 15,
      offset: (page - 1) * 10,
    },
  })
  return res
}

// Mv 界面
// mv 的 url
export const mvurl = async (id) => {
  const { data: res } = await React.$axios.get('/api/mv/url', {
    params: {
      id,
    },
  })
  return res.data.url
}
// 获取相关的mv
export const simiMvs = async (mvid) => {
  const { data: res } = await React.$axios.get('/api/simi/mv', {
    params: {
      mvid,
    },
  })
  return res.mvs
}
// 获取 mv 的信息
export const mvsInfo = async (mvid) => {
  const { data: res } = await React.$axios.get('/api/mv/detail', {
    params: {
      mvid,
    },
  })
  return res.data
}
// 获取评论
export const getMvNewComment = async (id) => {
  const { data: res } = await React.$axios.get('/api/comment/mv', {
    params: {
      id,
      limit: 50,
      // offset: (page - 1) * 10,
    },
  })
  return res
}
