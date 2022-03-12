import React from 'react'
import axios from 'axios'
axios.defaults.baseURL = 'http://81.68.248.232:3000'

export const getMusicUrl = async (id) => {
  const { data: res } = await React.$axios.get('/song/url', {
    params: {
      id
    }
  })
  return res.data
}

// discovery页面--------------------------------------------------------------------------------------------------------------
// 轮播图
export const getBanners = async () => {
  const { data: res } = await React.$axios.get('/banner')
  return res.banners
}

// 推荐歌单
export const getRecommandPlaylists = async () => {
  const { data: res } = await React.$axios.get('/personalized', {
    params: {
      limit: 15
    }
  })
  return res.result
}

// 推荐歌曲
export const recommandMusic = async () => {
  const { data: res } = await React.$axios.get('/personalized/newsong')
  return res.result
}

// 最新mv
export const recommandMv = async () => {
  const { data: res } = await React.$axios.get('/personalized/mv')
  return res.result
}

// playlists 界面-----------------------------------------------------------------------------------------------------------
// 顶部显示
export const topDatas = async (tag) => {
  const { data: res } = await React.$axios.get('/top/playlist/highquality', {
    params: {
      limit: 1,
      cat: tag
    }
  })
  return res.playlists[0]
}
// 推荐歌单
export const listDatas = async (page, tag) => {
  const { data: res } = await React.$axios.get('/top/playlist', {
    params: {
      limit: 10,
      // 起始的值 （页码-1）*每页多少条数据
      offset: (page - 1) * 10,
      cat: tag
    }
  })
  return res
}

// newsongs
export const getLists = async (cat) => {
  const { data: res } = await React.$axios.get('/top/song', {
    params: {
      type: cat
    },
  })
  return res.data
}

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
  })
  return res
}