// 处理歌词
export const handleLyric = (lyric) => {
  if (!lyric) return []
  const res = []
  const arr = lyric.split('\n').filter(item => item)
  for (const str of arr) {
    const reg = /^\[\d{1,2}:\d{1,2}.\d{1,3}$/
    const arr = str.split(']')
    // 匹配歌词时间
    const timeArr = arr.filter(item => reg.test(item))
    // 取出歌词
    const lrc = arr.find(item => !reg.test(item))
    if (!lrc) continue
    for (const timeStr of timeArr) {
      const arr = timeStr.split(/[[:.]/)
      const m = parseInt(arr[1])
      const s = parseInt(arr[2])
      const ms = parseInt(arr[3])
      const time = (m * 60 + s) * 1000 + ms
      res.push({ time, text: lrc })
    }
  }
  // 按时间排序并返回
  return res.sort((a, b) => (a.time - b.time))
}