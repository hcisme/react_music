// 计算视频或者音乐播放时间
export const time = (duration) => {
  let min = parseInt(duration / 1000 / 60)
  min = min < 10 ? '0' + min : min
  let sec = parseInt((duration / 1000) % 60)
  sec = sec < 10 ? '0' + sec : sec
  // console.log(min + '|' + sec)
  const forTime = `${min}:${sec}`
  return forTime
}

export const timer = (duration) => {
  let min = parseInt(duration / 60)
  min = min < 10 ? '0' + min : min
  let sec = parseInt(duration % 60)
  sec = sec < 10 ? '0' + sec : sec
  // console.log(min + '|' + sec)
  const forTime = `${min}:${sec}`
  return forTime
}

// 时间戳格式化
export const dayjs = (timestamp = Date.now()) => {
  let time = new Date(Number(timestamp))
  let y = time.getFullYear() //年
  let m = time.getMonth() + 1 //月
  m = m < 10 ? '0' + m : m

  let d = time.getDate() //日
  d = d < 10 ? '0' + d : d

  let h = time.getHours() //时
  h = h < 10 ? '0' + h : h

  let mm = time.getMinutes() //分
  mm = mm < 10 ? '0' + mm : mm

  let s = time.getSeconds() //秒
  s = s < 10 ? '0' + s : s

  const timeStr = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
  return timeStr
}

// 播放次数格式化
export const playCount = (playcount = 12312312313) => {
  let pc = Number(playcount)
  if (pc > 100000000) {
    return parseInt(pc / 100000000) + '亿'
  } else if (pc > 10000) {
    return parseInt(pc / 10000) + '万'
  }
}
